const categoryModel = require('../models/category.js');

const createProduct = async(categoryName,name,id,color,size,image,description,price,amount,brand,hot = false,comments = []) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
            return null;
        }
        category.products.push({
            name, 
            id, 
            category:categoryName, 
            color, 
            image, 
            size, 
            hot, 
            description, 
            price, 
            amount, 
            comments,
            brand
        })
        await category.save();
        return category;
    } catch (err) {
        console.error(err);
        return null;
    }
}
const deleteProduct = async (categoryName,id) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
            return null;
        }
        const index = category.products.findIndex(product => product.id === id);
        category.products.
        category.products.splice(index,1);
        await category.save();
        return category;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getProductByName = async (categoryName,name) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const product = category.products.find(product=>product.name === name);
        if(!product){
            console.error(`Product ${name} not found`);
            return null;
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductById = async (categoryName,id) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const product = category.products.find(product=>product.id === id);
        if(!product){
            console.error(`Product with ${id} not found`);
            return null;
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductByColor = async (categoryName,color) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const product = category.products.filter(product=>product.color === color);
        if(!product){
            console.error(`Product with ${color} not found`);
            return null;
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductBySize = async (categoryName,size) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const product = category.products.filter(product=>product.size === size);
        if(!product){
            console.error(`Product with ${size} not found`);
            return null;
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductByPrice = async (categoryName,price) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const product = category.products.filter(product=>product.price === price);
        if(!product){
            console.error(`Product with ${price} not found`);
            return null;
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    getProductByName,
    getProductById,
    getProductByColor,
    getProductBySize,
    getProductByPrice
};