const userService=require('../services/user')

const getLoginPage = async (req,res) => {
  if(req.session.username!=null)
    res.redirect('/');
  else
    res.sendFile('login.html', { root: 'public/Login' });
}

const isLoggedInNav=async(req, res)=>
{
    if (req.session.username != null)
    {
    var isConnected=req.session.username;
    res.json({isConnected});
    }
    else{
        isConnected=false;
    res.json({isConnected});
    }
}
const isntLoggedInNav=async(req, res,next)=>
{
  if (req.session.username == null)
    return next()
else
  res.redirect('/')
}
const isLoggedIn=async(req, res, next)=> 
{
  if (req.session.username != null)
    return next()
  else
    res.redirect('/login')
}

const isAdmin=async(req, res, next)=> 
{
  if (req.session.admin!=null)
    return next()
  else
  res.sendFile('authenticationError.html', { root: 'public/LoginError' });
}
const login= async(req,res)=>
{
    const { username, password }=req.body;
    const result = await userService.login(username, password)
  if (result) {
    if(result.isAdmin===true)
      req.session.admin=true;
    req.session.username = username
    res.redirect('/')
  }
  else
  res.sendFile('loginError.html', { root: 'public/LoginError' });
}


const logout=async(req, res)=> {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }










module.exports=
{
    isLoggedInNav,
    isLoggedIn,
    getLoginPage,
    isAdmin,
    logout,
    login,
    isntLoggedInNav
    

}