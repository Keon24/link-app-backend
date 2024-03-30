import express from "express";
import UserModel from "../models/usermodels";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import usererrors from "../errors/usererrors";

const router = express.Router();

router.post("/regitser", async (req, res) => {
    try {
    const {username,password} = req.body;
 const user = await UserModel.findOne(username)
 if(!user) {
    return res.status(400).json({type: usererrors.NO_USER_FOUND});
 }
  
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({username,password: hashedPassword});
    await newUser.save();

   return res.json("User Registered Successfully");
   } catch (error) {
    res.status(500).json({type: err});        
    }
}) 