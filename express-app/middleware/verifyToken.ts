import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader)return res.status(401).send("Unauthorized request");
    req.log.info(authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) =>{
            if (err)return res.sendStatus(403) //could have been tampered with 
            req.user = decoded.username;
            next();
        }
    )
}

export default verifyToken;