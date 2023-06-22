const mongoose = require('mongoose');

const productService = require('./services/product.js')

try{
    mongoose.connect('mongodb+srv://shahargut2:u7Fsk8KLaJe4IzOi@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
    //product.createProduct('TestPhone',100,'Phones','Red',14.2,'public/images/Phones.jpg','This is a phone',1000,5,"Apple",false,'Some more text');
    ExampleToSortByColor();
    
    


}catch(err){
    console.error('Error connecting to MongoDB', err);
}


async function ExampleToSortByColor(){
    console.log('insert to db')
    //await category.createCategory('Phones');
    const prodArray = await productService.getProductByColor('Phones','Black');
    for(const product of prodArray)
    {
        console.log(`${product.name} ${product.color}`);
    }
    
    console.log('done')
}