import mongoose from 'mongoose';

proffileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

}, { timestanps: true});

const Profile = mongoose.model('Profille', profileSchema);
export default Profile;