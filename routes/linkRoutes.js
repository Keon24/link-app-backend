import express from "express"
import LinkModel from "../models/linkmodels.js";
import UserModel from "../models/usermodels.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
    const { url, platform, userId } = req.body;
    if(!url || !platform || !userId ) {
     return res.status(400).send("All fields Required")
    }

    let existingLink = await LinkModel.findOne({ userId, platform});

    if(existingLink) {
      existingLink.url = url;
      await existingLink.save();
      res.status(200).json(existingLink)

    }else{
        const newLink = new LinkModel ({ url, platform, userId});
        await newLink.save();

        const user = await UserModel.findById(userId);
        if (!user) 
        return res.status(404).json("User not found")

         user.links.push(newLink._id);
         await user.save();

         res.status(201).json(newLink);
         }
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
})

router.get("/:userId" , async (req, res) => {
 try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId).populate('links')

    if(!user) {
        return res.status(404).json({message: "User not found"});
    }
    res.json(user.links)
 } catch (error) {
    res.status(500).json({message: error.message});
 }
});

export default router;