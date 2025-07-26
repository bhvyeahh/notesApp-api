import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Title is required"],
  },
  answer: {
    type: String,
    required: [true, "Title is required"],
  },
  nextReview: {
    type: Date,
  },
  ease: {
    type: Number,
    default: 2.5,
  },
  interval: {
    type: Number,
    default: 1,
  },
  repetitions: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("Card", cardSchema)

export default Card