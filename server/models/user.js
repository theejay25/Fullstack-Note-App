import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    isVerified: {type:Boolean, default: false}
})

const User = mongoose.model('Note-App user', UserSchema);
export default User