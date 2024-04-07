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
    enum: [ , 'Youtube', 'Linkedin', 'Facebbok', 'Frontend Mentor', 'other']
   },

   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

export default Link;
