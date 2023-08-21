const usersModel = require('../models/users.js');
const orderModel = require('../models/order.js');

const createUser = async( userName,password,birthdate,email,isAdmin=false,purchaseHistory = []) => {
    try {
       
    const user= new usersModel({
            userName,
            password,
            birthdate,
            email,
            isAdmin,
            purchaseHistory
        })
        await user.save();
        return user;
    } catch (err) {
            console.error(err);
        return null;
    }
}

const getUserById = async (userName) => {
    try {
        const user = await usersModel.findOne({ userName });
        if (!user) {
            console.error(`User with this username:${userName} not found`);
            return null;
        }
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const ChangePassword = async(userName,password)=>{
    try {
        const user = await usersModel.findOne({ userName });

        if (!user) {
            console.error(`User with this username:${userName} not found`);
            return null;
        }
        user.password=password;
        await user.save();
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }

}

const ChangeProfile = async(userName,newUserName,email,birthday)=>{
    try {
        const user = await usersModel.findOne({ userName });
        if (!user) {
            console.error(`User with this username:${userName} not found`);
            return null;
        }
        user.userName=newUserName;
        user.email=email;
        console.log("bd:"+user.email);


        console.log("bd:"+user.birthdate);
        user.birthdate=birthday;
        await user.save();
        console.log("bd:"+user.birthdate);
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }

}

const login = async(userName,password)=>{

    try {
        const user = await usersModel.findOne({ userName });

        if (!user) {
            console.error(`User with this username:${userName} not found`);
            return null;
        }
        if(user.password=== password)
        return user;
        else{ 
            console.error(`User with this password not found`);
            return null;}
  
    } catch (err) {
        console.error(err);
        return null;
    }

}
const setAdmin = async(userName,isAdmin)=>{
    try {
        const user = await usersModel.findOne({ userName });

        if (!user) {
            console.error(`User with this username:${userName} not found`);
            return null;
        }
        user.isAdmin=isAdmin;
        await user.save();
        return user;
        
  
    } catch (err) {
        console.error(err);
        return null;
    }

}


const getAllUsernames = async(userName)=>{
    try {
      
        const userNames = await usersModel.find({}, 'userName'); 
        return userNames;
    } catch (err) {
        console.error(err);
        return null;
    }

}

const getAllorders = async(userName)=>{
    try {
        const user = await usersModel.findOne({ userName });

        if (!user  ) {
            console.error(`User with this username:${userName} not found or dont have permissions`);
            return null;
        }

        return  user.purchaseHistory; 
      

        
  
    } catch (err) {
        console.error(err);
        return null;
    }

}


  


module.exports = { 
    createUser,
    getUserById,
    ChangePassword,
    login,
    setAdmin,
    getAllUsernames,
    getAllorders,
    ChangeProfile,
    

};