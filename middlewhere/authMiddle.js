import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = await Jwt.verify(token, process.env.SERACT_KEY);
        if (!payload) {
            res.send({
                sucess: false,
                msg: "not token"
            })
        }
        req.user = { userId: payload.userId };
        next();

    } catch (error) {
        res.status(500).send({
            sucess: false,
            massage: "error in auth middleWhere"
        })
    }
}

// admin access

const admin = async (req, res, next) => {
    const data = await userModel.findById(req.user.userId);
    if (data.role !== 1) {
        return next("not admin");
    }
    next();
}

export { userAuth, admin };