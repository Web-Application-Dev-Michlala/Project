const mongoose = require('mongoose');

const productService = require('./services/product.js')
const category = require('./services/category.js')

try{
    mongoose.connect('mongodb+srv://shahargut2:u7Fsk8KLaJe4IzOi@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
    //productService.createProduct('TestPhone',100,'Phones','Red',14.2,'public/images/Phones.jpg','This is a phone',1000,5,"Apple",false,'Some more text');
    ExampleToSortByColor();
    
    


}catch(err){
    console.error('Error connecting to MongoDB', err);
}


async function ExampleToSortByColor() {
    try {
      await category.createCategory('Radio');
      await productService.createProduct('Radio','TestPhone',1630,'red',14.2,'public/images/TestPhone.jpg','asdfsadf',1000,2,'samsung',true,'asdfaf');
      console.log('done');
    } catch (err) {
      console.error('Error creating category', err);
    }
  }