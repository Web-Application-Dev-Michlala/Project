const categoryService = require('../services/category')
const path = require('path')


const getHomePage = async (req,res) => {
    res.sendFile(path.join(__dirname,"../public/HomePage/homepage.html"))

}

const getAllCategorys = async (req,res) => {
  const categories = await categoryService.getAllCategorys();
  res.json(categories);
}

const getCategoryByName = async (req,res) => {
  const category = await categoryService.getCategoryByName(req.params.categoryName);
  if (!category){
    return res.status(404).json({errors:['Category not found']});
  }
  res.json(category);
}

const getAllProductsByCategory = async (req,res) => {
    const category = await categoryService.getAllProductsByCategory(req.params.categoryName);
    if (!category){
        return res.status(404).json({errors:['Category not found']});
};
res.json(category);
}




module.exports = 
{
    getHomePage,
    getAllCategorys,
    getCategoryByName,
    getAllProductsByCategory,
}