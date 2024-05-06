import { registerControllers, loginControllers, testControllers, adminControllers, User_AuthControllers, forgetPasswordController } from "../contollers/Usercontollers.js";
import Router from "express";
import { userAuth, admin } from "../middlewhere/authMiddle.js";

// routeing object
const userRoutes = Router();

// registers || Method POST
userRoutes.route('/register').post(registerControllers);

// login || Method get
userRoutes.route('/login').post(loginControllers);

// test || Method get
userRoutes.route('/test').get(userAuth, admin, testControllers);

// user - auth
userRoutes.route('/user-auth').get(userAuth, User_AuthControllers);

// admin route
userRoutes.route('/admin-auth').get(userAuth, admin, adminControllers);

// forget-password
userRoutes.route('/forget-password').post(forgetPasswordController);

export default userRoutes;