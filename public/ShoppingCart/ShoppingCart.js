




$(document).ready(function() 
{
    
    $.ajax
    ({
        url:'/isLoggedIn',
      
    }).done(function(data)
    {
        const navbar=$('#navbar');
        if(data.isConnected!=false)
        { 
           navbar.load('/public/Navbar/navBar.html',function()
           { $('#userGreet').text('Hello '+data.isConnected);
           var userLink=$('#userLink')
           userLink.attr('href','/users?username='+data.isConnected)
        })
           
        }
        else
        {
            navbar.load('/public/Navbar/navBarLoggedOut.html')
        }
    });
    
  })


var cart=null

function updateTotalPrice() //goes over all items and sums total price
{
  var totalPriceElement = document.getElementById('total-price');
  var cartItems = document.querySelectorAll('.cart-item');
  var totalPrice = 0;

  cartItems.forEach(function(item) {
    var priceString = item.querySelector('.product-price').innerText;
    var price = parseFloat(priceString.replace('$', ''));
    totalPrice += price;
  });

  totalPriceElement.innerText = '$' + totalPrice.toFixed(2);
  
}

const JSONedcart=sessionStorage.getItem('categories');//loads items from sessionStorage into page
    if(JSONedcart!=null)
    {
      cart=JSON.parse(JSONedcart);
      cart.forEach((category)=>
      {
        category.items.forEach((item)=>
        {
          addItemToCart(item.name,item.price,item.amount,item.imageSrc,category.category);
        })
       
      });
    }




// Add event listener to dynamically remove items from the cart
var removeButtons = document.querySelectorAll('.remove-button');
removeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const categoryName=button.parentNode.parentNode.parentNode.parentNode.querySelector('.product-category').innerText;
    const prodname=button.parentNode.parentNode.parentNode.parentNode.querySelector('.product-name').innerText;
   const index1=cart.findIndex((item) => item.category === categoryName);
   const index2=cart[index1].items.findIndex((item) => item.name === prodname);
   cart[index1].items.splice(index2,1);
   if(cart[index1].items.length===0)
   cart.splice(index1,1)
   sessionStorage.setItem('categories',JSON.stringify(cart));
   

    var item = button.parentNode.parentNode.parentNode.parentNode;
    item.parentNode.removeChild(item);
    updateTotalPrice();
  });
});


var purchaseButton = document.querySelector('.purchase-button');
var backButton = document.querySelector('.back-button');

purchaseButton.addEventListener('click', function()
 {
  if(cart===undefined||cart===null||cart.length===0)
  {
    alert('Cart is empty')
    return;
  }
  var dataToSend=cart
 const totalPriceElement = document.getElementById('total-price');
  const totalPrice = parseFloat(totalPriceElement.innerText.replace('$', '')); 
  
  
 
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify({arrayToSend:dataToSend}), 
        url:'/cart/purchaseValidate',//validates items in purchase
        type: 'POST',
        // Set the content type header to JSON
        success: function (toRemove) 
        {
         
          if(toRemove.length===0)//all items exist and have sufficient amount
          {
            sessionStorage.removeItem('categories')//clean storage
            console.log('entering successful buy start')
            $.ajax({
              contentType: 'application/json',
              data: JSON.stringify({arrayToSend:dataToSend,totalPrice:totalPrice}), 
              url:'/cart/removeItems',
              type: 'POST',

              success: function () //items removed successfully and order created
              {
                
                alert('Purchase successful!');
                window.location.href ='/'
              }
          })
        }
         else
         {
          var itemsString=""
           toRemove.forEach((item)=>
          {
            if(item.amount===0)
            {
              itemsString+="removed"+item.name+'\n'
              noSpacesName = item.name.replace(/ /g, '');//removes spaces
              var productDiv = document.getElementById(noSpacesName);
              var rowDiv = productDiv.parentElement
              var itemRemoveButton = rowDiv.querySelector('.remove-button');
              itemRemoveButton.click()
              
            }
            else
            {
              itemsString+="new amount for item "+item.name+" is "+item.amount+'\n'
              var index1=cart.findIndex((element) => element.category === item.category);
              var index2=cart[index1].items.findIndex((element) => element.name === item.name);
              cart[index1].items[index2].amount=item.amount;
              sessionStorage.setItem('categories',JSON.stringify(cart));
              noSpacesName = item.name.replace(/ /g, '');
              var productDiv = document.getElementById(noSpacesName);
              var rowDiv = productDiv.parentElement; 
              var quantityValueElement = rowDiv.querySelector('.quantity-value');
              var quantityMinusButton = rowDiv.querySelector('.quantity-minus');
              var dataPrice = quantityMinusButton.getAttribute('data-price');
              var priceOfOne=parseFloat(dataPrice);
              var newPrice=item.amount*priceOfOne;
              
              var containerDiv = productDiv.closest('.container'); // Find the closest ancestor element with the class 'container'
              var productPriceElement = containerDiv.querySelector('.product-price');
              quantityValueElement.textContent=item.amount
              
              productPriceElement.innerText= `$${newPrice.toFixed(2)}`
              updateTotalPrice()



             
            }
          })
            alert(itemsString)
           
         }
        
        },
      });
  
});

