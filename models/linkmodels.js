import mongoose from "mongoose"

const linkSchema = new mongoose.Schema({
   url: {
    type: String,
    required: true,
    trim: true,
   },
   platform: {
    type: String,
    required: true,
    enum: [ 'Youtube', 'Youtube', 'Linkedin', 'Facebbok', 'Frontend Mentor', 'other']
   },
   displayName: {
    type: String,
    trim: true,
    default: ''
   },
   description: {
    type: String,
     trim: true,
     default: ""
   },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

export default Link;
