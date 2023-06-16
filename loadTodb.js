const mongoose = require('mongoose');
const category = require('./services/category')
const product = require('./services/product')
try{
    mongoose.connect('mongodb+srv://shahargut2:eMNpX8KBONU5H324@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
    loadDB();
   
    


}catch(err){
    console.error('Error connecting to MongoDB', err);
}

async function loadDB(){
    console.log('insert to db')
    const products = await product.createProduct('Iphone',100,'Phones','Red',14.2,'public/images/Phones.jpg','This is a phone',1000,5,false,'Some more text');

    await category.createCategory('Phones');

    await category.addProductToCategory('Phones',products);
    console.log('done')
}