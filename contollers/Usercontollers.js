import hashpassword1 from "../helper/hash.js";
import userModel from "../models/userModel.js";
// registers 
const registerControllers = async (req, res, next) => {
    try {
        console.log(req.body)
        const { Name, email, password, confrom_password, question, phone, address, role } = req.body;
        if (!email) return next("email is require");
        if (!Name) return next("name is require");
        if (!address) return next("address is require");
        if (!phone) return next("phone is require");
        if (!question) return next("question is require");
        if (!password) return next("password is require");
        if (!confrom_password) return next("confrom_password is require");

        if (password != confrom_password) return next("password and confrom_password are not matched")

        // find email
        const matchemail = await userModel.findOne({ email })
        if (matchemail) {
            return next("email is already preasent login now")
        }

        const create = new userModel({
            Name, email, password, phone, address, question
        })
        const user = await create.save();

        res.status(201).send({
            sucess: true,
            user,
            'msg': 'register secuessfully'
        })

    } catch (error) {
        res.status(500).send({
            sucess: false,
            'msg': `Error in registers`,
            error
        })
    }
}

// login
const loginControllers = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next("please fill all filed ")
        }
        const user = await userModel.findOne({ email });
        if (!user) return next("email is not found please register first");

        const isCompaire = await user.CompairePassword(password);
        if (!isCompaire) return next("password is not match");

        const token = await user.creatToken();

        user.password = undefined;
        res.status(201).send({
            sucess: true,
            massage: "login secussefuuly",
            user,
            token
        })
    } catch (error) {
        res.status(500).send({
            sucess: false,
            massage: `Error in login`,
            error
        })
    }

}


// forget - Password - Controller
const forgetPasswordController = async (req, res, next) => {
    try {
        const { email, question, newpassword, confrom_newpasswored } = req.body
        if (!email) return next("email is required");
        if (!question) return next("question is required");
        if (!newpassword) return next("newpassword is required");
        if (!confrom_newpasswored) return next("confrom_newpasswored is required");
        if (newpassword !== confrom_newpasswored) return next("newpassword and confrom_newpasswored are not matched")

        // check
        const user = await userModel.findOne({ email, question });
        if (!user) return next("wrong email or question");

        const hspassword = await hashpassword1(newpassword);
        await userModel.findByIdAndUpdate(user._id, {
            password: hspassword
        })
        res.status(200).send({
            sucess: true,
            massage: "password Reset Sucessfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            massage: "somting wrong in forger-password",
            error
        })
    }
}

// Uset-Auth
const User_AuthControllers = async (req, res) => {
    res.send({
        "ok": true
    })
}

// admin
const adminControllers = async (req, res) => {
    res.send({
        "ok": true
    })
}

// test
const testControllers = async (req, res, next) => {
    res.send({
        sucess: true,
        msg: "authorizrtion router"
    })
}



export { registerControllers, loginControllers, testControllers, User_AuthControllers, forgetPasswordController, adminControllers };