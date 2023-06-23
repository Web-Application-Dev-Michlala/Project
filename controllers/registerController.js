
const userService = require('../services/user')


const getRegisterPage = async (req,res) => {
    res.sendFile('Register.html', { root: 'public/RegisterPage' });
}
const register=async(req,res)=>{
    const {username,email,birthdate,password}=req.body;
    const result=await userService.createUser(username,password,birthdate,email);
    if(result)
    {
        req.session.username = username
        res.redirect('/login');
    }
    else
    {
        res.sendFile('loginError.html', { root: 'public/LoginError' });
    }
}




module.exports = {
    getRegisterPage,
    register
}
