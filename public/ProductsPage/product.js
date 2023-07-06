
$(document).ready(function(){

    $.ajax({
        url: '/isLoggedIn',
    }).done(function(data) {
        const navbar = $('#navbar');
        if (data.isConnected != false) {
            $.ajax({
                url: '/public/Navbar/navBar.html',
                dataType: 'html'
            }).done(function(html) {
                const navBarContent = $('<div>').html(html);
                navbar.empty().append(navBarContent);
    
                $('#userGreet').text('Hello ' + data.isConnected);
                var userLink = $('#userLink');
                userLink.attr('href', '/users?username=' + data.isConnected);
            });
        } else {
            navbar.load('/public/Navbar/navBarLoggedOut.html');
        }
    });
    

    categoryName = new URLSearchParams(window.location.search).get('name'); 
    productId = new URLSearchParams(window.location.search).get('id'); 
    $.ajax
    ({
        url:'/ProductsPage/'+categoryName+"/"+productId,
      
    }).done(function(data)
    {
        $('#productName').text(data[0].name);
        $('#productSize').text(data[0].size.$numberDecimal);
        $('#productCategory').text(data[0].category);
        $('#productColor').text(data[0].color);
        $('#productDescription').html("<strong>Description:</strong><br>"+data[0].description);
        $('#productPrice').text(data[0].price.$numberDecimal+'$');
    })

    $('#button-increase').click(function(){
        var value = parseInt($('#productQuantity').val());
        value = isNaN(value) ? 0 : value;
        value++;
        $('#productQuantity').val(value);
    });

    $('#button-decrease').click(function(){
        var value = parseInt($('#productQuantity').val());
        value = isNaN(value) ? 0 : value;
        if (value > 0) {
            value--;
        }
        $('#productQuantity').val(value);
    });

});


