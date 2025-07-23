import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createNote, getNotes } from "../controllers/note.controller.js";

const notesRouter = Router();

notesRouter.get('/', authorize, getNotes)

notesRouter.post('/', authorize,  createNote)


notesRouter.get('/:id', (req, res)=>{
    res.send("Get Notes Detail")
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