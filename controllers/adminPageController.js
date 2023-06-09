const categoryService = require("../services/category");
const productService = require("../services/product");
const userService=require('../services/user')
const path = require('path')

const getAllCategorys = async (req,res) => {
    const categories = await categoryService.getAllCategorys();
    res.json(categories);

}
//***************ADDED------->
const getAdminPage2 = async (req,res) => {
    res.sendFile('userPage.html', { root: 'public/adminPage' });

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

const getCategoryByName = async (req,res) => {
    const category = await categoryService.getCategoryByName(req.params.categoryName);
    if (!category){
      return res.status(404).json({errors:['Category not found']});
    }
    res.json(category);
}

const getProductById = async (req,res) => {
    const product = await productService.getProductById(req.params.categoryNane,req.params.id);
    if (!product) {
        return res.status(404).json({errors:['Product not found']});
    }
    res.json(product);
}


const createCategory = async(req,res) => {
    const category = await categoryService.createCategory(req.params.categoryName,req.body.image);
    if(!category){
        return res.status(404).json({errors:["Category wasn't created"]});
    }
    res.json(category);
}

const createProduct = async(req,res) => {
    const {categoryName,productName,color,size,image,description,price,amount,brand,hot} = await req.body;
    const product = await productService.createProduct(categoryName,productName,req.params.id,color,size,image,description,price,amount,brand,hot = false)
    if(!product){
        return res.status(404).json({errors:["Product wasn't created"]});
    }
    res.json(product);
}
//----------------------------------------------------->

const getUserProfile = async(req, res) => {
    const user = req.session.username; 
    const schemauser = await userService.getUserById(user);
    res.json({schemauser});
    
  };
  


const getAllOrders = async(req, res) => {
    try {
        const username = req.session.username; 
       const orders= await userService.getAllorders(username);
       res.json({orders});
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  const getAllUsernames = async(req, res) => {
    try {
        const username = req.session.username; 
       const users= await userService.getAllUsernames(username);
       res.json({users});
    } catch (error) {
      console.error('Error fetching usernames:', error);
      throw error;
    }
  }

module.exports = 
{
    getAllCategorys,
    deleteCategory,
    getAdminPage,
    getCategoryDetails,
    deleteProduct,
    getAdminPage2,
    getCategoryByName,
    getProductById,
    createCategory,
    createProduct,
    getUserProfile,
    getAllUsernames,
    getAllOrders
    
   

}