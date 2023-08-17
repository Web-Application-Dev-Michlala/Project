var curr_page_num = 1;
var current_accord = null;
var curr_sorter = $("#oldestSorter");
var products;
var colors;
var sizes;
var brands;
var price_range;
var names;
var curr_products;
var curr_price_range;
var advanced_curr_price_range;
var categoryName;


$(document).ready(function()
{
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
        $.ajax({
            url:"/category/getAllProductsByCategory/" + categoryName,
            type: "Get",
        }).done(function(data){
            setData(data);
            createPages(products);
            createFilters();

            $('#name').autocomplete({
                source: getAllNames(products),
                minLength: 2,
            });


            $("#refreshProducts").click(function(){
                $.ajax({
                    url:"/category/getAllProductsByCategory/" + categoryName,
                    type: "Get",
                }).done(function(data){
                    setData(data);
                    $("#oldestSorter").click();
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

            //searching colors
            $("#color_submit").click(function(){
                var colorPicks = [];
                $("#color_search input").each(function(){
                    if($(this).is(':checked')){
                        colorPicks.push($(this).attr('id'));
                    }
                })
                if(colorPicks.length === 0){
                    alert("No colors were picked");
                    return;
                }
                $.ajax({
                    url:"/category/getProductsByColors/" + categoryName + "/" + colorPicks,
                    success: function(data){
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () =>{alert("No products were found");} 
                })
            })

            //searching sizes
            $("#size_submit").click(function(){
                var sizePicks = [];
                $("#size_search input").each(function(){
                    if($(this).is(':checked')){
                        sizePicks.push(parseFloat($(this).attr('id').split(' ')[0]));
                    }
                })
                if(sizePicks.length === 0){
                    alert("No sizes were picked");
                    return;
                }
                $.ajax({
                    url:"/category/getProductsBySizes/" + categoryName + "/" + sizePicks,
                    success: function(data){
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () =>{alert("No products were found");} 
                })
            })

            //searching brands
            $("#brand_submit").click(function(){
                var brandPicks = [];
                $("#brand_search input").each(function(){
                    if($(this).is(':checked')){
                        brandPicks.push($(this).attr('id'));
                    }
                })
                if(brandPicks.length === 0){
                    alert("No brands were picked");
                    return;
                }
                $.ajax({
                    url:"/category/getProductsByBrands/" + categoryName + "/" + brandPicks,
                    success: function(data){
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () =>{alert("No products were found");}
                })
            })

            


            //search price range
            $("#price_submit").click(function(){
                var priceRangePicks = curr_price_range;
                $.ajax({
                    url:"/category/getProductsByPriceRange/" + categoryName + "/" + priceRangePicks,
                    success: function(data){
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () => {alert("No products were found");}
                })
            })

            $("#advanced1_submit").click(function(){
                var color_picks = [];
                var size_picks = [];
                var brand_picks = [];
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
                $.ajax({
                    url:"/category/getProductsByColorsSizesBrands/" + categoryName +"/"+color_picks+"/"+size_picks+"/"+brand_picks,
                    type: "GET",
                    success: function(data){
                        $("#Advanced1").modal('toggle');          
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () => {alert("No products were found");}
                })
            })

            $("#advanced2_submit").click(function(){
                var color_picks = [];
                var brand_picks = [];
                var price_range_picks = advanced_curr_price_range;
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

                $.ajax({
                    url:"/category/getProductsByColorsBrandsPriceRange/" + categoryName+"/"+color_picks+"/"+brand_picks+"/"+price_range_picks,
                    type: "GET",
                    success: function(data){
                        $("#Advanced2").modal('toggle');          
                        curr_products = data;
                        $("#oldestSorter").click();
                    },
                    error: () => {alert("No products were found");}
                })

            })

            $("#resetFilters").click(function(){
                $("input[type=checkbox]").each(function(){
                    $(this).prop("checked",false);
                })
                $("#id").val("");
                $("#name").val("");
                var options = $("#price_range").slider('option');
                $("#price_range").slider('values',[options.min,options.max]);
                $("#advanced2_price_range").slider('values',[options.min,options.max]);
                $( "#price" ).text( "$" + options.min + " - $" + options.max);
                $( "#advanced2_price" ).text( "$" + options.min + " - $" + options.max);
                curr_products = products;
                $("#oldestSorter").click();
            });
        })
    

        //searching id
        $("#id_submit").click(function(){
            if($("#id").val().length === 0){
                alert("no ids were written");
                return;
            }
            $.ajax({
                url:"/category/getProductById/" + categoryName + "/" + $("#id").val(),
                success: function(data){
                    curr_products = [];
                    curr_products.push(data);
                    $("#oldestSorter").click();
                },
                error: () => {alert("No products were found");}
            })
        })

        $("#id").keydown(function(event) {            
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#id_submit").click();
            }
        });

        //searchin names
        $("#name_submit").click(function(){
            if($("#name").val().length === 0){
                alert("no names were written");
                return;
            }
            $.ajax({
                url:"/category/getProductsByName/" + categoryName + "/" + $("#name").val(),
                success: function(data){
                    curr_products = data;
                    $("#oldestSorter").click();
                },
                error: () => {alert("No products were found");}
            })
        })

        $("#name").keydown(function(event) {            
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#name_submit").click();
            }
        });

        //sorting by newest
        $("#newestSorter").click(function(){
            $(curr_sorter).prop('disabled',false);
            $(this).prop('disabled',true);
            curr_sorter = $(this);
            sortByNewest();
        })


        //searching by oldest
        $("#oldestSorter").click(function(){
            $(curr_sorter).prop('disabled',false);
            $(this).prop('disabled',true);
            curr_sorter = $(this);
            sortByOldest();
        })

        //searching by cheapest
        $("#cheapestSorter").click(function(){
            $(curr_sorter).prop('disabled',false);
            $(this).prop('disabled',true);
            curr_sorter = $(this);
            sortByCheapest();
        })

        //searching by most expensive
        $("#expensiveSorter").click(function(){
            $(curr_sorter).prop('disabled',false);
            $(this).prop('disabled',true);
            curr_sorter = $(this);
            sortByMostExpensive();
        })
        
        $(".accordion-button").click(function(){
            if(current_accord === this)
                current_accord = null;
            else{
                if(current_accord !== null)
                    current_accord.click();
                current_accord = this;
            }
        })
})

function setData(data){
    products = data;
    curr_products = products;
    colors = getAllColors(data).sort();
    sizes = getAllSizes(data);
    sizes.sort((size1,size2) => size1 - size2);
    brands = getAllBrands(data).sort();
    price_range = [getMinPrice(data),getMaxPrice(data)];
    $( "#price" ).text( "$" + price_range[0] + " - $" + price_range[1] );
    $( "#advanced2_price" ).text( "$" + price_range[0] + " - $" + price_range[1] );
    curr_price_range = price_range;
    advanced_curr_price_range = price_range;
    names = getAllNames(data).sort();    
}


function compareProductArrays(products1,products2){
    if(products1.length !== products2.length)
        return false;
    
    return true;
}

//create page numbers and products
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
        if(i !== num_pages){
            for(let j = 0 ; j<9 ; j++){
                addProduct(products,i,(i-1)*9 +j);
            }
        }
        else{
            for(let j = 0 ; j<last_page_num_products ; j++){
                addProduct(products,i,(i-1)*9 + j);
            }
        }
    }
    if(num_pages > 1){
        for(let i = 1; i<= num_pages ; i++){
            $("#page-"+i).click(function(){
                $("#content-box-" + i).prop('hidden',false);
                $("#content-box-" + curr_page_num).prop('hidden',true);
                $(this).addClass('disabled');
                $("#page-" + curr_page_num).removeClass('disabled');
                curr_page_num = i;
            });
        }
    }
    curr_page_num = 1;
}


//create page number
function addPageNumbers(i){
    if(i === 1){
        return;
    } 
    var disabled = "disabled";
    for(let j = 1 ; j<=i ; j++){
        if(j>1){
            disabled = "";
        }    
        $(".pagination").append('<li class="page-item">' +
        '<a class="page-link ' + disabled + '" id="page-' + j + '" type="button">' + j + '</a>' +
        '</li>');
    }
}


//create page
function addPage(i){
    var hidden
    if(i===1){
        hidden = "";
    }
    else{
        hidden = "hidden";
    } 
    $(".content").append('<div class="row row-cols-auto row-cols-md-3 g-5" id="content-box-' + i + '" ' + hidden + '>');
}


//create product
function addProduct(products,i,j){
    var image;
    if(products[j].amount > 0){
        image = '<a href="/public/ProductsPage/index.html?id=' + products[j].id + '&name=' + categoryName + '">' +
        '<img src="/' + products[j].image + '" class="card-img-top" alt="...">' +
        '</a>'; 
    }
    else{
        image = '<img src="public/images/soldout.png" class="card-img-top" alt="...">';
    }
    $("#content-box-" + i).append('<div class="col">' +
    '<div class="card">' + image +
    '<div class="card-body">' +
    '<h5 class="card-title">' + products[j].name + '</h5>' +
    '<p class="card-text">Id: ' + products[j].id + '</p>' +
    '<p class="card-text">' + products[j].description + '</p>' +
    '<p class="card-text">Price: ' + products[j].price.$numberDecimal + '</p>' +
    '</div></div></div>')
}


//removes all pages
function removePages(){
    $(".pagination").empty();
    $(".content").empty();
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
        $("#color_search").append('<div class="form-check">' +
        '<label for="' + color + '" class="form-label">'+ color + '</label>' +
        '<input type="checkbox" class="form-check-input" id="'+color + '">' +
        '</div>');
    })
    $("#color_search").clone().appendTo("#advanced1_color_search");
    $("#color_search").clone().appendTo("#advanced2_color_search");
    $("#color_search").append('<button type="button" class="btn btn-primary btn-sm" id="color_submit">Search</button>')
}

//creates size filters

function createSizes(){
    sizes.forEach(size => {
        $("#size_search").append('<div class="form-check">' +
        '<label for="' + size + '" class="form-label">'+ size + ' Inch</label>' +
        '<input type="checkbox" class="form-check-input" id="' + size + ' Inch">' +
        '</div>');
    })
    $("#size_search").clone().appendTo("#advanced1_size_search");
    $("#size_search").append('<button type="button" class="btn btn-primary btn-sm" id="size_submit">Search</button>')
}

//creates brand filters

function createBrands(){
    brands.forEach(brand => {
        $("#brand_search").append('<div class="form-check">' +
        '<label for="' + brand + '" class="form-label">'+ brand + '</label>' +
        '<input type="checkbox" class="form-check-input" id="'+brand + '">' +
        '</div>');
    })
    $("#brand_search").clone().appendTo("#advanced1_brand_search");
    $("#brand_search").clone().appendTo("#advanced2_brand_search");
    $("#brand_search").append('<button type="button" class="btn btn-primary btn-sm" id="brand_submit">Search</button>')
}

//creates price range

function createPriceRange(){
    $("#price_range").slider({
        range: true,
        min: parseFloat(price_range[0]),
        max: parseFloat(price_range[1]),
        values: [parseFloat(price_range[0]) , parseFloat(price_range[1])],
        slide: function( event,ui) {
        $( "#price" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        curr_price_range = [ui.values[0].toString(),ui.values[1].toString()];
        }
    });

    $( "#price" ).val( "$" + $( "#price_range" ).slider( "values", 0 ) +
    " - $" + $( "#price_range" ).slider( "values", 1 ) );

    $("#advanced2_price_range").slider({
        range: true,
        min: parseFloat(price_range[0]),
        max: parseFloat(price_range[1]),
        values: [parseFloat(price_range[0]) , parseFloat(price_range[1])],
        slide: function( event,ui) {
        $( "#advanced2_price" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        advanced_curr_price_range = [ui.values[0].toString(),ui.values[1].toString()];
        }
    });

    $( "#advanced2_price" ).val( "$" + $( "#advanced2_price_range" ).slider( "values", 0 ) +
    " - $" + $( "#advanced2_price_range" ).slider( "values", 1 ) );


}

function getAllColors(products){
var colors = [];
products.forEach( product => {
    if(!colors.includes(product.color))
    {
        colors.push(product.color);
    }
});
return colors;
}

function getAllSizes(){
    var sizes = [];
    products.forEach( product => {
        if(!sizes.includes(product.size.$numberDecimal))
        {
            sizes.push(product.size.$numberDecimal);
        }
    });
    return sizes;
}

function getAllBrands(products){
    var brands = [];
    products.forEach( product => {
        if(!brands.includes(product.brand))
        {
            brands.push(product.brand);
        }
    });
    return brands;
}

function getAllNames(products){
    var names = [];
    products.forEach( product => {
        if(!names.includes(product.name))
        {
            names.push(product.name);
        }
    });
    return names;
}

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

function sortByOldest(){
    removePages();
    createPages(curr_products);
}

function sortByNewest(){
    var products_new = curr_products.slice();
    removePages();
    createPages(products_new.reverse());
}

function sortByCheapest(){
    var products_cheap = curr_products.slice();
    removePages();  
    products_cheap.sort((product1,product2) => parseFloat(product1.price.$numberDecimal) - parseFloat(product2.price.$numberDecimal));
    createPages(products_cheap);
}

function sortByMostExpensive(){
    var products_expensive = curr_products.slice();
    removePages();
    products_expensive.sort((product1,product2) => parseFloat(product2.price.$numberDecimal) - parseFloat(product1.price.$numberDecimal));
    createPages(products_expensive);
}
