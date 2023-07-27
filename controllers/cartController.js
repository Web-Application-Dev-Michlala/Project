
const productService=require('../services/product')


const getCartPage = async (req,res) => 
{
    res.sendFile('ShoppingCart.html', { root: 'public/ShoppingCart' });
}

module.exports=
{
    getCartPage,
}