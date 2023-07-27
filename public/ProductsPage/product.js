
$(document).ready(function(){

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
            
            const carouselInner = $('.carousel-inner');
            carouselInner.empty(); 
            const carouselIndicators = $('.carousel-indicators');
            // Loop through the image paths and add them to the carousel
            data[0].image.forEach((picturePath, index) => {
                const carouselItemClass = index === 0 ? 'carousel-item active' : 'carousel-item';
                const carouselItem = `
                    <div class="${carouselItemClass}" data-bs-interval="10000">
                        <img src="${"../../"+picturePath}" class="d-block w-100" alt="Product Image">
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                `;
                let carouselInd;
                if(index > 0){
                    carouselInd = `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" aria-label="Slide ${index}"></button>`;
                }
                carouselInner.append(carouselItem);
                carouselIndicators.append(carouselInd);
            });
            
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
        
      
          
        $('#addToCart').click(function() 
        {   
            if(data.isConnected!=false){
            var cart=null;
            const prodname=$('#productName').text();
            const prodamount=parseInt($('#productQuantity').val());
            const categoryName= $('#productCategory').text();
            const JSONedcart=sessionStorage.getItem('categories');
            if(JSONedcart===null)
            {
             const categoriesArray=[ {
                    category:categoryName,
                    items:
                    [
                        {name:prodname,amount:prodamount}
                    ]
                }
                ]
                const categoriesJsonString=JSON.stringify(categoriesArray);
                cart=categoriesArray;
                sessionStorage.setItem('categories',categoriesJsonString);
            }
           else
           {
            cart=JSON.parse(JSONedcart);
            const existingCategoryIndex = cart.findIndex((item) => item.category === categoryName);
            if (existingCategoryIndex === -1) {
                // Category doesn't exist, so create a new category with the name-amount pair
                const newCategory = {
                  category:categoryName,
                  items: [{ name:prodname, amount:prodamount }],
                };
                cart.push(newCategory);
            }
                else{
            const existingCategory = cart[existingCategoryIndex];
            const existingKeyIndex = existingCategory.items.findIndex((item) => item.name === prodname);
            if (existingKeyIndex === -1) 
            {
                existingCategory.items.push({ name:prodname, amount:prodamount });
            }
            else
            {
                existingCategory.items[existingKeyIndex].amount += prodamount;
            }
        };
        const updatedCategoriesJsonString = JSON.stringify(cart);
        sessionStorage.setItem('categories', updatedCategoriesJsonString);
    
        }
        console.log(cart);
        window.location.href ='/category?name='+categoryName;
    }
    else
    window.location.href ='/login'
    });
    
    
    
    });
    

})