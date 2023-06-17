const productService = require('../services/product')
const path = require('path')


const getProuductsListPage = async (req,res) => {
    res.sendFile(path.join(__dirname,"../public/ProductsList/productsList.html"))
}

const getProductsByName = async (req,res) => {
    const products = await productService.getProductsByName(req.params.category,req.params.name);
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    if(products.length == 1){
        //get to page of product
    }
    else{
        res.json(products);
    }
};

const getProductById = async (req,res) => {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
        return res.status(404).json({errors:['product not found']});
    }
    //send product page
};

const getProductsByPriceRange = async (req,res) => {
    const products = await productService.getProductsByPriceRange(req.params.category,req.params.min,req.params.max);
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

const getProductsByColors = async (req,res) => {
    const products = await productService.getProductByColors(req.params.category,req.params.colors.split(','));
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

const getProductsBySizes = async (req,res) => {
    const products = await productService.getProductsByPriceSizes(req.params.category,req.params.sizes.split(','));
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

module.exports = 
{
    getProuductsListPage,
    getProductsByName,
    getProductById,
    getProductsByPriceRange,
    getProductsByColors,
    getProductsBySizes
}