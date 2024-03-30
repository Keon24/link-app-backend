import express from "express"
import bcrypt from "bcrypt"
import UserModel from "../models/usermodels.js";
import UserErrors from "../errors/usererrors.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res,) => {
    const { username, password } = req.body;
   try {
    const user = await UserModel.findOne({username});
    if(user) {
       return  res.status(400).json({
        type: UserErrors.USERNAME_ALREADY_EXISTS,
    
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword})
    await newUser.save();
    res.json({"User Registered Successfully": true})
   } catch (error) {
    res.status(500).json({type:err});
    
   }
});

/*Login User*/
router.post("/login", async (req, res) => {
    const {username,password} = req.body;
    try {
    const user = await UserModel.findOne({ username });
    if(!user) {
        return res.status(400).json({type: UserErrors.NO_USER_FOUND});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
       return res.status(400).json({type: UserErrors.WRONG_CREDENTIALS});
    }
    const token = jwt.sign({id: user._id},"secretwebapp");
    res.json({token, userID: user._id});
    } catch (error) {
        res.status(500).json({type: "Internal Server Error"});
    }
}) ;

export default router;

