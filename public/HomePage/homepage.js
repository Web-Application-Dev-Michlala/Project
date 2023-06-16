$(function()
{
    
$.ajax
    ({
        url:'/getCategorys',
    }).done(function(data)
        {
            var counter=0;
            var catCounter=0;
            data.forEach(Category => 
            {   
                if(catCounter%3==0)
                {
                    $('body').append('<div class="row justify-content-md-center" id="row+catCounter">')
                }
                var rowID=Math.floor(catCounter/3);
                $('#row+rowID').append('<div onclick="window.location.href="#" class="card text-center col-2" style="width: 18rem;"> <div class="card-body"><h5 class="card-title">'+Category.categoryName+'</h5></div></div>')
                catCounter++;
                const Hotarray=filterByHot(Category.products);
                for(let i=0;i<Hotarray.length;i++)
                { 
                    if(counter==0)
                    {
                        $('#caroursel-ind').append('<button type="button" data-bs-target="#mycar" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide+(counter+1)" ></button>')
                        $('#carousel').append('<div class:"carousel-item active c-item"> <a href="Hotarray[i].link><img src="Hotarray[i].IMG" class="d-block w-100 c-img" ></div></a><div class="carousel-caption d-none d-md-block"><h5>+Hotarray[i].Name</h5></div>')
                    }
                    else
                    {
                        $('#caroursel-ind').append('<button type="button" data-bs-target="#mycar" data-bs-slide-to="counter" aria-label="Slide+(counter+1)"></button>')
                        $('#carousel').append('<div class:"carousel-item c-item"> <a href="Hotarray[i].link><img src="Hotarray[i].IMG" class="d-block w-100 c-img" ></div></a><div class="carousel-caption d-none d-md-block"><h5>Hotarray[i].Name</h5></div>')
                    }
                    counter++
               
                }
            });
            
        });
});

function filterByHot(products)
{
    prod=products;
    for(let i=0;i<prod.length;i++)
    {
        if(!prod[i].hot)
        prod[i].remove();
    }
    return prod
}
