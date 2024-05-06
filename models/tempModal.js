import mongoose from 'mongoose'

const tempSchama = new mongoose.Schema({
    name: {
        type: String
    }
})

const tempModal = mongoose.model('tempCollection', tempSchama);

export default tempModal;
