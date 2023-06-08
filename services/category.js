const categoryModel = require('./models/category');

const createCategory = async (categoryName) => {
    try {
        const category = new categoryModel({ categoryName });
        return await category.save();;
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

const addProductToCategory = async (categoryName, product) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        category.products.push(product);
        return await category.save();;
    } catch (err) {
        console.error(err);
    }
};

const removeProductFromCategory = async (categoryName, productId) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        category.products = category.products.filter(product => product.id !== productId);
        return await category.save();;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { 
    createCategory, 
    deleteCategory, 
    addProductToCategory, 
    removeProductFromCategory 
};