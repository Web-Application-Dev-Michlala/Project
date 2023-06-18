// $(function()
// {
    
// $.ajax
//     ({
//         url:'/getCategorys',
//     }).done(function(data)
//         {
//             var counter=0;
//             var catCounter=0;
//             data.forEach(Category => 
//             {   
//                 if(catCounter%3==0)
//                 {
//                     $('body').append('<div class="row justify-content-md-center" id="row+catCounter">')
//                 }
//                 var rowID=Math.floor(catCounter/3);
//                 $('#row+rowID').append('<div onclick="window.location.href="#" class="card text-center col-2" style="width: 18rem;"> <div class="card-body"><h5 class="card-title">'+Category.categoryName+'</h5></div></div>')
//                 catCounter++;
//                 const Hotarray=filterByHot(Category.products);
//                 for(let i=0;i<Hotarray.length;i++)
//                 { 
//                     if(counter==0)
//                     {
//                         $('#caroursel-ind').append('<button type="button" data-bs-target="#mycar" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide+(counter+1)" ></button>')
//                         $('#carousel').append('<div class:"carousel-item active c-item"> <a href="Hotarray[i].link><img src="Hotarray[i].IMG" class="d-block w-100 c-img" ></div></a><div class="carousel-caption d-none d-md-block"><h5>+Hotarray[i].Name</h5></div>')
//                     }
//                     else
//                     {
//                         $('#caroursel-ind').append('<button type="button" data-bs-target="#mycar" data-bs-slide-to="counter" aria-label="Slide+(counter+1)"></button>')
//                         $('#carousel').append('<div class:"carousel-item c-item"> <a href="Hotarray[i].link><img src="Hotarray[i].IMG" class="d-block w-100 c-img" ></div></a><div class="carousel-caption d-none d-md-block"><h5>Hotarray[i].Name</h5></div>')
//                     }
//                     counter++
               
//                 }
//             });
            
//         });
// });

// function filterByHot(products)
// {
//     prod=products;
//     for(let i=0;i<prod.length;i++)
//     {
//         if(!prod[i].hot)
//         prod[i].remove();
//     }
//     return prod
// }
$( document ).ready(function() 
{
const arr=[];
    $.ajax
        ({
            url:'/Phones',
          
        }).done(function(data)
            {
                data.forEach(product => {
                    if(product.hot)
                    arr.push(product)
                });
                createAndloadHotCarouselsFromDB(arr,1)
            });
    donfil=1;
    bonfil=2;
    bon=1;
    don=1;
    gon=1;
    const categoryArray=[bon,don,gon,bonfil,donfil]
    const hotArray=[donfil,bonfil,don]
    //createAndloadHotCarousels(hotArray,1);
   // createAndloadHotCarousels(hotArray,2);
    //createAndloadHotCarousels(hotArray,3)
    loadCategories(categoryArray);
    //
    console.log(arr.length);
function createAndloadHotCarousels(hotItems, carouselnum)//loading the carousels with items 
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
            '<a href="file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html">'+//<!--TODO PULL hot product IMAGE AND LINK-->
            '<img src="https://images.pexels.com/photos/14918477/pexels-photo-14918477.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="d-block  c-img" >'+
            '</a>'+
            '<div class="carousel-caption d-none d-md-block" id="title">'+
                '<h5>First prodcut name</h5>'+//<!--TODO PULL hot product name-->
            '</div>'+
          '</div>';
        }
        else
        {
            data+='<button type="button" data-bs-target="#carousel'+carouselnum+'" data-bs-slide-to='+(i)+' aria-label="Slide '+(i+1)+'"></button>'
            caritem+='<div class="carousel-item c-item">'+
            '<a href="file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html">'+//<!--TODO PULL hot product IMAGE AND LINK-->
            '<img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fHww&w=1000&q=80" class="d-block  c-img">'+
            '</a>'+
            '<div class="carousel-caption d-none d-md-block" id="title">'+
                '<h5>Second prodcut name</h5>'+//<!--TODO PULL hot product name-->
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
            '<a href="file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html">'+//<!--TODO PULL hot product IMAGE AND LINK-->
            '<img src="https://images.pexels.com/photos/14918477/pexels-photo-14918477.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="d-block  c-img" >'+
            '</a>'+
            '<div class="carousel-caption d-none d-md-block" id="title">'+
                '<h5>'+"hotItems[i]"+'</h5>'+//<!--TODO PULL hot product name-->
            '</div>'+
          '</div>';
        }
        else
        {
            data+='<button type="button" data-bs-target="#carousel'+carouselnum+'" data-bs-slide-to='+(i)+' aria-label="Slide '+(i+1)+'"></button>'
            caritem+='<div class="carousel-item c-item">'+
            '<a href="file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html">'+//<!--TODO PULL hot product IMAGE AND LINK-->
            '<img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fHww&w=1000&q=80" class="d-block  c-img">'+
            '</a>'+
            '<div class="carousel-caption d-none d-md-block" id="title">'+
                '<h5>'+"dads"+'</h5>'+//<!--TODO PULL hot product name-->
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
function loadCategories(categoryArray)
{
    var cardRow
    
    var card1;
    var card2;
    var card3;
   
    for(let i=0;i<categoryArray.length;i+=3)
    {
        cardRow=document.createElement('div');
    cardRow.classList.add('row');
    cardRow.classList.add('justify-content-md-center');
    cardRow.classList.add('cards-row');
    document.body.appendChild(cardRow);
        card1=
        "<div onclick=\"window.location.href='file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html'\" class=\"card text-center flex-fill\" style=\"width: 18rem;\">"+

        '<img class="card-img-top" src="https://d10mhq06fikmnr.cloudfront.net/catalog/product/s/h/sharkoon_tg7m_os_1.jpg" alt="Card image cap">'+
        '<div class="card-body">'+
        '<h5 class="card-titletext-md h1">Computers</h5>'+//<!--pull text from category-->
        '</div>'+
        '</div>';
        card2=
        "<div onclick=\"window.location.href='file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html'\" class=\"card text-center flex-fill\" style=\"width: 18rem;\">"+
        '<img class="card-img-top" src="https://s7d1.scene7.com/is/image/dish/iPhone_14_Plus_Purple_phonewall?$ProductBase$&fmt=webp" alt="Card image cap">'+
        '<div class="card-body">'+
        '<h5 class="card-titletext-md h1">Computers</h5>'+//<!--pull text from category-->
        '</div>'+
        '</div>';
        card3=
        "<div onclick=\"window.location.href='file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html'\" class=\"card text-center flex-fill\" style=\"width: 18rem;\">"+
        '<img class="card-img-top" src="https://d2xamzlzrdbdbn.cloudfront.net/products/f0a96b61-3d45-4feb-abd5-31f17b65c5e222011033.jpg" alt="Card image cap">'+
        '<div class="card-body">'+
        '<h5 class="card-titletext-md h1">Computers</h5>'+//<!--pull text from category-->
        '</div>'+
        '</div>';
        cardRow.innerHTML+=card1+card2+card3;
    }
}

});
   
