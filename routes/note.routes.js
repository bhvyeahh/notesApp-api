import { Router } from "express";

const notesRouter = Router();

notesRouter.get('/', (req,res)=>{
    res.send("Get all notes")
})

notesRouter.get('/:id', (req, res)=>{
    res.send("Get Notes Detail")
})

notesRouter.post('/', (req, res)=>{
    res.send("Create Note")
})

notesRouter.put('/:id', (req,res)=>{
    res.send("Edit note")
})

notesRouter.delete("/:id", (req, res)=>{
    res.send("Delete Note")
})

notesRouter.get("/user/:id", (req,res)=>{
    res.send("Get User Details")
})

export default notesRouter