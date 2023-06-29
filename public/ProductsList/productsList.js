/*
    To do:
     understand how to erase duplicate sizes
     do advanced search
     connect id to page
*/

var curr_page_num = 1;
var curr_sorter = document.getElementById("oldestSorter");
var products;
var colors;
var sizes;
var brands;
var price_range;
var names;
var curr_products;
var curr_price_range;
var categoryName;


$(document).ready(function(){
    $.ajax
    ({
        url:'/isLoggedIn',
      
    }).done(function(data)
    {
        const navbar=$('#navbar');
        if(data.isConnected!=false)
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
    });
    

    categoryName = new URLSearchParams(window.location.search).get('name'); // get category name from url
        $.ajax({
            url:"/category/getAllProductsByCategory/" + categoryName,
            type: "Get",
        }).done(function(data){
            products = data;
            curr_products = products;
            colors = getAllColors(products).sort();
            sizes = getAllSizes(products);
            sizes.sort((size1,size2) => parseFloat(size1.$numberDecimal) - parseFloat(size2.$numberDecimal));
            brands = getAllBrands(products).sort();
            price_range = [getMinPrice(products),getMaxPrice(products)];
            curr_price_range = price_range;
            names = getAllNames(products).sort();
            createPages(products);
            createFilters();

            $('#name').autocomplete({
                source: getAllNames(products),
                minLength: 2,
            });


            //figure out how to use jquery each function 


            //searchinh colors
            $("#color_submit").click(function(){
                var colorPicks = [];
                var color_search = document.querySelector("#color_search");
                var checkBoxes = color_search.querySelectorAll("input");
                checkBoxes.forEach((checkBox) => {
                    if($(checkBox).is(':checked')){
                        colorPicks.push(checkBox.id);
                    }
                })
                $.ajax({
                    url:"/category/getProductsByColors/" + categoryName + "/" + colorPicks,
                }).done(function(data){
                    curr_products = data;
                    $("#oldestSorter").click();
                })
            })


            //searching sizes
            $("#size_submit").click(function(){
                var sizePicks = [];
                var size_search = document.querySelector("#size_search");
                var checkBoxes = size_search.querySelectorAll("input");
                checkBoxes.forEach((checkBox) => {
                    if($(checkBox).is(':checked')){
                        sizePicks.push(checkBox.id);
                    }
                })
                $.ajax({
                    url:"/category/getProductsBySizes/" + categoryName + "/" + sizePicks,
                }).done(function(data){
                    curr_products = data;
                    $("#oldestSorter").click();
                })
            })

            //searching brands
            $("#brand_submit").click(function(){
                var brandPicks = [];
                var brand_search = document.querySelector("#brand_search");
                var checkBoxes = brand_search.querySelectorAll("input");
                checkBoxes.forEach((checkBox) => {
                    if($(checkBox).is(':checked')){
                        brandPicks.push(checkBox.id);
                    }
                })
                $.ajax({
                    url:"/category/getProductsByBrands/" + categoryName + "/" + brandPicks,
                }).done(function(data){
                    curr_products = data;
                    $("#oldestSorter").click();
                })
            })


            //search price range
            $("#price_submit").click(function(){
                var priceRangePicks = curr_price_range;
                $.ajax({
                    url:"/category/getProductsByPriceRange/" + categoryName + "/" + priceRangePicks,
                }).done(function(data){
                    curr_products = data;
                    $("#oldestSorter").click();
                })
            })
        })
    

        //searching id
        $("#id_submit").click(function(){
            if(this.value.length === 0){
                //check validation
            }
            $.ajax({
                url:"/category/getProductById/" + categoryName + "/" + $("#id").val(),
            }).done(function(data){
                curr_products = data;
                $("#oldestSorter").click();
            })
        })

        //searchin names
        $("#name_submit").click(function(){
            if(this.value.length === 0){
                //check validation
            }
            $.ajax({
                url:"/category/getProductsByName/" + categoryName + "/" + $("#name").val(),
            }).done(function(data){
                curr_products = data;
                $("#oldestSorter").click();
            })
        })

        //sorting by newest
        $("#newestSorter").click(function(){
            curr_sorter.disabled = false;
            this.disabled = true;
            curr_sorter = this;
            sortByNewest();
        })


        //searching by oldest
        $("#oldestSorter").click(function(){
            curr_sorter.disabled = false;
            this.disabled = true;
            curr_sorter = this;
            sortByOldest();
        })

        //searching by cheapest
        $("#cheapestSorter").click(function(){
            curr_sorter.disabled = false;
            this.disabled = true;
            curr_sorter = this;
            sortByCheapest();
        })

        //searching by most expensive
        $("#expensiveSorter").click(function(){
            curr_sorter.disabled = false;
            this.disabled = true;
            curr_sorter = this;
            sortByMostExpensive();
        })

})

