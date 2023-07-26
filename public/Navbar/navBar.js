$(document).ready(function() 
{
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
        var searchbar = $("#search-bar");
        var autocompleteOptions = searchbar.autocomplete({
          source: prodname,
          minLength: 2
        }).data("ui-autocomplete").menu.element;
        
        searchbar.on("focus", function() {
          adjustAutocompleteDropdown();
        });
        
        searchbar.on("autocompleteopen", function() {
          adjustAutocompleteDropdown();
        });
        
        $(window).on("resize", function() {
          adjustAutocompleteDropdown();
        });
        
        function adjustAutocompleteDropdown() {
          var searchBarWidth = searchbar.outerWidth();
          var searchBarOffset = searchbar.offset();
        
          autocompleteOptions.css({
            width: searchBarWidth,
            left: searchBarOffset.left
          });
        }
        
        // Use MutationObserver to handle width changes of the search bar
        var observer = new MutationObserver(function(mutationsList) {
          for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              adjustAutocompleteDropdown();
            }
          }
        });
        
        observer.observe(searchbar.get(0), { attributes: true });
        
   


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
    $("#search-bar").on("keydown", function(event) {
      // Check if the Enter key is pressed (keyCode 13)
      if (event.keyCode === 13) {
        // Trigger the click event on the search button
        $("#searchbut").click();
      }
    });
    });
});