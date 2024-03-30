import bcrypt from "bcrypt"
import UserModel from "../models/usermodels";
import UserErrors from "../errors/usererrors";



Router.post("/register", async (req, res,) => {
    const [ username, password ] = req.body;
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
