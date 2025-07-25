import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createNote, deleteNote, editNote, getNoteDetail, getNotes } from "../controllers/note.controller.js";

const notesRouter = Router();

notesRouter.get('/', authorize, getNotes)

notesRouter.post('/', authorize,  createNote)

notesRouter.get('/:id', authorize, getNoteDetail)

notesRouter.put('/:id', authorize, editNote)

notesRouter.delete("/:id", authorize, deleteNote)


export default notesRouter