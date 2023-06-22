const mongoose = require('mongoose');
const user = require('./services/user');



try{
    mongoose.connect('mongodb+srv://shahargut2:u7Fsk8KLaJe4IzOi@cluster0.lctj22i.mongodb.net/');
    console.log('Connected to MongoDB');
    loadUserDB();
   
    


}catch(err){
    console.error('Error connecting to MongoDB', err);
}

async function loadUserDB(){
    console.log('insert to db');
    const users=await user.createUser("user","111",12/2/1999,"maechpatlch@gmail.com",false);
    console.log('done');
    exit();

}