function clearChoices(){

}

//create page numbers and products
function createPages(products){
    let length = products.length;
    let num_pages;
    if(length % 9 === 0){
        num_pages = length/9 - (length%9)/9;
    }
    else{
        num_pages =  length/9 - (length%9)/9 + 1;
    }
    let last_page_num_products = length % 9;
    addPageNumbers(num_pages);
    for(let i = 1 ; i<=num_pages ; i++){
        addPage(i);
        if(i != num_pages){
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
                let Page = document.querySelector("#content-box-"+i);
                Page.hidden = false;
                let curr_page = document.querySelector("#content-box-" + curr_page_num);
                curr_page.hidden = true;
                let curr_page_button = document.querySelector("#page-" + curr_page_num);
                this.className = "page-link disabled";
                curr_page_button.className = "page-link";
                curr_page_num = i;
            });
        }
    }
    curr_page = 1;
}


//create page number
function addPageNumbers(i){
    if(i === 1){
        return;
    } 
    for(let j = 1 ; j<=i ; j++){
        const pages = document.querySelector(".pagination");
        const newPage = document.createElement("li");
        newPage.className = "page-item";
        const pageNum = document.createElement("a");
        pageNum.className = "page-link";
        pageNum.id = "page-" +  j;
        if(j===1){
            pageNum.className = "page-link disabled";
        }
        pageNum.type = "button";
        pageNum.innerText = ""+j;
        newPage.appendChild(pageNum);
        pages.appendChild(newPage);
    }
}


//create page
function addPage(i){
    const content = document.querySelector(".content");
    const newPage = document.createElement("div")
    newPage.className ="row row-cols-auto row-cols-md-3 g-5";
    newPage.id = "content-box-" + i;
    if(i>1){
        newPage.hidden = true;
    }
    content.appendChild(newPage);
}


//create product
function addProduct(products,i,j){
    const page = document.querySelector("#content-box-" + i);
    const productCol = document.createElement("div")
    productCol.className = "col"
    
    const newProduct = document.createElement("div");
    newProduct.className = "card"
    //newProduct.onclick = "window.location.href = /"
        
    const productImage = document.createElement("img");
    productImage.src = products[j].image;
    productImage.className = "card-img-top";
    productImage.alt = "...";
    
    const productBody = document.createElement("div");
    productBody.className = "card-body";
    
    const productTitle = document.createElement("h5");
    productTitle.className = "card-title";
    productTitle.innerText = products[j].name;

    const productId = document.createElement("p");
    productId.className = "card-text"
    productId.innerText = "Id: " + products[j].id;

    const productColor = document.createElement("p");
    productColor.className = "card-text"
    productColor.innerText = "Color: " + products[j].color;

    const productSize = document.createElement("p");
    productSize.className = "card-text"
    productSize.innerText ="Size: " + products[j].size.$numberDecimal + " Inch";

    const productBrand = document.createElement("p");
    productBrand.className = "card-text"
    productBrand.innerText = "Brand: " + products[j].brand;


    const productDesc = document.createElement("p");
    productDesc.className = "card-text"
    productDesc.innerText = products[j].description;
    
    const productPrice = document.createElement("p");
    productPrice.className = "card-text";
    productPrice.id = "product-price";
    productPrice.innerText = "Price: "+ products[j].price.$numberDecimal;
    
    productBody.appendChild(productTitle);
    productBody.appendChild(productId);
    productBody.appendChild(productDesc);
    productBody.appendChild(productBrand);
    productBody.appendChild(productColor);
    productBody.appendChild(productSize);
    productBody.appendChild(productPrice);
    newProduct.appendChild(productImage);
    newProduct.appendChild(productBody);
    productCol.appendChild(newProduct);
    page.appendChild(productCol);


}


