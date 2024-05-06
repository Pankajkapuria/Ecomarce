import mongoose from "mongoose";

const producateSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Categroy',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
    }
}, {
    timestamps: true
})

const producateModel = mongoose.model("producateModel", producateSchama);
export default producateModel;