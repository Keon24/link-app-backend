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
//Retrieved User links successfully
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
// Successfully updated the links
router.put("/:linkId", async (req, res) => {
try {
    const {url, platform} = req.body;
    const linkId = req.params.linkId;

    let link = await LinkModel.findById(linkId);
    if(!link) {
        return res.status(404).json({message: "link not found"})
    }

    if(url) link.url = url;
    if(platform) link.platform = platform;

    await link.save();
    res.status(200).json(link)
} catch (error) {
    res.status(500).json({message: error.message});
    
}
})

router.delete("/:linkId", async (req, res) => {
    try {
        const linkId = req.params.linkId;

        const result = await LinkModel.deleteOne({ _id: linkId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;