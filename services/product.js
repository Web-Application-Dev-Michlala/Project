const productModel = require('./../models/product.js');

const createProduct = async(name,id,category,color,size,image,description,price,amount,hot = false,comments = []) => {
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
        comments
        });
        return await product.save();
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

module.exports = {
    createProduct,
    deleteProduct
}