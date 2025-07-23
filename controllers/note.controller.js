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
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};