//removes all pages
function removePages(){
    const pages = document.querySelector(".pagination");
    while(pages.firstChild){
        pages.removeChild(pages.lastChild);
    }
    const content = document.querySelector(".content");
    while(content.firstChild){
        content.removeChild(content.lastChild);
    }
}

//creates filters
function createFilters(){
    createColors();
    createSizes();
    createBrands();
    createPriceRange();
    //createAdvanced();
}

//creates color filters
function createColors(){
    var colorList = document.querySelector("#color_search");
    colors.forEach(color => {
        const colorCheck = document.createElement("div");
        colorCheck.className = "form-check";
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "form-check-input";
        checkBox.id = "" + color;
        const colorLabel = document.createElement("label");
        colorLabel.for = "" + color;
        colorLabel.className = "form-label";
        colorLabel.innerText = "" + color;
        colorCheck.appendChild(colorLabel);
        colorCheck.appendChild(checkBox);
        colorList.appendChild(colorCheck);
    })
    const colorButton = document.createElement("button");
    colorButton.type = "button";
    colorButton.className = "btn btn-primary btn-sm";
    colorButton.id = "color_submit";
    colorButton.innerText = "Search";
    colorList.appendChild(colorButton);
}

//creates size filters

function createSizes(){
    var sizeList = document.querySelector("#size_search");
    sizes.forEach(size => {
        const sizeCheck = document.createElement("div");
        sizeCheck.className = "form-check";
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "form-check-input";
        checkBox.id = "" + size.$numberDecimal + " Inch";
        const sizeLabel = document.createElement("label");
        sizeLabel.for = "" + size.$numberDecimal + " Inch" ;
        sizeLabel.className = "form-label";
        sizeLabel.innerText = "" + size.$numberDecimal + " Inch";
        sizeCheck.appendChild(sizeLabel);
        sizeCheck.appendChild(checkBox);
        sizeList.appendChild(sizeCheck);
    })
    const sizeButton = document.createElement("button");
    sizeButton.type = "button";
    sizeButton.className = "btn btn-primary btn-sm";
    sizeButton.id = "size_submit";
    sizeButton.innerText = "Search";
    sizeList.appendChild(sizeButton);
}

//creates brand filters

function createBrands(){
    var brandList = document.querySelector("#brand_search");
    brands.forEach(brand => {
        const brandCheck = document.createElement("div");
        brandCheck.className = "form-check";
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "form-check-input";
        checkBox.id = "" + brand;
        const brandLabel = document.createElement("label");
        brandLabel.for = "" + brand;
        brandLabel.className = "form-label";
        brandLabel.innerText = "" + brand;
        brandCheck.appendChild(brandLabel);
        brandCheck.appendChild(checkBox);
        brandList.appendChild(brandCheck);
    })
    const brandButton = document.createElement("button");
    brandButton.type = "button";
    brandButton.className = "btn btn-primary btn-sm";
    brandButton.id = "brand_submit";
    brandButton.innerText = "Search";
    brandList.appendChild(brandButton);
}

//creates price range

function createPriceRange(){
    $("#price_range").slider({
        range: true,
        min: parseFloat(price_range[0]),
        max: parseFloat(price_range[1]),
        values: [parseFloat(price_range[0]) , parseFloat(price_range[1])],
        slide: function( event,ui) {
        $( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        curr_price_range = [ui.values[0].toString(),ui.values[1].toString()];
        }
    });

    $( "#price" ).val( "$" + $( "#price_range" ).slider( "values", 0 ) +
    " - $" + $( "#price_range" ).slider( "values", 1 ) );

    $("#color_pick input").checkboxradio({
        icon:false
    });
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
            sizes.push(product.size);
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
    if(min == -1 || parseFloat(product.price.$numberDecimal) < parseFloat(min.$numberDecimal))
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
