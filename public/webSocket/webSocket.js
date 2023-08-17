var socket = io();

$(document).ready(function(){
    if(window.location === window.parent.location){//window with an iframe has a problem with toast
        socket.on('add product',function(product){
            console.log(product);
            if(!$(".toast-container").length){
                $("body").append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
            }
            var toast = createToast(product);
            $(toast).addClass("text-bg-light");
            $(toast).find(".me-auto").text("New product added");
            $(".toast-container").append(toast);
            $(toast).toast('show');
        })

        socket.on('product restock',function(product){
            if(!$(".toast-container").length){
                $("body").append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
            }
            var toast = createToast(product);
            $(toast).addClass("text-bg-success");
            $(toast).find(".me-auto").text("Product restocked");
            $(".toast-container").append(toast);
            $(toast).toast('show');
            console.log(product);
        })

        socket.on('limited product',function(product){
            if(!$(".toast-container").length){
                $("body").append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
            }
            var toast = createToast(product);
            $(toast).addClass("text-bg-warning");
            $(toast).find(".me-auto").text("Product has limited amount");
            $(".toast-container").append(toast);
            $(toast).toast('show');
            console.log(product);
        })

        socket.on('out of stock',function(product){
            if(!$(".toast-container").length){
                $("body").append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
            }
            var toast = createOutToast(product);
            $(".toast-container").append(toast);
            $(toast).toast('show');
            console.log(product);
        })
    }
});

function createToast(product){
    var toast = document.createElement('div');
    $(toast).addClass('toast');
    $(toast).attr('role','alert');
    $(toast).attr('aria-live','assertive');
    $(toast).attr('aria-atomic','true');
    $(toast).attr('data-bs-autohide','false');
    $(toast).html('<div class="toast-header">'+
    '<strong class="me-auto"></strong>'+
    '<small class="text-body-secondary">just now</small>'+
    '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'+
    '</div>'+
    '<div class="toast-body">'+
    '<img src="/' + product.image + '" alt="...">'+
    '<p><strong>Name: ' + product.name + '</strong></p><p>color: ' + product.color + ', size: ' + product.size.$numberDecimal + ' Inch, brand: ' +
    product.brand + ', price: ' + product.price.$numberDecimal + '$</p>' +
    '<p>To get to the product page click <a href="/public/ProductsPage/index.html?id=' + product.id + '&name=' + product.category + '">here</a></p>'+
    '</div>'+
    '</div>');
    return toast;
}

function createOutToast(product){
    var toast = document.createElement('div');
    $(toast).addClass('toast text-bg-danger');
    $(toast).attr('role','alert');
    $(toast).attr('aria-live','assertive');
    $(toast).attr('aria-atomic','true');
    $(toast).attr('data-bs-autohide','false');
    $(toast).html('<div class="toast-header">'+
    '<strong class="me-auto">Product is out of stock</strong>'+
    '<small class="text-body-secondary">just now</small>'+
    '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'+
    '</div>'+
    '<div class="toast-body">'+
    '<img src="' + product.image + '" alt="...">'+
    '<p><strong>Name: ' + product.name + '</strong></p><p>color: ' + product.color + ', size: ' + product.size.$numberDecimal + ' Inch, brand: ' +
    product.brand + ', price: ' + product.price.$numberDecimal + '$</p>' +
    '<strong>Please remove the product from your cart if you have it to avoid problems when ordering</strong>'+
    '</div>'+
    '</div>');
    return toast;
}