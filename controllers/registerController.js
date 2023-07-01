
const userService = require('../services/user')


const getRegisterPage = async (req,res) => {
    res.sendFile('Register.html', { root: 'public/RegisterPage' });
}

const register=async(req,res)=>{
    const {username,email,birthdate,password}=req.body;
    const result=await userService.createUser(username,password,birthdate,email);
    if(result)
    {
        
        res.redirect('/login');
    }
    else
    {
        res.status(400).json({ error: "Username is already taken" });
    }
}




module.exports = {
    getRegisterPage,
    register
}
