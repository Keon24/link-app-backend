import express from "express"
import LinkModel from "../models/linkmodels.js";
import UserModel from "../models/usermodels.js";

const router = express.Router();

router.post('/link', async (req, res) => {
    try {
    const { url, platform, displayName, description, userId } = req.body;
    if(!url || !platform || userId ) {
     return res.status(400).send("All fields Required")
    }

   
    
        const newLink = new LinkModel ({ url, platform, displayName, description})
        await newLink.save();

        const user = await UserModel.findById(userId);
        if (!user)
        return res.status(404).json("User not found")

         user.links.push(newLink);
         await user.save();

         res.status(201).json(newLink);

    } catch (error) {
        req.status(500).json({message: error.message});
        
    }
})

router.get("/link"), async (req, res) => {
    
}

export default router;