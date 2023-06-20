const categoryModel = require('../models/category.js');

const createCategory = async (categoryName) => {
    try {
        const category = new categoryModel({ categoryName });
        await category.save();
        return category;
    } catch (err) {
        console.error(err);
    }
};

const deleteCategory = async (categoryName) => {
    try {
        const category = await categoryModel.findOneAndDelete({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        return category;
    } catch (err) {
        console.error(err);
    }
};


const getAllCategorys = async () => {
    try {
        const categories = await categoryModel.find();
        return categories;
    } catch (err) {
        console.error(err);
    }
};

const getCategoryByName = async (categoryName) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        return category;
    } catch (err) {
        console.error(err);
    }
};


module.exports = { 
    createCategory, 
    deleteCategory, 
    getAllCategorys, 
    getCategoryByName
};