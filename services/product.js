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
const deleteProduct = async (categoryName,productName) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
            return null;
        }
        const index = category.products.findIndex(product => product.name === productName);
        category.products.splice(index,1);
        await category.save();
        return category;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getAllProductsByCategory = async (categoryName) => {
    try{
        const category = await categoryModel.findOne({categoryName});
        if(!category){
            console.error(`Category ${categoryName} not found`);
            return null;      
        }
        const products = category.products;
        if(!products){
            console.error(`Product in category ${categoryName} not found`);
            return null;
        }
        return products;
    } catch(err){
        console.error(err);
    }
}

const getProductByName = async (categoryName,name) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
            return null;
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
        const product = category.products.filter(product=>product.id == id);
        if(!product || product.length == 0){
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

const getProductsByName = async (categoryName,name) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const products = category.products.filter(product=>product.name.includes(name));
        if(!products){
            console.error(`Product ${name} not found`);
            return null;
        }
        return products;
    } catch (err) {
        console.error(err);
    }
};

const getProductsByPriceRange = async (categoryName,minPrice,maxPrice) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const products = category.products.filter(product=> product.price >= minPrice && product.price <= maxPrice);
        if(!products){
            console.error(`Product between ${minPrice} and ${maxPrice} not found`);
            return null;
        }
        return products;
    } catch (err) {
        console.error(err);
    }
    
};

const getProductsByColors = async (categoryName,colors) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const products = category.products.filter(product=> colors.includes(product.color));
        if(!products){
            console.error(`Product with ${color} not found`);
            return null;
        }
        return products;
    } catch (err) {
        console.error(err);
    }
};

const getProductsBySizes = async (categoryName,sizes) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const products = category.products.filter(product=>sizes.includes(product.size.toString()));//changing to string because of decimal128 having problems
        if(!products){
            console.error(`Product with ${size} not found`);
            return null;
        }
        return products;
    } catch (err) {
        console.error(err);
    }
};

const getProductsByBrands = async (categoryName,brands) => {
    try {
        const category = await categoryModel.findOne({ categoryName });
        if (!category) {
            console.error(`Category ${categoryName} not found`);
        }
        const products = category.products.filter(product=>brands.includes(product.brand));
        if(!products){
            console.error(`Product with ${size} not found`);
            return null;
        }
        return products;
    } catch (err) {
        console.error(err);
    }
};
const validateAmount = async (categoryName,name,amount)=>
{
    const category = await categoryModel.findOne({ categoryName });
    if (!category) 
    {
        console.error(`Category ${categoryName} not found`);
        return 0;
    }
    const product = category.products.find(product=>product.name === name);
    if(!product){
        console.error(`Product ${name} not found`);
        return 0;
    }
  
    if(product.amount<amount)
    {
    console.error(`Amount of ${name} is too high`)
        return 1
    }
    return 2
}
const validateAll = async (cart) => {
    var toRemove = [];
  
    if (!cart || cart.length === 0) {
      return toRemove;
    }
  
    for (const category of cart) {
      for (const item of category.items) {
        const flag = await validateAmount(category.category, item.name, item.amount);
        console.log("this is flag" + flag);
  
        if (flag === 0) {
          const newItem = {
            category:category.category,
            name:item.name,
            amount:0
          };
          toRemove.push(newItem);
        } else if (flag === 1) {
          const product = await getProductByName(category.category, item.name)
          const updatedAmount = product.amount
            console.log("this is updated amount " + updatedAmount);
          const newItem = {
            category:category.category,
            name:item.name,
            amount:updatedAmount
          };
          
          toRemove.push(newItem);
        }
      }
    }
  
    return toRemove;
  };

const removeItems = async (cart)=>{
  
    for (const category of cart) {
        for (const item of category.items)
        {
            console.log("now at reduceAmount "+category.category,item.name,item.amount)
            const check = await reduceAmount(category.category,item.name,item.amount);
            
        }
  }
  return 1;
}
const reduceAmount=async (categoryName,productName,amountToRemove)=>
{
try {
    const category = await categoryModel.findOne({ categoryName });
    if (!category) {
        console.error(`Category ${categoryName} not found`);
        return null;
    }
    const index = category.products.findIndex(product => product.name === productName);
    category.products[index].amount -= amountToRemove;
    await category.save();
    return category;
} 
catch (err) {
    console.error(err);
    return null;
}
};


 
module.exports = {
    createProduct,
    deleteProduct,
    getProductByName,
    getProductById,
    getProductByColor,
    getProductBySize,
    getProductByPrice,
    getProductsByName,
    getProductsByPriceRange,
    getProductsByColors,
    getProductsBySizes,
    getProductsByBrands,
    getAllProductsByCategory,
    validateAmount,
    validateAll,
    removeItems
};