import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('User route is working');
});

userRouter.get('/:id', (req, res) => {
    res.send('User profile route is working');
});

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