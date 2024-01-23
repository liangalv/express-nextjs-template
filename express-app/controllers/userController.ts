import {user,sequelize} from '../db/models/index.cjs'
import bcrypt from 'bcrypt';



const getAllUsers = (async (req,res, next) =>{
    try{
        sequelize.transaction(async () =>{
            const users = await user.findAll({attributes: {exclude: ['password']},lock: true});
            if (!users) throw new Error("Database did not return all users");
            res.json(users);
        })
    }catch(error){
        next(error);
    }
});

const getUser = (async (req,res,next) =>{
    try{
        const currUser = await user.findByPk(req.params.id,{attributes: {exclude: ['password','createdAt','updatedAt']}});
        if (!currUser)throw new Error("User not found");
        res.json(currUser);
    } catch(error){
        next(error)
    }
});

const addUser = (async (req,res,next) =>{
    const {firstName, lastName, email, username, password} = req.body;
    const saltRounds = 10;
    try {
        sequelize.transaction(async () =>{
            const existingUser = await user.findOne({where: {username: username}});
            if (existingUser){
                req.log.error("User already exists")
                return res.status(400).json({error: 'Username already in use'})
            };
            const hash =  await bcrypt.hash(password,saltRounds);
            //.create is a shortcut to build -> save
            const newUser = await user.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: hash,
            })
            res.json(newUser);
        })
    } catch (error) {
        next(error);
    }
});

const modifyUser = (async(req,res,next)=>{
    try{
        sequelize.transaction(async () =>{
            const currUser = await user.findByPk(req.params.id);
            if (!currUser)throw new Error('User not found');
            Object.assign(currUser, req.body);
            currUser.save();
            res.json(currUser);
        })
    } catch(error){
        next(error);
    }
});

const deleteUser = (async (req,res,next) =>{
    try{
        sequelize.transaction(async () =>{
            const currUser = await user.findByPk(req.params.id)
            if (!currUser)throw new Error("User not found");
            await currUser.destroy();
            res.send(`User ${req.params.id} was deleted`)
        })
    } catch(error){
        next(error);
    }
});

const userController = {
    getAllUsers,
    getUser,
    addUser,
    modifyUser,
    deleteUser,
}


export default userController; 