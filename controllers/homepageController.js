const categoryService = require('../services/category')
const productService=require('../services/product')
const path = require('path')


const getHomePage = async (req,res) => {
    res.sendFile(path.join(__dirname,"../public/HomePage/homepage.html"))

}

const getAllCategorys = async (req,res) => {
  const categories = await categoryService.getAllCategorys();
  res.json(categories);
}

const getCategoryByName = async (req,res) => {
  const category = await categoryService.getCategoryByName(req.params.id);
  if (!category){
    return res.status(404).json({errors:['Category not found']});
  }
  res.json(category);
}


const getProductById = async (req,res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
      return res.status(404).json({errors:['product not found']});
  }
}


module.exports = 
{
    getHomePage,
    getAllCategorys,
    getCategoryByName,
    getProductById
    
}