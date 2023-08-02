
const productService=require('../services/product')
const orderService=require('../services/order')


const getCartPage = async (req,res) => 
{
    res.sendFile('ShoppingCart.html', { root: 'public/ShoppingCart' });
}

const validateItem =async(req,res)=>
{
    const {categoryName,name,amount}=req.body;
    console.log(categoryName,name,amount)
    const flag= await productService.validateAmount(categoryName,name,amount)
    if(flag===0)
    res.status(200).json(flag);
    else if(flag===1)
    res.status(200).json(flag)
    else
    res.status(200).json(flag)
}
const validateAll =async(req,res)=>
{
    var itemsToRemove;
    var {arrayToSend}=req.body;
    
   
    if(arrayToSend===undefined||arrayToSend===null||arrayToSend[0]===undefined||arrayToSend[0]===null||arrayToSend[0].length===0)
    {
        itemsToRemove=[]
        res.status(200).json(itemsToRemove)
        
    }
    else{
        itemsToRemove= await productService.validateAll(arrayToSend)
        res.status(200).json(itemsToRemove)
    }

}
const removeItems=async(req,res)=>
{
    var {arrayToSend,totalPrice}=req.body;
    const username=req.session.username
   const check= await productService.removeItems(arrayToSend)
   console.log("total price in controller "+totalPrice)
   var orderArray=[]
   for (const category of arrayToSend) {
    for (const item of category.items)
    {
       var product=await productService.getProductByName(category.category,item.name)
       orderArray.push(product);
    }
}
    
    console.log("order Array in controller "+orderArray)
   const order=await orderService.createOrder(new Date,totalPrice,username)
   console.log("check in Controller "+check)

   orderArray.forEach(product => {orderService.addProductToOrder(order._id,product)})
   if(check===1)
    res.status(200).json(check)

}

module.exports=
{
    getCartPage,
    validateItem,
    validateAll,
    removeItems
}