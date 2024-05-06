import e from "express";
import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ecroumace");
        console.log(`Connection is seccessfully`.bgBlue.white)

    } catch (error) {
        console.log(`Connection is not seccessfully ${error}`.bgRed.white)
    }
}

export default connect;