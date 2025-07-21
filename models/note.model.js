import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    heading: {
        type: String,
        require: [true, "Heading is required"],
        maxLength: 50,
    },
    description: {
        type: String,
        require: [true, "Description is required"]
    }
}, {timestamps: true})

const Note = mongoose.model("Note", noteSchema)

export default Note