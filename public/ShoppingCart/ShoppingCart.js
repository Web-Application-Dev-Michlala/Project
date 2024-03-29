var socket = io();

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
  
    $('#myModal').modal({ backdrop: 'static' }); // Set backdrop option to 'static'

    // Event handler for close buttons and backdrop click
    $('.modal-footer .btn-secondary, #myModal').on('click', function(event) {
      if ($(event.target).is('.close, .btn-secondary') || $(event.target).closest('#myModal').length === 0) {
        $('#myModal').modal('hide');
        window.location.href = '/';
      }
    });
})
var myModal=document.getElementById('myModal')
var modalTitle = myModal.querySelector('.modal-title')
var modalBodyInput = myModal.querySelector('.modal-body')
var purchaseButton = document.querySelector('.purchase-button');
var backButton = document.querySelector('.back-button');
var BaseUSD
var ILSrate
var cart=null
var cvs = document.getElementById("canvas");
ctx = cvs.getContext("2d");
sA = (Math.PI / 180) * 45;
sE = (Math.PI / 180) * 90;
ca = canvas.width;
ch = canvas.height;
var loadAnimation;
const JSONedcart=sessionStorage.getItem('categories');
if(JSONedcart!=null)//load items from sessionStorage into page
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
var removeButtons = document.querySelectorAll('.remove-button');


//=============================================================>Button Listeners<=============================================================

