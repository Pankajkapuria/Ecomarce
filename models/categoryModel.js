import mongoose from "mongoose";

const categorySchama = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
})

const categoryModel = mongoose.model('Categroy', categorySchama);
export default categoryModel;