

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
carouselnum=1;
var arr=[];
categoryArray=[];
$.ajax({//get items+categories and call functions to load them on page
    url:'/getCategorys'
}).done(function(cateogries)
{
    cateogries.forEach(category => {
        category.products.forEach(product => 
        {
            if(product.hot)
            arr.push(product)
        });
        categoryArray.push(category);
    })
    const length = arr.length;
    const partSize = Math.floor(length / 3);//split array to 3 parts
              
    const part1 = arr.slice(0, partSize);
    const part2 = arr.slice(partSize, partSize * 2);
    const part3 = arr.slice(partSize * 2);
    createAndloadHotCarouselsFromDB(part1,carouselnum)//fill each carousel with asplit of the array
    carouselnum++;
    createAndloadHotCarouselsFromDB(part2,carouselnum)
    carouselnum++;
    createAndloadHotCarouselsFromDB(part3,carouselnum)

    loadCategories(categoryArray);//load categories into cards
})



//=============================================================>Functions<=============================================================
function createAndloadHotCarouselsFromDB(hotItems, carouselnum)//loading the carousels with items 
{

    var carousel=document.createElement('div');
    carousel.classList.add("carousel")
    carousel.classList.add("slide")
    carousel.classList.add("c-slide")
    carousel.classList.add("container")

    carousel.setAttribute("data-bs-ride", "carousel");
    carousel.setAttribute("id","carousel"+(carouselnum));
    var rowcon=document.getElementById('rowcon');
    rowcon.appendChild(carousel);
    var data;
    var caritem;
    for(let i=0;i<hotItems.length;i++)
    {
        if( i===0)
        {
            data='<button type="button" data-bs-target="#carousel'+carouselnum+'" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>'
            caritem='<div class="carousel-item active c-item">'+
            '<a href="/public/ProductsPage/index.html?id='+hotItems[i].id+'&name='+hotItems[i].category+'">'+//<!--TODO PULL hot product IMAGE AND LINK-->
            '<img src="/'+hotItems[i].image+'" class="d-block  c-img" >'+
            '</a>'+
            '<div class="carousel-caption d-none d-md-block" id="title">'+
                '<h5>'+hotItems[i].name+'</h5>'+//<!--TODO PULL hot product name-->
            '</div>'+
          '</div>';
        }
        else
        {
            data+='<button type="button" data-bs-target="#carousel'+carouselnum+'" data-bs-slide-to='+(i)+' aria-label="Slide '+(i+1)+'"></button>'
            caritem+='<div class="carousel-item c-item">'+
            '<a href="/public/ProductsPage/index.html?id='+hotItems[i].id+'&name='+hotItems[i].category+'">'+
            '<img src="/'+hotItems[i].image+'" class="d-block  c-img">'+
            '</a>'+
            '<div class="carousel-caption d-none d-md-block" id="title">'+
                '<h5>'+hotItems[i].name+'</h5>'+//<!--TODO PULL hot product name-->
            '</div>'+
          '</div>';
        }
    }
    carousel.innerHTML=
    '<div class="carousel-inner" id="carousel">'+
    '<div class="carousel-indicators" id="caroursel-ind">'+
    data+
    '</div>'+
    '<div class="carousel-inner" id="carousel">'+
    caritem+
    '</div>'+
    '<button class="carousel-control-prev" type="button" data-bs-target="#carousel'+carouselnum+'"data-bs-slide="prev">'+
    '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
    '<span class="visually-hidden">Previous</span>'+
    '</button>'+
    '<button class="carousel-control-next" type="button" data-bs-target="#carousel'+carouselnum+'" data-bs-slide="next">'+
    '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
    '<span class="visually-hidden">Next</span>'+
    '</button>'+
    '</div>';
    
}
function loadCategories(categoryArray) //load categories into cards
{
    var cardRow=document.createElement('div');
    cardRow.classList.add('row');
    cardRow.classList.add('row-cols-1');
    cardRow.classList.add('row-cols-md-3');
    cardRow.classList.add('g-4');
    cardRow.classList.add('cards-row');
    cardRow.classList.add('flex');
    cardRow.classList.add('justify-content-center');
    var card1;
   
   
    for(let i=0;i<categoryArray.length;i++)
    {   
    
  
   
    container=document.getElementById('categories');
    container.appendChild(cardRow);
        card1= 
        '<div class="col">'+
        "<div onclick=\"window.location.href='/category?name="+categoryArray[i].categoryName+"'\" class=\"card text-center flex-fill\" style=\"width: 18rem;\">"+

        '<img class="card-img-top" src="./'+categoryArray[i].image+'" alt="Card image cap">'+
        '<div class="card-body">'+
        '<h5 class="card-titletext-md h1">'+categoryArray[i].categoryName+'</h5>'+//<!--pull text from category-->
        '</div>'+
        '</div>'
        '</div>';
        cardRow.innerHTML+=card1;
        }
      
    }
});
   
