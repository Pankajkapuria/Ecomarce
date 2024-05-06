import slugify from "slugify";
import producateModel from "../models/producateModel.js";
import fs from 'fs';

// create Product controllers
const createproductControllers = async (req, res, next) => {
    try {
        const { name, slug, description, price, quantity, category, shipping } = req.fields
        const { photo } = req.files
        if (!name) return next("name is required")
        if (!description) return next("description is required")
        if (!price) return next("price is required")
        if (!quantity) return next("quantity is required")
        if (!category) return next("category is required")
        if (!photo && photo.size > 100000) return next("photo is required and should be less then 1Mb")
        const products = new producateModel({ ...req.fields, slug: slugify(name) });
        // photo validate
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();
        res.status(200).send({
            sucess: true,
            message: "product creat sucessfully",
            products
        })

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "error in create producate",
            error
        })
    }
}

// get all product
const getproductControllers = async (req, res) => {
    try {
        const products = await producateModel.find({}).select('-photo').limit(15).sort({ createdAt: -1 }).populate("category");
        res.status(200).send({
            sucess: true,
            message: "get all product",
            totelCount: products.length,
            products
        })
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "error in get producte",
            error
        })
    }
}

// single product
const SingleproductControllers = async (req, res) => {
    try {
        const { id } = req.params
        const singleProduct = await producateModel.findById({ _id: id }).select('-photo').populate("category");
        res.send({
            sucess: true,
            message: "single product",
            singleProduct
        })
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "error while get single product",
            error
        })
    }
}

// get product photo
const getProductPhotoControllers = async (req, res, next) => {
    try {
        const product = await producateModel.findById(req.params.pid).select("photo");
        if (product?.photo?.data) {
            res.set('contentType', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        return next("photo not get")
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Error while geting product photo",
            error
        })
    }
}

// delete product
const deleteProductControllers = async (req, res) => {
    try {
        await producateModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            sucess: true,
            message: "producted delete sucessfully"
        })
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Error while geting product photo",
            error
        })
    }
}


// update product
const updateproductControllers = async (req, res, next) => {
    try {
        const { name, slug, description, price, quantity, category, shipping } = req.fields
        const { photo } = req.files
        if (!name) return next("name is required")
        if (!description) return next("description is required")
        if (!price) return next("price is required")
        if (!quantity) return next("quantity is required")
        if (!category) return next("category is required")
        if (photo && photo.size > 100000) return next("photo is required and should be less then 1Mb")

        const products = await producateModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })

        // photo validate
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();
        res.status(200).send({
            sucess: true,
            message: "product update sucessfully",
            products
        })

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "error while update producate",
            error
        })
    }
}

export { createproductControllers, getproductControllers, SingleproductControllers, getProductPhotoControllers, deleteProductControllers, updateproductControllers };