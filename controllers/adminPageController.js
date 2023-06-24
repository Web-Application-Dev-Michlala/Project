const categoryService = require("../services/category");
const productService = require("../services/product");
const path = require('path')

const getAllCategorys = async (req,res) => {
    const categories = await categoryService.getAllCategorys();
    res.json(categories);

}
//***************ADDED
const getAdminPage2 = async (req,res) => {
    res.sendFile('deleteButtons.html', { root: 'public/adminPage' });

}
//*******************

const getAdminPage = async (req,res) => {
    res.sendFile(path.join(__dirname,"../public/deleteProduct/deleteProduct.html"))

}
const getCategoryDetails = async (req,res) => {
    const category = await categoryService.getCategoryByName(req.params.categoryName);
    if(category) {
        res.status(200).json(category);
    } else {
        res.status(500).json({ error: 'An error occurred while trying to get the category' });
    }

}

const deleteCategory = async (req, res) => {
    const deletedCategory = await categoryService.deleteCategory(req.params.categoryName);
    if(deletedCategory) {
        res.status(200).json(deletedCategory);
    } else {
        res.status(500).json({ error: 'An error occurred while trying to delete the category' });
    }
}

const deleteProduct = async (req, res) => {
    const { categoryName, productName } = await req.body;
    const deletedProduct = await productService.deleteProduct(categoryName, productName);
    if(deletedProduct) {
        res.status(200).json(deletedProduct);
    } else {
        res.status(500).json({ error: 'An error occurred while trying to delete the category' });
    }
}



module.exports = 
{
    getAllCategorys,
    deleteCategory,
    getAdminPage,
    getCategoryDetails,
    deleteProduct,
    getAdminPage2

}