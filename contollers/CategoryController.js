import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// create category
const createCategoryController = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) return next("Category name is required");
        const existingCategrory = await categoryModel.findOne({ name });
        if (existingCategrory) return next("Category Aleady exites");

        const categroy = await new categoryModel({ name, slug: slugify(name) })
        categroy.save();
        res.status(201).send({
            success: true,
            message: 'new categroy created',
            categroy
        })



    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Categroy'
        })
    }
}


// updateCategoryController
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category update sucessFully",
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in update Categroy'
        })
    }
}

// getCategoryController
const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All category list",
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in get Categroy'
        })
    }
}

// singleCategoryController
const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug })
        res.status(200).send({
            success: true,
            message: "single category list",
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in single get Categroy'
        })
    }
}

// deleteCtegoryController
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete({ _id: id });
        res.send({
            success: true,
            message: "delete category list",
            deleteCategory
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in delete Categroy'
        })
    }

}

export { createCategoryController, updateCategoryController, getCategoryController, singleCategoryController, deleteCategoryController };