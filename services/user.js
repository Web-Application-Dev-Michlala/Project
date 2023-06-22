const usersModel = require('../models/users.js');


const createUser = async( userName,password,birthdate,email,isAdmin,purchaseHistory = []) => {
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
        user.password= password;
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


module.exports = { 
    createUser,
    getUserById,
    ChangePassword,
    login,
    setAdmin,
};