removeButtons.forEach(function(button) {//add functionality to remove buttons
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
purchaseButton.addEventListener('click', function() {//add logic to purchase button
  if(cart===undefined||cart===null||cart.length===0)//empty cart
  {
    alert('Cart is empty')
    return;
  }
  var dataToSend=cart
  const totalPriceElement = document.getElementById('total-price');
  const totalPrice = parseFloat(totalPriceElement.innerText.replace('$', '')); 
  init();//start loading animation
  $.ajax({//check for items validity
        contentType: 'application/json',
        data: JSON.stringify({arrayToSend:dataToSend}), 
        url:'/cart/purchaseValidate',//validates items in purchase
        type: 'POST',
        // Set the content type header to JSON
        success: function (toRemove) 
        {
         
          if(toRemove.length===0)//all items exist and have sufficient amount
          {
            modalBodyInput.innerHTML= '<table class="table">'+
           '<thead>'+
              '<tr>'+
                '<th scope="col">Product</th>'+
                '<th scope="col">Amount</th>'+
                '<th scope="col">Price</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody id="tableBody">'+
            '</tbody>'+
          '</table>';

          tableBody=document.getElementById('tableBody')
          
           $('.conti').each(function() {
              
              const name = $(this).find('.product-name').text();
              const quantity = $(this).find('.quantity-value').text();
              const price = $(this).find('.product-price').text();
              var row=
              '<tr>'+
              '<td>'+name+'</td>'+
              '<td>'+quantity+'</td>'+
              '<td class="modalPrice">'+price+'</td>'+
            '</tr>';
            tableBody.innerHTML+=row
          });
          tableBody.innerHTML+=
          '<tr>'+
          '<td></td>'+
          '<thead><td>TOTAL:</td></thead>'+
          '<td class="modalTotalPrice">'+totalPriceElement.textContent+'</td>'
          '</tr>';
            sessionStorage.removeItem('categories')//clean storage
           
            $.ajax({
              contentType: 'application/json',
              data: JSON.stringify({arrayToSend:dataToSend,totalPrice:totalPrice}), 
              url:'/cart/removeItems',
              type: 'POST',

              success: function (order) //items removed successfully and order created
              {
                $.ajax({
                  url:'/cart/getRates',
                  type: 'GET',
                  success: function (response) 
                  {
                    if(!response.includes("error"))
                    {
                      response=JSON.parse(response)
                      BaseUSD= 1/response.rates.USD;
                      ILSrate=BaseUSD*response.rates.ILS;
                    }
                    
                   else
                   {
                    $('#ILS, #USD').prop('disabled', true);//if api runs into error disable exchange rate buttons
                   }
                    clearInterval(loadAnimation);//clear animation interval
                    ctx.clearRect(0, 0, ca, ch);//clear animation
                    modalTitle.textContent="order ID: "+order._id
                    $(".modal").modal('show')
                  }
                })
                order.products.forEach((product) => {
                  if(product.amount === 0){//if product is soldout than send message to server that product is soldout
                    socket.emit('out of stock',product);
                  }
                  else if(product.amount <= 2){//if product has limited amount send message to server that product has limited amount
                    socket.emit('limited product',product)
                  }
                })
              }
          })
        }
         else
         {
          clearInterval(loadAnimation);
          ctx.clearRect(0, 0, ca, ch);
          var itemsString=""
           toRemove.forEach((item)=>
          {
            if(item.amount===0)
            {
              itemsString+="removed "+item.name+'\n'
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
backButton.addEventListener('click', function() {//return to homepage
 
  // Redirect to homepage
  window.location.href ='/';
});
$("input[name='flexRadioDefault']").change(function () {//switch in reciept modal from USD to ILS
  const selectedCurrency = $(this).attr("id");
  
 
  if (selectedCurrency === "USD") 
  {
    var totalPrice=0;
    $('.modalPrice').each(function() {
      const $priceElement = $(this);
      const priceText = $priceElement.text();
      const price = parseFloat(priceText.replace('₪', ''));
      const USDprice = price/ILSrate;
      totalPrice+=USDprice
      $priceElement.text('$' + USDprice.toFixed(2));

  });
  $('.modalTotalPrice').text('$' +totalPrice.toFixed(2));
  } else if (selectedCurrency === "ILS") 
  {
      var totalPrice=0;
    $('.modalPrice').each(function() {
      const $priceElement = $(this);
      const priceText = $priceElement.text();
      const price = parseFloat(priceText.replace('$', ''));
      const ILSprice = price * ILSrate;
      totalPrice+=ILSprice
      $priceElement.text('₪' + ILSprice.toFixed(2));

  });
  $('.modalTotalPrice').text('₪' +totalPrice.toFixed(2));
}
});

//=============================================================>Functions<=============================================================
/**
 * Adds a product to the shopping cart HTML page
 * 
 * @param {String} name 
 * @param {Number} price 
 * @param {Number} quantity 
 * @param {String} imageSrc 
 * @param {String} categoryName 
 */
function addItemToCart(name, price, quantity, imageSrc,categoryName)//create HTML item in page
 {
  var cartItems = document.querySelector('.cart-items');

  var newItem = document.createElement('li');
  newItem.classList.add('cart-item');
  noSpacesName = name.replace(/ /g, '');

  newItem.innerHTML = `
    <div class="container conti">
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
function attachQuantityButtonListeners() {//add functionality to inc and dec buttons
var quantityMinusButtons = document.querySelectorAll('.quantity-minus');
var quantityPlusButtons = document.querySelectorAll('.quantity-plus');
//increament decreament buttons and their logic
quantityMinusButtons.forEach(function (button)//add listener to the dec buttons 
{
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

quantityPlusButtons.forEach(function (button) //add listener to the inc buttons
{
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
/**
 * creates loading animation
 * 
 */
function init(){//creates loading animation     
    
  loadAnimation= setInterval(function(){
      
     ctx.clearRect(0, 0, ca, ch);
     ctx.lineWidth = 15;
    
     ctx.beginPath();
     ctx.strokeStyle = "#ffffff";     
     ctx.shadowColor = "#eeeeee";
     ctx.shadowOffsetX = 2;
     ctx.shadowOffsetY = 2;
     ctx.shadowBlur = 5;
     ctx.arc(50, 50, 25, 0, 360, false);
     ctx.stroke();
     ctx.closePath();
      
     sE += 0.05; 
     sA += 0.05;
              
     ctx.beginPath();
     ctx.strokeStyle = "#aaaaaa";
     ctx.arc(50, 50, 25, sA, sE, false);
     ctx.stroke();
     ctx.closePath();   
      
  }, 6);
  
}
/**
 * Updates total price of all items on page
 */
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
attachQuantityButtonListeners();






