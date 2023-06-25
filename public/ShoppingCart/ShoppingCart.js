function addItemToCart(name, price,quantity, imageSrc) {
  var cartItems = document.querySelector('.cart-items');

  var newItem = document.createElement('li');
  newItem.classList.add('cart-item');

  //TODO pull from sessionStorage...
  //addTocart->add to sessionStorage

  
  newItem.innerHTML =  '<div class="container">'+
                       '<div class="row">'+
                      '<div class="col-2"><img class="product-image" src="' + imageSrc + '"></div>' +
                      '<div class=" col-2 product-name">' + name + '</div>' +
                      '<div class="col-2 product-quantity">' + quantity + '</div>' +   
                     '<div class="col-2 product-price">$' +quantity* price + '</div>' +
                      '<div class=col-4 rButton><button class="remove-button">Remove</button></div>'+
                        '</div>'+
                        '</div>';
  cartItems.appendChild(newItem);

  updateTotalPrice();
}

function updateTotalPrice() {
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
//EXAMPLE
addItemToCart('Product 1', 9.99,2, 'https://cdn.corporatefinanceinstitute.com/assets/products-and-services-1024x1024.jpeg');
addItemToCart('Product 2', 14.99,1, 'https://greatb2bmarketing.com/wp-content/uploads/2017/09/Product-Smaller.jpg');
addItemToCart('Product 3', 9.99, 2, 'https://cdn.corporatefinanceinstitute.com/assets/products-and-services-1024x1024.jpeg');
addItemToCart('Product 4', 14.99, 1, 'https://greatb2bmarketing.com/wp-content/uploads/2017/09/Product-Smaller.jpg');


// Add event listener to dynamically remove items from the cart
var removeButtons = document.querySelectorAll('.remove-button');
removeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var item = button.parentNode.parentNode.parentNode.parentNode;
    item.parentNode.removeChild(item);
    updateTotalPrice();
  });
});

// Example event listeners for purchase and back buttons
var purchaseButton = document.querySelector('.purchase-button');
var backButton = document.querySelector('.back-button');

purchaseButton.addEventListener('click', function() {
  
  // Your purchase logic here
  alert('Purchase successful!');
});

backButton.addEventListener('click', function() {
 
  // Redirect to the shopping site or perform the desired action
  alert('Returning to the shopping site...');
});
function addItemToCart(name, price, quantity, imageSrc) {
  var cartItems = document.querySelector('.cart-items');

  var newItem = document.createElement('li');
  newItem.classList.add('cart-item');

  newItem.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-2">
          <img class="product-image" src="${imageSrc}">
        </div>
        <div class="col-2 product-name">${name}</div>
        <div class="col-2 product-quantity">
          <button class="quantity-button quantity-minus">-</button>
          <span class="quantity-value">${quantity}</span>
          <button class="quantity-button quantity-plus" data-price="${price}">+</button>
        </div>
        <div class="col-2 product-price">$${quantity * price}</div>
        <div class="col-4 rButton">
          <button class="remove-button">Remove</button>
        </div>
      </div>
    </div>
  `;

  cartItems.appendChild(newItem);

  updateTotalPrice();
}



function attachQuantityButtonListeners() {
var quantityMinusButtons = document.querySelectorAll('.quantity-minus');
var quantityPlusButtons = document.querySelectorAll('.quantity-plus');

quantityMinusButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var quantityElement = button.nextElementSibling;
    var currentQuantity = parseInt(quantityElement.innerText);

    if (currentQuantity > 1) {
      quantityElement.innerText = currentQuantity - 1;
      updateTotalPrice();
    }
  });
});

quantityPlusButtons.forEach(function (button) {
  button.addEventListener('click', function () {
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
