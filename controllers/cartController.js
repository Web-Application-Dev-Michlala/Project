const productService=require('../services/product')
const orderService=require('../services/order')
const http=require('http')

const getCartPage = async (req,res) => 
{
    res.sendFile('ShoppingCart.html', { root: 'public/ShoppingCart' });
}
const validateItem =async(req,res)=>
{
    const {categoryName,name,amount}=req.body;
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
    var orderArray=[]
    for (const category of arrayToSend) {
    for (const item of category.items)
    {
        var product=await productService.getProductByName(category.category,item.name)
        orderArray.push(product);
    }
}

   
    const order=await orderService.createOrder(new Date,totalPrice,username,orderArray)
    if(check===1)
    res.status(200).json(order)

}
const getRates =async(req,res)=>
{
    const apiUrl = 'http://api.exchangeratesapi.io/v1/latest?access_key=c093d2883542b4f930fd77303c502c42&symbols=USD,ILS'; 
    const apiRequest = http.get(apiUrl, apiResponse => {
        let data = '';

        apiResponse.on('data', chunk => {
            data += chunk;
        });

        apiResponse.on('end', () => {
            console.log(data)
            res.send(data);
        });
    });

    apiRequest.on('error', error => {
        res.send('Error');
    });

}
module.exports=
{
    getCartPage,
    validateItem,
    validateAll,
    removeItems,
    getRates
}