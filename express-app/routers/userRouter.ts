import {Router} from 'express';
import userContoller from '../controllers/userController.js'

const userRouter = Router()


userRouter.route('/addUser').post(userContoller.addUser);
userRouter.get('/allUsers', userContoller.getAllUsers);

//Define a whole set of routes that has a parameter that has a URL
userRouter.route('/user/:id')
    .get(userContoller.getUser)
    .put(userContoller.modifyUser)
    .delete(userContoller.deleteUser);


export default userRouter;
