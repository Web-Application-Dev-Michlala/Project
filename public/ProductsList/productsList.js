//const categoryService = require('../services/category')
//const productService = require('../services/product')
var minPrice,maxPrice
var products = [];
var curr_page_num = 1;

$(document).ready(function(){
    /*
    EXAMPLE FOR HOW TO USE QUERIES
    var search = window.location.search;
    var queryParams = search.split('?')[1];
    console.log(queryParams);
    now need to update html to load dynamically
    */
   
    //products = categoryService.categoryService.getAllProductsByCategory("phone"); //figure out how to know which category i am in
    let length = products.length;
    var num_pages
    if(length % 12 == 0){
        num_pages = length/12;

    }
    else{
        num_pages = length/12 + 1;
    }
    let last_page_num_products = length % 12
    //creating products, need to add from mongodb products
    num_pages = 3;
    addPageNumbers(num_pages);
    for(let i = 1; i<= 3 ; i++ ){
        addPage(i);
        for(let j = 1 ; j <=9 ; j++){
            addProduct(i);
        }
    }
    if(num_pages > 1){
        for(let i = 1 ; i<= num_pages; i++){
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

    $("#price_range").slider({
        range: true,
        min: 0,
        max: 10000,
        step:100,
        values: [ 0, 10000 ],
        slide: function( event, ui ) {
          $( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });

    $( "#price" ).val( "$" + $( "#price_range" ).slider( "values", 0 ) +
      " - $" + $( "#price_range" ).slider( "values", 1 ) );

    $("#color_pick input").checkboxradio({
        icon:false
    });
})

function addPageNumbers(i){
    if(i == 1){
        return;
    } 
    for(let j = 1 ; j<=i ; j++){
        const pages = document.querySelector(".pagination");
        const newPage = document.createElement("li");
        newPage.className = "page-item";
        const pageNum = document.createElement("a");
        pageNum.className = "page-link";
        pageNum.id = "page-" +  j;
        if(j==1){
            pageNum.className = "page-link disabled";
        }
        pageNum.type = "button";
        pageNum.innerText = ""+j;
        newPage.appendChild(pageNum);
        pages.appendChild(newPage);
    }
}

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

function addProduct(i){
    const page = document.querySelector("#content-box-" + i);
    const productCol = document.createElement("div")
    productCol.className = "col"
    
    const newProduct = document.createElement("div");
    newProduct.className = "card"
    
    const productImage = document.createElement("img");
    if(i==1){
        productImage.src = '..\\images\\Phones.jpg';
    }
    else if(i==2)
    {
       productImage.src = '..\\images\\java.png';
    }
    else{
        productImage.src = '..\\images\\Lebron.jpg';
    }
    productImage.className = "card-img-top";
    productImage.alt = "...";
    
    const productBody = document.createElement("div");
    productBody.className = "card-body";
    
    const productTitle = document.createElement("h5");
    productTitle.className = "card-title";
    productTitle.innerText = "Product name";

    const productDesc = document.createElement("p");
    productDesc.className = "card-text"
    productDesc.innerText = 'Product description'
    
    productBody.appendChild(productTitle);
    productBody.appendChild(productDesc);
    newProduct.appendChild(productImage);
    newProduct.appendChild(productBody);
    productCol.appendChild(newProduct);
    page.appendChild(productCol);
}

/*$("#id_search").submit(function(e){
    if(!$("#id")[0].checkValidity() || !isValidId($("#id")[0].val)){
        e.preventDefault();
        e.stopPropogation();
        $("#id_search").addClass("is_invalid");
    }    
    else{
        
    }
})

function isValidId(value){
    try{
        parseInt(id);
    }
    catch(error){
        return false;
    }
    return true;
}
*/