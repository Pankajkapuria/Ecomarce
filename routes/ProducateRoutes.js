import express from "express";
import { admin, userAuth } from "../middlewhere/authMiddle.js";
import { createproductControllers, getproductControllers, SingleproductControllers, getProductPhotoControllers, deleteProductControllers, updateproductControllers } from "../contollers/productController.js";
import formidable from 'express-formidable'

// route object
const productRoutes = express.Router();

// create-product
productRoutes.route('/create-product').post(userAuth, admin, formidable(), createproductControllers);

// get-producate list
productRoutes.route('/get-product').get(getproductControllers);

// single product
productRoutes.route('/single-product/:id').get(SingleproductControllers);

// get product photo
productRoutes.route('/get-product-photo/:pid').get(getProductPhotoControllers);

// delete product
productRoutes.route('/delete-product/:pid').delete(userAuth, admin, deleteProductControllers);

// update product
productRoutes.route('/update-product/:pid').put(userAuth, admin, formidable(), updateproductControllers);









export default productRoutes;