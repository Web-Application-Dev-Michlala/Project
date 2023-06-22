const express = require('express');
const mongoose = require('mongoose');
const homepageRouter=require('./routes/homepageRoute')
const categoryRouter=require('./routes/productsListRoute')
const app = express();

app.use("/public",express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
try{
    mongoose.connect('mongodb+srv://shahargut2:u7Fsk8KLaJe4IzOi@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
}catch(err){
    console.error('Error connecting to MongoDB', err);
}
app.use('/category',categoryRouter)
app.use('/', homepageRouter);



app.listen(3000);
console.log('listening to 3000');