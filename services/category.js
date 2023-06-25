const categoryModel = require('../models/category.js');

const createCategory = async (categoryName,image) => { // added image
    try {
        const category = new categoryModel({ categoryName,image });
        await category.save();
        return category;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const deleteCategory = async (categoryName) => {
    try {
        const category = await categoryModel.findOneAndDelete({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
            return null;
        }
        return category;
    } catch (err) {
        console.error(err);
        return null;
    }
};


const getAllCategorys = async () => {
    try {
        const categories = await categoryModel.find();
        return categories;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getCategoryByName = async (categoryName) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
            return null;
        }
        return category;
    } catch (err) {
        console.error(err);
        return null;
    }
};


module.exports = { 
    createCategory, 
    deleteCategory, 
    getAllCategorys, 
    getCategoryByName
};