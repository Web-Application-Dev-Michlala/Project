const orderService = require('../services/order.js');

const getUserPage = async (req,res) => 
{
    if(req.session.username===null)
    {
        res.redirect('/login')
    }
    else if(req.session.admin===true)
    {
        res.redirect('/adminPage')
    }
    else
    {
        res.sendFile('user.html', { root: 'public/userPage' });
    }

}

const updateOrders=async(req,res)=>
{
    const newUserName=req.session.username
    console.log("NAME IN UPDATE ORDERS "+newUserName);
    await orderService.updateUsername(newUserName)
    res.status(200).json({ success: true });
}

module.exports = {
    getUserPage,
    updateOrders
}