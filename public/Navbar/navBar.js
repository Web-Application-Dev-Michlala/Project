$(document).ready(function() 
{
    const serachbut=$('searchbut');
    const searchbar = $('#search-bar');
    const prods=[];
    const cats=[];
    const prodname=[]
    $.ajax({
        url:'/getCategorys'
    }).done(function(cateogries)
    {
        cateogries.forEach(category => {
            category.products.forEach(product => 
            {
                prodname.push(product.name);
                prods.push(product.id)
                cats.push(category.categoryName);
               
            });
        })
        searchbar.autocomplete({
            source: prodname,
            minLength: 2,
        });
    });


    document.getElementById("searchbut").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission
        var inputValue = document.getElementById("search-bar").value;
        if(prods[prodname.indexOf(inputValue)]==null)
        window.location.href="/public/LoginError/loginError.html"
        else
        // Redirect to the desired page with the search value as a query parameter
        window.location.href = "/public/ProductsPage/index.html?id=" +prods[prodname.indexOf(inputValue)]+'&name='+cats[prodname.indexOf(inputValue)];
      //  window.location.href = '/public/ProductsPage/index.html?id='+ searchbar.val()+'&name='+cats[prods.indexOf(searchbar.val())]+'">'
    })

});