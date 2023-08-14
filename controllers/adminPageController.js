const categoryService = require("../services/category");
const productService = require("../services/product");
const userService=require('../services/user')
const orderService = require('../services/order.js');
const path = require('path');

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

const updateCategory = async (req,res) =>{
    const {newName,newImage} = await req.body;
    const category = await categoryService.updateCategory(req.params.categoryName,newName,newImage);
    if (!category){
        return res.status(404).json({errors:['An error occurred while trying to update the category']});
    } else {
        res.json(category);
    }
}

const updateProduct = async (req,res) => {
    const {newName,newId,newColor,newSize,newImage,newDescription,newPrice,newAmount,newBrand,newHot} = await req.body;
    const product = await productService.updateProduct(req.params.categoryName,req.params.id,newName,newId,newColor,newSize,newImage,newDescription,newPrice,newAmount,newBrand,newHot);
    if(!product){
        return res.status(404).json({errors:['An error occurred while trying to update the product']});
    } else {
        res.json(product);
    }
}

const getCategoryByName = async (req,res) => {
    const category = await categoryService.getCategoryByName(req.params.categoryName);
    if (!category){
        return res.status(404).json({errors:['Category not found']});
    }
    res.json(category);
}

const isCategoryExist = async(req,res) => {
    var isExist;
    const category = await categoryService.getCategoryByName(req.params.categoryName);
    if(!category)
        isExist = false;
    else
        isExist = true;
    res.json(isExist);
}

const getProductById = async (req,res) => {
    const product = await productService.getProductById(req.params.categoryName,req.params.id);
    if (!product) {
        return res.status(404).json({errors:['product not found']});
    }
    res.json(product);
}


const createCategory = async(req,res) => {
    const category = await categoryService.createCategory(req.body.categoryName,req.body.image);
    if(!category){
        return res.status(404).json({errors:["Category wasn't created"]});
    }
    res.json(category);
}

const createProduct = async(req,res) => {
    const category = await productService.createProduct(req.body.categoryName,req.body.productName,req.body.Id,req.body.color,
        req.body.size,req.body.image,req.body.description,req.body.price,req.body.amount,req.body.brand,req.body.hot);
    if(!category){
        return res.status(404).json({errors:["Product wasn't created"]});
    }
    const product = await productService.getProductById(category.categoryName,req.body.Id);
    res.json(product);
}

const addProductAmount = async(req,res) => {
    const product = await productService.addProductAmount(req.body.categoryName,req.params.productName,req.body.amount);
    if(!product){
        return res.status(404).json({errors:["Amount wasn't added"]});;
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
    const orders= await orderService.getAllOrdersByUserName(username);
    res.json({orders});
} catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
}
}

const getAllOrdersByUserName = async(req, res) => {
    try {
        const username = req.session.username; 
        const orders= await orderService.getAllOrdersByUserName(username);
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const getPassword = async(req, res) => {
    try {
        const username = req.session.username; 
       const user= await userService.getUserById(username);
       const password=user.password;

       res.json({password});
    } catch (error) {
      console.error('Error fetching The user password:', error);
      throw error;
    }
  }


  const changePassword = async(req,res) => {
    try {
        console.log("hi there!");
        const username = req.session.username; 
        const oldpassword=req.body.oldPassword;
        const newpassword=req.body.newPassword;
        const user= await userService.getUserById(username);
        console.log(`oldpassword ${oldpassword}, newpassword ${newpassword}, user password ${await user.password}`);
        console.log("its camming dont worry----->");
        if(oldpassword===(await user.password)){
             v=(oldpassword===(await user.password));
            console.log(`the password comp are: ${v}`);

            console.log("its camming dont worry2");
            await userService.ChangePassword(username,newpassword);
            res.json({ success: true });
        }else{
            return res.status(404).json({errors:["The old password is incorrect"]});

        }
    } catch (error) {
      console.error('Error change The user password:', error);
      throw error;
    }
    }

module.exports = 
{
    getAllCategorys,
    deleteCategory,
    updateCategory,
    updateProduct,
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
    getAllOrders,
    isCategoryExist,
    getPassword,
    changePassword,
    getAllOrdersByUserName,
    addProductAmount
}