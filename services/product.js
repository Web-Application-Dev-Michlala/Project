const productModel = require('./../models/product.js');

const createProduct = async(name,id,category,color,size,image,description,price,amount,brend,hot,comments = []) => {
    try {
        const product = new productModel({
        name, 
        id, 
        category, 
        color, 
        image, 
        size, 
        hot, 
        description, 
        price, 
        amount, 
        comments,
        brend
        });
        await product.save();
        return product;
    } catch (err) {
        console.error(err);
    }
}
const deleteProduct = async (id) => {
    try {
        const product = await productModel.findOneAndDelete({ id });
        if (!product) {
            console.error(`Product with ID ${id} not found`);
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductByName = async (name) => {
    try {
        const product = await productModel.findOne({ name });
        if (!product) {
            console.error(`Product with name ${name} not found`);
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductById = async (id) => {
    try {
        const product = await productModel.findOne({ id });
        if (!product) {
            console.error(`Product with ID ${id} not found`);
        }
        return product;
    } catch (err) {
        console.error(err);
    }
};

const getProductByColor = async (color) => {
    try {
        const products = await productModel.find({ color });
        return products;
    } catch (err) {
        console.error(err);
    }
};

const getProductBySize = async (size) => {
    try {
        const products = await productModel.find({ size });
        return products;
    } catch (err) {
        console.error(err);
    }
};

const getProductByPrice = async (price) => {
    try {
        const products = await productModel.find({ price });
        return products;
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