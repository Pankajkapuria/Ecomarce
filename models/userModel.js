import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { configDotenv } from "dotenv";
import Jwt from "jsonwebtoken";
const userSchama = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
})

userSchama.pre('save', async function () {
    if (!this.isModified) return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchama.methods.CompairePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
userSchama.methods.creatToken = async function () {
    return Jwt.sign({ userId: this._id }, process.env.SERACT_KEY, {
        expiresIn: '1d'
    })
}

const userModel = mongoose.model('Users', userSchama);
export default userModel;