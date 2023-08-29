var curr_page_num = 1;//the page of products the user is on
var current_accord = null;//current accordion filter the user is on
var curr_sorter = $("#oldestSorter"); // current sorter the user is on
var products;//the products array without filtering
var curr_products;//the products array with the current filter
var colors;//all products colors
var sizes;//all products sizes
var brands;//all products brands
var price_range;//products min and max prices
var names;//all products names
var curr_price_range;//the current price range the user set
var advanced_curr_price_range;//the current price range the user set in advanced search
var categoryName;//the category the user wanted


$(document).ready(function()
{
    //get navbar
    $.ajax
    ({
        url:'/isLoggedIn',
      
    }).done(function(data)
    {
        const navbar=$('#navbar');
        if(data.isConnected!==false)
        { 
           navbar.load('public/Navbar/navBar.html',function()
           { $('#userGreet').text('Hello '+data.isConnected);
           var userLink=$('#userLink')
           userLink.attr('href','/users?username='+data.isConnected)
        })
           
        }
        else
        {
            navbar.load('public/Navbar/navBarLoggedOut.html')
        }
    })
    

    categoryName = new URLSearchParams(window.location.search).get('name'); // get category name from url
        //getting products
        $.ajax({
            url:"/category/getAllProductsByCategory/" + categoryName,
            type: "Get",
        }).done(function(data){
            getData(data);//getting all data from the products 
            createPages(products);
            createFilters();

            $('#name').autocomplete({
                source: names,
                minLength: 2,//minimum characters needed for autocomplete
            });


            //button that refreshes the products list and updates filters
            $("#refreshProducts").click(function(){
                $.ajax({
                    url:"/category/getAllProductsByCategory/" + categoryName,
                    type: "Get",
                }).done(function(data){
                    getData(data);//gets new data
                    $("#oldestSorter").click();//clicking on it sets the products pages
                    //empty the current filters
                    $("#color_search").html("");
                    $("#size_search").html("");
                    $("#brand_search").html("");
                    $("#advanced1_color_search").html("");
                    $("#advanced1_size_search").html("");
                    $("#advanced1_brand_search").html("");
                    $("#advanced2_color_search").html("");
                    $("#advanced2_brand_search").html("");

                    createFilters();    
                })
            });

            //searching products according to the price filter
            $("#price_submit").click(function(){
                var priceRangePicks = curr_price_range;
                $.ajax({//gets all products that match the price range
                    url:"/category/getProductsByPriceRange/" + categoryName + "/" + priceRangePicks,
                    success: function(data){
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () => {alert("No products were found");}
                })
            })
            //searching products according to the color,size and brand filters together
            $("#advanced1_submit").click(function(){
                var color_picks = [];
                var size_picks = [];
                var brand_picks = [];
                //adds all the ticked options of colors,sizes and brands
                $("#advanced1_color_search input").each(function(){
                    if($(this).is(':checked')){
                        color_picks.push($(this).attr('id'));
                    }
                })
                if(color_picks.length === 0){
                    alert("No colors were picked");
                    return;
                }

                $("#advanced1_size_search input").each(function(){
                    if($(this).is(':checked')){
                        size_picks.push(parseFloat($(this).attr('id').split(' ')[0]));
                    }
                })  
                if(size_picks.length === 0){
                    alert("No sizes were picked");
                    return;
                }

                $("#advanced1_brand_search input").each(function(){
                    if($(this).is(':checked')){
                        brand_picks.push($(this).attr('id'));
                    }
                })
                if(brand_picks.length === 0){
                    alert("No brands were picked");
                    return;
                }
                $.ajax({//gets all products that match the filters
                    url:"/category/getProductsByColorsSizesBrands/" + categoryName +"/"+color_picks+"/"+size_picks+"/"+brand_picks,
                    type: "GET",
                    success: function(data){
                        $("#Advanced1").modal('toggle');//closes the advanced search          
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () => {alert("No products were found");}
                })
            })

            //searching products according to the color,brand and price filters together
            $("#advanced2_submit").click(function(){
                var color_picks = [];
                var brand_picks = [];
                var price_range_picks = advanced_curr_price_range;
                //adds all the ticked options of colors,sizes and gets the price range
                $("#advanced2_color_search input").each(function(){
                    if($(this).is(':checked')){
                        color_picks.push($(this).attr('id'));
                    }
                })
                if(color_picks.length === 0){
                    alert("No colors were picked");
                    return;
                }

                $("#advanced2_brand_search input").each(function(){
                    if($(this).is(':checked')){
                        brand_picks.push($(this).attr('id'));
                    }
                })
                if(brand_picks.length === 0){
                    alert("No brands were picked");
                    return;
                }

                $.ajax({//gets all products that match the filters
                    url:"/category/getProductsByColorsBrandsPriceRange/" + categoryName+"/"+color_picks+"/"+brand_picks+"/"+price_range_picks,
                    type: "GET",
                    success: function(data){
                        $("#Advanced2").modal('toggle');//closes the advanced search          
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () => {alert("No products were found");}
                })

            })

            //resets all the filters and returns to the unfiltered products page
            $("#resetFilters").click(function(){
                $("input[type=checkbox]").each(function(){//all checkboxes
                    $(this).prop("checked",false);//uncheck checkbox
                })
                //reset id,name and price filters
                $("#id").val("");
                $("#name").val("");
                var options = $("#price_range").slider('option');
                $("#price_range").slider('values',[options.min,options.max]);
                $("#advanced2_price_range").slider('values',[options.min,options.max]);
                $( "#price" ).text( "$" + options.min + " - $" + options.max);
                $( "#advanced2_price" ).text( "$" + options.min + " - $" + options.max);
                curr_products = products;//get the unfiltered products
                $("#oldestSorter").click();
            });
        })
    

        //searching products according to the id filter
        $("#id_submit").click(function(){
            if($("#id").val().length === 0){
                alert("No ids were written");
                return;
            }
            $.ajax({//gets the product that match the id
                url:"/category/getProductById/" + categoryName + "/" + $("#id").val(),
                success: function(data){
                    //create an array of one to avoid problems when creating the pages
                    curr_products = [];
                    curr_products.push(data);
                    $("#oldestSorter").click();
                },
                error: () => {alert("No products were found");}
            })
        })

        $("#id").keydown(function(event) {//avoid changing and refreshing the url when pressing 'enter' on the id,and making it like clicking button         
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#id_submit").click();
            }
        });

        //searching products according to the id filter
        $("#name_submit").click(function(){
            if($("#name").val().length === 0){
                alert("no names were written");
                return;
            }
            $.ajax({//gets the products that has the name written as part of their name
                url:"/category/getProductsByName/" + categoryName + "/" + $("#name").val(),
                success: function(data){
                    curr_products = data;
                    $("#oldestSorter").click();
                },
                error: () => {alert("No products were found");}
            })
        })

        $("#name").keydown(function(event) {//avoid changing and refreshing the url when pressing 'enter' on the name,and making it like clicking button            
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#name_submit").click();
            }
        });

        //sorting by newest product added
        $("#newestSorter").click(function(){
            $(curr_sorter).prop('disabled',false);//enabling the current tag of sorting to click
            $(this).prop('disabled',true);//disabling the new tag of sorting to click
            curr_sorter = $(this);//updating the current sorting tag
            sortByNewest();
        })


        //searching by oldest product added
        $("#oldestSorter").click(function(){
            $(curr_sorter).prop('disabled',false);//enabling the current tag of sorting to click
            $(this).prop('disabled',true);//disabling the new tag of sorting to click
            curr_sorter = $(this);//updating the current sorting tag
            sortByOldest();
        })

        //searching by cheapest product
        $("#cheapestSorter").click(function(){
            $(curr_sorter).prop('disabled',false);//enabling the current tag of sorting to click
            $(this).prop('disabled',true);//disabling the new tag of sorting to click
            curr_sorter = $(this);//updating the current sorting tag
            sortByCheapest();
        })

        //searching by most expensive product
        $("#expensiveSorter").click(function(){
            $(curr_sorter).prop('disabled',false);//enabling the current tag of sorting to click
            $(this).prop('disabled',true);//disabling the new tag of sorting to click
            curr_sorter = $(this);//updating the current sorting tag
            sortByMostExpensive();
        })
})

//function that gets all information from the given data
function getData(data){
    products = data;//gets unfiltered products
    curr_products = products;
    colors = getAllColors(data).sort();
    sizes = getAllSizes(data);
    sizes.sort((size1,size2) => size1 - size2);
    brands = getAllBrands(data).sort();
    price_range = [getMinPrice(data),getMaxPrice(data)];
    $( "#price" ).text( "$" + price_range[0] + " - $" + price_range[1] );//sets the price label to the min and max prices
    $( "#advanced2_price" ).text( "$" + price_range[0] + " - $" + price_range[1] );//sets the advanced search price label
    curr_price_range = price_range;
    advanced_curr_price_range = price_range;
    names = getAllNames(data).sort();    
}

//get all colors from the given products without duplicates
function getAllColors(products){
    var colors = [];
    products.forEach( product => {//if colors array dont have the color than add it
        if(!colors.includes(product.color))
        {
            colors.push(product.color);
        }
    });
    return colors;
}

//get all sizes from the given products without duplicates
function getAllSizes(){
    var sizes = [];
    products.forEach( product => {//if sizes array dont have the size than add it
        if(!sizes.includes(product.size.$numberDecimal))
        {
            sizes.push(product.size.$numberDecimal);
        }
    });
    return sizes;
}

//get all brands from the given products without duplicates
function getAllBrands(products){
    var brands = [];
    products.forEach( product => {//if brands array dont have the brand than add it
        if(!brands.includes(product.brand))
        {
            brands.push(product.brand);
        }
    });
    return brands;
}

//get all names from the given products without duplicates
function getAllNames(products){
    var names = [];
    products.forEach( product => {//if names array dont have the name than add it
        if(!names.includes(product.name))
        {
            names.push(product.name);
        }
    });
    return names;
}

//gets minimum price of the products
function getMinPrice(products){
    var min = -1;
    products.forEach( product => {
        if(min === -1 || parseFloat(product.price.$numberDecimal) < parseFloat(min.$numberDecimal))
        {
            min = product.price;
        }
    });
    return min.$numberDecimal;
}

//gets maximum price of the products
function getMaxPrice(products){
    var max = -1;
    products.forEach( product => {
        if(max === -1 || parseFloat(product.price.$numberDecimal) > parseFloat(max.$numberDecimal))
        {
            max = product.price;
        }
    });
    return max.$numberDecimal;
}

//create page numbers and products with the given products
function createPages(products){

    let length = products.length;
    let num_pages;
    let last_page_num_products;
    if(length % 9 === 0){
        num_pages = length/9 - (length%9)/9;
        last_page_num_products = 9;
    }
    else{
        num_pages =  length/9 - (length%9)/9 + 1;
        last_page_num_products = length % 9;
    }
    addPageNumbers(num_pages);
    for(let i = 1 ; i<=num_pages ; i++){
        addPage(i);
        if(i !== num_pages){//if not on last page
            for(let j = 0 ; j<9 ; j++){//9 products in a page
                addProduct(products,i,(i-1)*9 +j);
            }
        }
        else{//if on last page
            for(let j = 0 ; j<last_page_num_products ; j++){
                addProduct(products,i,(i-1)*9 + j);
            }
        }
    }
    if(num_pages > 1){//if has more the one page then need functionality of page buttons
        for(let i = 1; i<= num_pages ; i++){
            //page buttons functionality
            $("#page-"+i).click(function(){
                $("#content-box-" + i).prop('hidden',false);//show page clicked
                $("#content-box-" + curr_page_num).prop('hidden',true);//hide current page
                $(this).addClass('disabled');//disable new page button
                $("#page-" + curr_page_num).removeClass('disabled');//enable current page button
                curr_page_num = i;//sets new page
            });
        }
    }
    curr_page_num = 1;
}


//create page numbers button according to the given number
function addPageNumbers(i){
    if(i === 1){//if only one page no need to create buttons
        return;
    } 
    var disabled = "disabled";
    for(let j = 1 ; j<=i ; j++){
        if(j>1){//only page 1 button is disabled
            disabled = "";
        }
        //create page button and adding the page buttons list    
        $(".pagination").append('<li class="page-item">' +
        '<a class="page-link ' + disabled + '" id="page-' + j + '" type="button">' + j + '</a>' +
        '</li>');
    }
}


//create page according to page number
function addPage(i){
    var hidden
    if(i===1){//first page is shown
        hidden = "";
    }
    else{//other pages are hidden
        hidden = "hidden";
    }
    //create page and adding to pages list 
    $(".content").append('<div class="row row-cols-auto row-cols-md-3 g-5" id="content-box-' + i + '" ' + hidden + '>');
}


//create product accordion to products, page number: i , and product number: j
function addProduct(products,i,j){
    var image;
    if(products[j].amount > 0){//if the product is not soldout
        image = '<a href="/public/ProductsPage/index.html?id=' + products[j].id + '&name=' + categoryName + '">' +
        '<img src="/' + products[j].image + '" class="card-img-top" alt="...">' +
        '</a>'; 
    }
    else{//if the product is soldout
        image = '<img src="public/images/soldout.png" class="card-img-top" alt="...">';
    }
    //add product to page number
    $("#content-box-" + i).append('<div class="col">' +
    '<div class="card">' + image +
    '<div class="card-body">' +
    '<h5 class="card-title">' + products[j].name + '</h5>' +
    '<p class="card-text">Id: ' + products[j].id + '</p>' +
    '<p class="card-text">Price: ' + products[j].price.$numberDecimal + '$</p>' +
    '</div></div></div>')
}


//removes all pages
function removePages(){
    $(".pagination").empty();//empty page numbers
    $(".content").empty();//empty pages
}

//creates filters
function createFilters(){
    createColors();
    createSizes();
    createBrands();
    createPriceRange();
}

//creates color filters
function createColors(){
    colors.forEach(color => {
        //add each color the the color filter as option
        $("#color_search").append('<div class="form-check">' +
        '<label for="' + color + '" class="form-label">'+ color + '</label>' +
        '<input type="checkbox" class="form-check-input" id="'+color + '">' +
        '</div>');
    })
    //add colors to the advanced search
    $("#color_search").clone().appendTo("#advanced1_color_search");
    $("#color_search").clone().appendTo("#advanced2_color_search");
    //add color search button
    $("#color_search").append('<button type="button" class="btn btn-primary btn-sm" id="color_submit">Search</button>')
    //searching products according to the color filter
    $("#color_submit").click(function(){
        var colorPicks = [];
        $("#color_search input").each(function(){//adds all the ticked options of colors
            if($(this).is(':checked')){//if the "checked" attribute is true
                colorPicks.push($(this).attr('id'));
            }
        })
        if(colorPicks.length === 0){
            alert("No colors were picked");
            return;
        }
        $.ajax({//gets all products that match any of the colors
            url:"/category/getProductsByColors/" + categoryName + "/" + colorPicks,
            success: function(data){
                curr_products = data;
                $("#oldestSorter").click();
            },
            error: () =>{alert("No products were found");} 
        })
    })
}

//creates size filters

function createSizes(){
    sizes.forEach(size => {
        //add each size the the color filter as option
        $("#size_search").append('<div class="form-check">' +
        '<label for="' + size + ' Inch" class="form-label">'+ size + ' Inch</label>' +
        '<input type="checkbox" class="form-check-input" id="' + size + ' Inch">' +
        '</div>');
    })
    //add sizes to the advanced search
    $("#size_search").clone().appendTo("#advanced1_size_search");
    //add size search button
    $("#size_search").append('<button type="button" class="btn btn-primary btn-sm" id="size_submit">Search</button>')
    //searching products according to the size filter
    $("#size_submit").click(function(){
        var sizePicks = [];
        $("#size_search input").each(function(){//adds all the ticked options of sizes
            if($(this).is(':checked')){//if the "checked" attribute is true
                sizePicks.push(parseFloat($(this).attr('id').split(' ')[0]));
            }
        })
        if(sizePicks.length === 0){
            alert("No sizes were picked");
            return;
        }
        $.ajax({//gets all products that match any of the sizes
            url:"/category/getProductsBySizes/" + categoryName + "/" + sizePicks,
            success: function(data){
                curr_products = data;
                $("#oldestSorter").click();
            },
            error: () =>{alert("No products were found");} 
        })
    })
}

//creates brand filters

function createBrands(){
    brands.forEach(brand => {
        //add each brand the the color filter as option
        $("#brand_search").append('<div class="form-check">' +
        '<label for="' + brand + '" class="form-label">'+ brand + '</label>' +
        '<input type="checkbox" class="form-check-input" id="'+brand + '">' +
        '</div>');
    })
    //add brands to the advanced search
    $("#brand_search").clone().appendTo("#advanced1_brand_search");
    $("#brand_search").clone().appendTo("#advanced2_brand_search");
    //add brand search button
    $("#brand_search").append('<button type="button" class="btn btn-primary btn-sm" id="brand_submit">Search</button>')
    //searching products according to the brand filter
    $("#brand_submit").click(function(){
        var brandPicks = [];
        $("#brand_search input").each(function(){//adds all the ticked options of brand
            if($(this).is(':checked')){//if the "checked" attribute is true
                brandPicks.push($(this).attr('id'));
            }
        })
        if(brandPicks.length === 0){
            alert("No brands were picked");
            return;
        }
        $.ajax({//gets all products that match any of the brands
            url:"/category/getProductsByBrands/" + categoryName + "/" + brandPicks,
            success: function(data){
                curr_products = data;
                $("#oldestSorter").click();
            },
            error: () =>{alert("No products were found");}
        })
    })
}

//creates price range
function createPriceRange(){
    $("#price_range").slider({//sets the slider of the price range
        range: true,//has range
        min: parseFloat(price_range[0]),//minimum value of slider
        max: parseFloat(price_range[1]),//maximum value of slider
        values: [parseFloat(price_range[0]) , parseFloat(price_range[1])],//current values of slider
        slide: function( event,ui) {//when moving slider
        $( "#price" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );//changes price label to changed values of slider
        curr_price_range = [ui.values[0].toString(),ui.values[1].toString()];//changes the current price range to changed values of slider
        }
    });

    $("#advanced2_price_range").slider({
        range: true,//has range
        min: parseFloat(price_range[0]),//minimum value of slider
        max: parseFloat(price_range[1]),//maximum value of slider
        values: [parseFloat(price_range[0]) , parseFloat(price_range[1])],//current values of slider
        slide: function( event,ui) {//when moving slider
        $( "#advanced2_price" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );//changes price label to changed values of slider
        advanced_curr_price_range = [ui.values[0].toString(),ui.values[1].toString()];//changes the current price range to changed values of slider
        }
    });
}

//create new pages by the current array
function sortByOldest(){
    removePages();
    createPages(curr_products);
}

//create new pages by the reversed array
function sortByNewest(){
    var products_new = curr_products.slice();
    removePages();
    createPages(products_new.reverse());
}

//create new pages by sorting the array from cheapest to most expensive
function sortByCheapest(){
    var products_cheap = curr_products.slice();
    removePages();  
    products_cheap.sort((product1,product2) => parseFloat(product1.price.$numberDecimal) - parseFloat(product2.price.$numberDecimal));
    createPages(products_cheap);
}

//create new pages by sorting the array from most expensive to cheapest
function sortByMostExpensive(){
    var products_expensive = curr_products.slice();
    removePages();
    products_expensive.sort((product1,product2) => parseFloat(product2.price.$numberDecimal) - parseFloat(product1.price.$numberDecimal));
    createPages(products_expensive);
}
