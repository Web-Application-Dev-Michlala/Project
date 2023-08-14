const express = require('express');
const mongoose = require('mongoose');

//require('custom-env').env('local','./config')

const cartRouter=require('./routes/cartRoute')
const homepageRouter=require('./routes/homepageRoute')
const adminPageRoute=require('./routes/adminPageRoute')
const categoryRouter=require('./routes/productsListRoute')
const loginRouter=require('./routes/loginRoute')
const registerRouter=require('./routes/registerRoute')
const productRouter=require('./routes/productNameRoute')
const userRoute=require('./routes/userRoute.js')
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

app.use('/cart',cartRouter);
app.use('/category',categoryRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/users',userRoute)
app.use('/adminPage',adminPageRoute);
app.use('/ProductsPage',productRouter);
app.use('/', homepageRouter);

const server = app.listen(3000);
console.log('listening to 3000');

const io = require('socket.io')(server);

io.on('connection', (socket) => {
 
    socket.on('add product',(product) => {
        io.emit('add product',product);
    });
    
    socket.on('product restock',(product) => {
        io.emit('product restock',product);
    })
    
    socket.on('limited product',(product) => {
        socket.broadcast.emit('limited product',product);
    })
    
    socket.on('out of stock',(product) => {
        socket.broadcast.emit('out of stock',product);
    })
});