import { Router } from "express";

const todoRouter = Router();

todoRouter.get('/', (req,res)=>{
    res.send("Get all todos")
})

todoRouter.get('/:id', (req,res)=>{
    res.send("Get todos")
})

todoRouter.post('/', (req,res)=>{
    res.send("Create Todo")
})

todoRouter.put('/:id', (req,res)=>{
    res.send("Update Todo")
})

todoRouter.delete('/:id', (req,res)=>{
    res.send("Delete Todo")
})

export default todoRouter