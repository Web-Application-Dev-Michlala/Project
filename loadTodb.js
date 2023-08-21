const mongoose = require('mongoose');
const category = require('./services/category')
const product = require('./services/product')
const shop = require('./services/shop')

try{
    mongoose.connect('mongodb+srv://shahargut2:u7Fsk8KLaJe4IzOi@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
    loadDB();
   
    


}catch(err){
    console.error('Error connecting to MongoDB', err);
}

async function loadDB(){
    console.log('insert to db')
    /*
    await shop.createShop(32.7940,34.9896,"Haifa");
    await shop.createShop(31.7907, 34.6450,"Ashdod");
    await shop.createShop(32.0853, 34.7818,"Tel-Aviv");
    await shop.createShop(31.2438, 34.7930,"Beer-Sheva");
    await shop.createShop(31.7683, 35.2137,"Jerusalem");
    await shop.createShop(29.5561, 34.9519,"Eilat");
    */
    console.log('done')
}