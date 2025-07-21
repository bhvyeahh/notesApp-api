import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import {JWT_SECRET, JWT_EXPIRES_IN} from '../config/env.js'
import User from "../models/user.model.js"

export const signUp = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Checking if user already exists
        const {name, email, password } = req.body;
        const existingUser = await User.findOne({email}).session(session);

        if(existingUser){
            return res.status(400).json("User Already Exists")
        }
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating User
        const newUsers = await User.create([{email, name, password: hashedPassword}], {session})
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data:{
                token,
                user: newUsers[0]
            }
        })
         
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async(req, res, next)=>{
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email})
        
        if(!user){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error;
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            const error = new Error("Invalid Password")
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(200).json({
            success: true,
            message: "User Signed In",
            data:{
                token, 
                user
            }
        })
    } catch (error) {
        next(error)
    }
}


export const signOut = async(req, res, next)=>{
 try {
    res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
}