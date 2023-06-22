
$( document ).ready(function() 
{
carouselnum=1;
var arr=[];
    $.ajax
        ({
            url:'/Phones',
          
        }).done(function(data)
            {
                data.products.forEach(product => {
                    if(product.hot)
                    arr.push(product)
                });
                const length = arr.length;
                const partSize = Math.floor(length / 3);
                
                const part1 = arr.slice(0, partSize);
                const part2 = arr.slice(partSize, partSize * 2);
                const part3 = arr.slice(partSize * 2);
                createAndloadHotCarouselsFromDB(part1,carouselnum)
                carouselnum++;
                createAndloadHotCarouselsFromDB(part2,carouselnum)
                carouselnum++;
                createAndloadHotCarouselsFromDB(part3,carouselnum)
            });
   
            bon=1
            don=1
            gon=1
            bonfil=1
            donfil=1;
    const categoryArray=[bon,don,gon,bonfil,donfil]
    
   
    loadCategories(categoryArray);
  
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
            '<img src="./'+hotItems[i].image+'" class="d-block  c-img" >'+
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
            '<a href="file:///D:/College/Year_2_SemesterB/Application%20Dev/Project%20components/Homepage/Homepage.html">'+//<!--TODO PULL hot product IMAGE AND LINK-->
            '<img src="./'+hotItems[i].image+'" class="d-block  c-img">'+
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
    container=document.getElementById('categories');
    container.appendChild(cardRow);
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
   
