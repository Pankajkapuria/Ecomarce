import express from "express";
import { admin, userAuth } from "../middlewhere/authMiddle.js";
import { createCategoryController, updateCategoryController, getCategoryController, singleCategoryController, deleteCategoryController } from "../contollers/CategoryController.js";

// route object
const categroyRoutes = express.Router();

// create-category
categroyRoutes.route('/create-Category').post(userAuth, admin, createCategoryController)

// update-category
categroyRoutes.route('/update-Category/:id').put(userAuth, admin, updateCategoryController)

// get all category
categroyRoutes.route('/get-category').get(getCategoryController);

// single-category
categroyRoutes.route('/single-category/:slug').get(singleCategoryController);

// delete-category
categroyRoutes.route('/delete-category/:id').delete(userAuth, admin, deleteCategoryController);

export default categroyRoutes;