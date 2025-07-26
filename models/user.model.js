import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        require:  [true, "Subscription name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 100,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
        maxLength: 100,
    },
    currentStreak: {
        type: Number,
        default: 0,
  },
    longestStreak: {
        type: Number,
        default: 0,
  },
    lastReviewDate: {
        type: Date,
  }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;