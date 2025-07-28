import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/',authorize, getUsers);

userRouter.get('/:id', authorize , getUser);

userRouter.post('/', (req, res) =>{
    res.send('User Registration route is working');
})

userRouter.put('/:id', (req, res) => {
    res.send('User Update route is working');
});

userRouter.delete('/:id', (req, res) => {
    res.send('User Delete route is working');
});


export default userRouter;