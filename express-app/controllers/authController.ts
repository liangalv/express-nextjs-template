import jwt from 'jsonwebtoken';
import {user, refreshToken} from '../db/models/index.cjs';
import bcrypt from 'bcrypt';

const handleLogin = (async(req,res,next)=>{
    //When the req body comes in it should come with a password and username
    const body = req.body
    console.log(body);
    try{
        //attempt to find existing user
        const currUser = await user.findOne({where: {username: body.username}});
        if (!currUser)throw new Error();
        //verify the password 
        const match = await bcrypt.compare(body.password, currUser.password);
        if (!match)throw new Error();
        //generate accessToken and refreshToken
        const aToken = generateToken(currUser.userName,process.env.ACCESS_TOKEN_SECRET,"1min") ;
        const rToken = generateToken(currUser.userName, process.env.REFRESH_TOKEN_SECRET, "1d");
        //Set the refreshToken in db
        await updateRefreshToken(currUser,rToken);
        //destructure out the hashedPassword, createdAt and updateAt fields
        const {password, createdAt, updatedAt, ...userFields} = currUser.toJSON();
        //return an httpOnly cookie, so that it's non js parseable
        //put these in when you convert to serving via https sameSite: 'none', secure: true
        res.cookie('jwt', rToken, {httpOnly: true, maxAge:24*60*60*1000})
        res.json({userFields, accessToken: aToken })
    }catch(error){
        res.status(401).send("Unauthorized access")
        next(error);
    }
});

//with axios you need to set a with-credential flag that needs to be set as well
const handleLogout = async(req,res) =>{
    //On the client also make sure to delete the accessToken
    //clearCookies: make sure to re-add sameSite: none and secure: true
    res.clearCookie('jwt', {httpOnly: true})//secure to send only over https
    //get refreshToken and destroy it
        //we need this deconstructed as optional chaining does not wait for the promise to resolve
    const currUser = await user.findOne({where: {username: req.body.username}});
    const rt = await currUser.getRefreshToken();
    rt.destroy();
    //you can handle the logout screen on the frontend side
    return res.sendStatus(204);
};

const reissueAccessToken = async (req,res) =>{
    //ToDo:here we need to authenticate the refreshToken prior to reissue
    const username = req.body.username;
    const cookies = req.cookies
    const tokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!cookies?.jwt) return res.sendStatus(401);
    //we have to validate our cookie
    try{
        //we have to deconstruct the call here because optional chaining does not wait for promises
        const currUser = await user.findOne({where: {username: username}});
        const rt = await currUser.getRefreshToken();
        if (await bcrypt.compare(cookies.jwt,rt.token)){
            jwt.verify(
                cookies.jwt,
                tokenSecret,
                () =>{
                    //generate token
                    const aToken = generateToken(username,tokenSecret,"1min");
                    res.json({accessToken: aToken});
                }
            )
        }
    }catch(error){
        return res.sendStatus(401, error);
    }
};

//Helper Functions 
const generateToken = (userName, tokenSecret,duration) =>{
    //generates a jwt, and hashes it
    const token = jwt.sign(
        {"username": userName},
        tokenSecret,
        {expiresIn: duration}
    )
    return token; 
};
const updateRefreshToken = async (currUser, rToken) =>{
    let rt = await currUser.getRefreshToken();
    const hashedToken = await bcrypt.hash(rToken,10);
    if (!rt){
        rt = refreshToken.build({userId: currUser.id,token:hashedToken})
        await currUser.setRefreshToken(rt);
    }else{
        await rt.update({token: hashedToken})
    }
};

const authController = {
    handleLogin,
    handleLogout,
    reissueAccessToken
};


export default authController;