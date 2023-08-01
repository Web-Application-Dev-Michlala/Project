const productService = require('../services/product')
const path = require('path')



const getProuductsListPage = async (req,res) => {
 
    res.sendFile(path.join(__dirname,"../public/ProductsList/productsList.html"))
}

const getAllProductsByCategory = async (req,res) => {
    const categoryName = req.params.categoryName;
    const products = await productService.getAllProductsByCategory(categoryName);
    if(!products){
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
}

const getCurrentCategory = async(req,res) => {
    console.error(req.path.name);
}

const getProductsByName = async (req,res) => {
    const products = await productService.getProductsByName(req.params.categoryName,req.params.name);
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    //if(products.length == 1){
    //    get to page of product
    //}
    //else{
        res.json(products);
    //}
};

const getProductById = async (req,res) => {
    const product = await productService.getProductById(req.params.categoryName,req.params.id);
    if (!product) {
        return res.status(404).json({errors:['product not found']});
    }
    res.json(product);
    //send product page
};

const getProductsByPriceRange = async (req,res) => {
    const priceRange = req.params.priceRange;
    const products = await productService.getProductsByPriceRange(req.params.categoryName,parseFloat(priceRange.split(",")[0]),parseFloat(priceRange.split(",")[1]));
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

const getProductsByColors = async (req,res) => {
    const products = await productService.getProductsByColors(req.params.categoryName,req.params.colors.split(','));
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

const getProductsBySizes = async (req,res) => {
    const products = await productService.getProductsBySizes(req.params.categoryName,req.params.sizes.split(','));
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

const getProductsByBrands = async (req,res) => {
    const products = await productService.getProductsByBrands(req.params.categoryName,req.params.brands.split(','));
    if (!products) {
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
};

const getProductsByColorsSizesBrands = async (req,res) => {
    var colors = req.params.colors;
    var sizes = req.params.sizes;
    var brands = req.params.brands;
    const products = await productService.getProductsByColorsSizesBrands(req.params.categoryName,colors.split(','),sizes.split(','),brands.split(','));
    if(!products){
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
}

const getProductsByColorsBrandsPriceRange = async (req,res) => {
    var colors = req.params.colors;
    var brands = req.params.brands;
    var priceRange = req.params.priceRange;
    const products = await productService.getProductsByColorsBrandsPriceRange(req.params.categoryName,colors.split(','),brands.split(','),
    parseFloat(priceRange.split(',')[0]),parseFloat(priceRange.split(',')[1]));
    if(!products){
        return res.status(404).json({errors:['products not found']});
    }
    res.json(products);
}

module.exports = 
{
    getCurrentCategory,
    getAllProductsByCategory,
    getProuductsListPage,
    getProductsByName,
    getProductById,
    getProductsByPriceRange,
    getProductsByColors,
    getProductsBySizes,
    getProductsByBrands,
    getProductsByColorsSizesBrands,
    getProductsByColorsBrandsPriceRange
}