backButton.addEventListener('click', function() {
 
  // Redirect to homepage
  window.location.href ='/';
});
function addItemToCart(name, price, quantity, imageSrc,categoryName)//create HTML item in page
 {
  var cartItems = document.querySelector('.cart-items');

  var newItem = document.createElement('li');
  newItem.classList.add('cart-item');
  noSpacesName = name.replace(/ /g, '');

  newItem.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-2">
          <img class="product-image" src="${imageSrc}">
        </div>
        <div class="col-2 product-name" id=${noSpacesName}>${name}</div>
       
        <div class="col-2 product-quantity">
          <button class="quantity-button quantity-minus" data-price="${price}">-</button>
          <span class="quantity-value">${quantity}</span>
          <button class="quantity-button quantity-plus" data-price="${price}">+</button>
        </div>
        <div class="col-2 product-price">$${quantity * price}</div>
        <div class="col-4 rButton">
          <button class="remove-button">Remove</button>
        </div>
        <div class="product-category" hidden>${categoryName}</div>
      </div>
    </div>
  `;

  cartItems.appendChild(newItem);

  updateTotalPrice();
}



function attachQuantityButtonListeners() {
var quantityMinusButtons = document.querySelectorAll('.quantity-minus');
var quantityPlusButtons = document.querySelectorAll('.quantity-plus');
//increament decreament buttons and their logic
quantityMinusButtons.forEach(function (button) {
  button.addEventListener('click', function () {

    var quantityElement = button.nextElementSibling;
    var currentQuantity = parseInt(quantityElement.innerText);
    var price = parseFloat(button.getAttribute('data-price'));
    if (currentQuantity > 1) {
      const categoryName=button.parentNode.parentNode.parentNode.parentNode.querySelector('.product-category').innerText;
      const prodname=button.parentNode.parentNode.parentNode.parentNode.querySelector('.product-name').innerText;
     const index1=cart.findIndex((item) => item.category === categoryName);
     const index2=cart[index1].items.findIndex((item) => item.name === prodname);
     cart[index1].items[index2].amount-=1;
     sessionStorage.setItem('categories',JSON.stringify(cart));
      var newPrice = (currentQuantity - 1) * price;
      button.parentNode.nextElementSibling.innerText = `$${newPrice.toFixed(2)}`;
      quantityElement.innerText = currentQuantity - 1;
      updateTotalPrice();
    }
  });
});

quantityPlusButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const categoryName=button.parentNode.parentNode.parentNode.parentNode.querySelector('.product-category').innerText;
    const prodname=button.parentNode.parentNode.parentNode.parentNode.querySelector('.product-name').innerText;
   const index1=cart.findIndex((item) => item.category === categoryName);
   const index2=cart[index1].items.findIndex((item) => item.name === prodname);
   cart[index1].items[index2].amount+=1;
   sessionStorage.setItem('categories',JSON.stringify(cart));
    var quantityElement = button.previousElementSibling;
    var currentQuantity = parseInt(quantityElement.innerText);
    var price = parseFloat(button.getAttribute('data-price'));
    var newPrice = (currentQuantity + 1) * price;

    quantityElement.innerText = currentQuantity + 1;
    button.parentNode.nextElementSibling.innerText = `$${newPrice.toFixed(2)}`;
    updateTotalPrice();
  });
});
}

attachQuantityButtonListeners();
