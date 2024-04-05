import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true 
    },
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link' 
    }]
    

});

const UserModel = mongoose.model("User", userSchema);
export default UserModel