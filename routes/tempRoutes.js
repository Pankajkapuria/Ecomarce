import express from 'express'
import tempModal from '../models/tempModal';

const temprouter = express.Router()

temprouter.route('/temp').post(async (req, res) => {
    try {
        const st = new tempModal({
            name: req.body
        })
        st.save();
    } catch (error) {

    }

})


export default temprouter;
