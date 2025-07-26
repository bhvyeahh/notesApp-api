import Note from "../models/note.model.js";

export const createNote = async (req, res, next)=>{
    try {
        const note = await Note.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json({success: true, data: note})
    } catch (error) {
        next(error)
    }
}

export const getNotes = async (req, res, next) => {
  try {
    // Get all notes that belong to the logged-in user
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

export const getNote = async (req, res, next) =>{
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note details fetched successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if(!note){
      return res.status(404).json({message: "Note not found"})
    }
    // Update the note with the new data
    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;

    await note.save();
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    next(error)
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
}
