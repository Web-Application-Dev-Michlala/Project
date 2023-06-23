const express = require('express');
const mongoose = require('mongoose');
//require('custom-env').env('local','./config')

const homepageRouter=require('./routes/homepageRoute')
const adminPageRoute=require('./routes/adminPageRoute')

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
try{
    mongoose.connect('mongodb+srv://shahargut2:u7Fsk8KLaJe4IzOi@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
}catch(err){
    console.error('Error connecting to MongoDB', err);
}
homepageRouter.use(express.static('public/HomePage'));
app.use('/', homepageRouter);
adminPageRoute.use(express.static('public/deleteProduct'));
app.use('/adminPage/',adminPageRoute);

app.listen(3000);
console.log('listening to 3000');