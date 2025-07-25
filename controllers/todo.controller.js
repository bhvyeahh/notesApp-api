import Todo from "../models/todo.model.js";
 

export const createTodo = async (req, res, next) =>{
    try {
        const todo = await Todo.create({
        ...req.body,
        user: req.user._id
    })
    res.status(201).json({message: "Todo Created", data: todo})
    } catch (error) {
        next(error)
    }
}

export const getTodos = async (req, res, next) =>{
    try {
        const todos = await Todo.find({user: req.user._id}).sort({createdAt: -1})

        res.status(200).json({message: "Todos Fetched", data: todos})
    } catch (error) {
        next(error)
    }
}

export const getTodo = async (req, res, next) =>{
    try {
        const todo = await Todo.findById(req.params.id)

        if(!todo){
            return res.status(404).json({message: "Todo Not Found"})
        }

        res.status(200).json({message: "Todo Fetched Successfully", data: todo})
    } catch (error) {
     next(error)
    }
}

export const editTodo = async (req, res, next)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id)

        if(!todo){
            return res.status(404).json({message: "Todo Not Found"})
        }

        todo.title = req.body.title || todo.title
        todo.isCompleted = req.body.isCompleted || todo.isCompleted
        
        await todo.save();
        res.status(201).json({message: "Todo Updated", data: todo})
    } catch (error) {
      next(error)  
    }
}

export const deleteTodo = async (req, res, next)=>{
    try {
       const todo = await Todo.findByIdAndDelete(req.params.id)
       
       if(!todo){
        return res.status(404).json({message: "Todo Not Found"})
       }

       res.status(200).json({message: "Todo Deleted", data: todo})
    } catch (error) {
        next(error)
    }
}