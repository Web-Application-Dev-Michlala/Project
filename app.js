const express = require('express');
const mongoose = require('mongoose');
//require('custom-env').env('local','./config')

const homepageRouter=require('./routes/homepageRoute')
const adminPageRoute=require('./routes/adminPageRoute')
const categoryRouter=require('./routes/productsListRoute')
const loginRouter=require('./routes/loginRoute')
const registerRouter=require('./routes/registerRoute')
const productRouter=require('./routes/productNameRoute')
const session = require('express-session')
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
app.use(session({
    secret: 'key',    
    saveUninitialized: false,
    resave: false
}))

app.use('/category',categoryRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/adminPage',adminPageRoute);
app.use('/ProductsPage',productRouter);
app.use('/', homepageRouter);

//app.post('/adminPage/changePassword', adminPageController.changePassword);

app.listen(3000);
console.log('listening to 3000');