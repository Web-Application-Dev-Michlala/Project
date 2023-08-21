var currCategoryName;
var socket = io();

$(document).ready(function(){

    $("#createUpdateCategoryButton").click(function(){//reset create update category offcanvas
        $("#createUpdateCategoryActionType").val("0");
        $("#createUpdateCategoryActionType").change();
    })

    $("#createUpdateCategoryActionType").change(function(){//changes action from no action,create and update
        var action = $(this).val();
        resetCategoryFields();
        if (action === "0") {//no action
            $("#createUpdateCategoryInfo").prop("hidden", true);//hides the fields of category
            //resets the select field of categoryname
            $("#createUpdateCategorySelectName").val("0");
            $("#createUpdateCategorySelectName").change();
        } else{
            getCategories();//updating category name select with categories
            getImages();//updating image select with images
            if (action === "Create") {//create
                $("#createUpdateCategoryInfo").prop("hidden",false);//shows the fields of category
                $("#createUpdateCategorySelectName").prop("hidden",true);//select field needed only on update
                $("#createCategorySubmit").prop("hidden",false);
                $("#updateCategorySubmit").prop("hidden",true);
                //enables all fields to use for create
                $("#createUpdateCategoryForm .form-control").each(function(){
                    $(this).prop("disabled",false);
                });
                $("#createUpdateCategoryImageField").prop("disabled",false);
            } else {//update
                $("#createUpdateCategoryInfo").prop("hidden",false);//shows the fields of category
                $("#createUpdateCategorySelectName").prop("hidden",false);//select field needed for update
                //reset select name field
                $("#createUpdateCategorySelectName").val("0");
                $("#createUpdateCategorySelectName").change();
                $("#createCategorySubmit").prop("hidden",true);
                $("#updateCategorySubmit").prop("hidden",false);
            }
        }
    })

    $("#createUpdateCategorySelectName").change(function(){//change select name field
        var name = $(this).val();

        if(name === "0"){//no category chosen
            //resets and disables category fields
            $("#createUpdateCategoryForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            $("#createUpdateCategoryImageField").prop("disabled",true);
            resetCategoryFields();
        } else {//category chosen
            //enables category fields
            $("#createUpdateCategoryForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $("#createUpdateCategoryImageField").prop("disabled",false);
            $.ajax({//getting category information and filling the category fields with it
                url: "/adminPage/getCategoryDetails/" + $("#createUpdateCategorySelectName").val(),
                type: "GET",
                success: function(categoryDetails) {
                    currCategoryName = categoryDetails.categoryName;
                    fillCategoryFields(categoryDetails);
                },
                error: function() {
                    alert("An error occurred while trying to get category products");
                }
            });
        }
    })

    $("#createCategorySubmit").click(function(){//creating category
        if(!categoryNameValidate()){//checks validation
            $("#createUpdateCategoryAlert").prop("hidden",false);
            setTimeout(() => {
                $("#createUpdateCategoryAlert").prop("hidden",true);
            },3000);
        }
        else{//is valid
            $.ajax({
                url:"/adminPage/isCategoryExist/" + $("#createUpdateCategoryNameField").val(),
                type:"GET",
            }).done((boolean) => {
                if(boolean === true){//category name already exist
                    $("#createUpdateCategoryError").text("Category name is already taken");
                    $("#createUpdateCategoryAlert").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateCategoryAlert").prop("hidden",true);;
                    },3000);
                    return;
                }
                var image;
                if($("#createUpdateCategoryImageField").val() === "0"){
                    image = "";
                }
                else{
                    image ="public/images/" + $("#createUpdateCategoryImageField").val();
                }
                $.ajax({//creates category
                    url: "/adminPage/createCategory",
                    type: "POST",
                    data: {
                        categoryName: $("#createUpdateCategoryNameField").val(),
                        image : image
                    },
                    success: (category) =>{
                        $(".categoriesList").append(new Option(category.categoryName,category.categoryName));//add category to categories selects on html
                        $("#createUpdateCategorySuccess strong").text("Category created succesfuly!");
                        //reset category fields
                        $("#createUpdateCategorySuccess").prop("hidden",false);
                        setTimeout(() => {
                            $("#createUpdateCategorySuccess").prop("hidden",true);
                        },3000);
                        resetCategoryFields();
                    },
                    error: () =>{
                        $("#createUpdateCategoryError").text("An error occurred while trying to create the category");
                        $("#createUpdateCategoryAlert").prop("hidden",false);;
                        setTimeout(() => {
                            $("#createUpdateCategoryAlert").prop("hidden",true);;
                        },3000);
                    }
                })
            })
            
            
        }
    })

    $("#updateCategorySubmit").click(function(){//update category
        if(!categoryNameValidate()){//check validation
            $("#createUpdateCategoryAlert").prop("hidden",false);
            setTimeout(() => {
                $("#createUpdateCategoryAlert").prop("hidden",true);
            },4000);
        }
        else{//is valid
            var image;
            if($("#createUpdateCategoryImageField").val() === "0"){
                image = "";
            }
            else{
                image ="public/images/" + $("#createUpdateCategoryImageField").val();
            }
            $.ajax({//updating category
                url: "/adminPage/updateCategory/" + $("#createUpdateCategorySelectName").val(),
                type: "POST",
                data: {
                    newName: $("#createUpdateCategoryNameField").val(),
                    newImage: image
                },
                success: (category) => {
                    //removes previous name from category selects on html an add new name
                    $(".categoriesList option[value='" + $("#createUpdateCategorySelectName").val() + "']").each(function(){
                        $(this).remove();
                    });
                    $(".categoriesList").append(new Option(category.categoryName,category.categoryName));
                    $("#createUpdateCategorySuccess strong").text("Category updated succesfuly!");
                    $("#createUpdateCategorySuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateCategorySuccess").prop("hidden",true);
                    },3000);
                    //reset category fields
                    $("#createUpdateCategoryForm .form-control").each(function(){
                        $(this).prop("disabled",true);
                    });
                    $("#createUpdateCategoryImageField").prop("disabled",true);
                    resetCategoryFields();
                },
                error: () => {
                    $("#createUpdateCategoryError").text("An error occurred while trying to update the category");
                    $("#createUpdateCategoryAlert").prop("hidden",false);;
                    setTimeout(() => {
                        $("#createUpdateCategoryAlert").prop("hidden",true);;
                    },3000);
                }
            })
            
        }
    })

    $("#createUpdateProductButton").click(function(){//reset create update product offcanvas
        $("#createUpdateProductActionType").val("0");
        $("#createUpdateProductActionType").change()
    })

    $("#createUpdateProductActionType").change(function(){//changes product action from no action,create,update
        var action = $(this).val();
        resetCreateProductFields();
        if (action === "0") {//no action
            $("#createUpdateProductInfo").prop("hidden", true);//hiding product fields
        } else {
            getCategories();
            getImages();
            if (action === "Create") {//create
                //reset category select field
                $("#createUpdateProductCategoryField").val("0");
                $("#createUpdateProductCategoryField").change();
                $("#createUpdateProductInfo").prop("hidden",false);//show product fields
                $("#createUpdateProductSelectName").prop("hidden",true);//dont need product name select for create
                $("#createProductSubmit").prop("hidden",false);
                $("#updateProductSubmit").prop("hidden",true);
                //enabling product fields
                $("#createUpdateProductForm .form-control").each(function(){ 
                    $(this).prop("disabled",false);
                });
                $("#createUpdateProductHotField").prop("disabled",false);
                $("#createUpdateProductImageField").prop("disabled",false);
            } else {//update
                //reset category select field
                $("#createUpdateProductCategoryField").val("0");
                $("#createUpdateProductCategoryField").change();
                $("#createUpdateProductInfo").prop("hidden",false);//show product fields
                $("#createUpdateProductSelectName").prop("hidden",false);//need product name select for update
                $("#createProductSubmit").prop("hidden",true);
                $("#updateProductSubmit").prop("hidden",false);
                //disable product fields
                $("#createUpdateProductForm .form-control").each(function(){
                    $(this).prop("disabled",true);
                });
                $("#createUpdateProductHotField").prop("disabled",true);
                $("#createUpdateProductImageField").prop("disabled",true);
            }
        }
    })

    $("#createUpdateProductCategoryField").change(function() {//change category name select
        category = $(this).val();
        if($("#createUpdateProductActionType").val() !== "Create"){//change from category to default option does not affect create
            if (category === "0") {//picked default option
                //reset product name select
                $("#createUpdateProductSelectName").prop("disabled", true);
                $("#createUpdateProductSelectName").empty();
                $("#createUpdateProductSelectName").append(new Option("Product", "0"));
                $("#createUpdateProductSelectName").change();
            } else {//picked a category
                //reset product name select and fills the select with products of the category
                $("#createUpdateProductSelectName").val("0");
                $("#createUpdateProductSelectName").change();
                getProducts(category,$("#createUpdateProductSelectName"));
            }
        }
    });

    $("#createUpdateProductSelectName").change(function() {//changes product name select
        product = $(this).val();
        category = $("#createUpdateProductCategoryField").val();
        if (product === "0") {//picked default product name
            //disable and reset product fields
            $("#createUpdateProductForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            $("#createUpdateProductHotField").prop("disabled",true);
            $("#createUpdateProductImageField").prop("disabled",true);
            resetCreateProductFields();
            $("#createUpdateProductCategoryField").val(category);
        } else {//picked product
            //enable product fields
            $("#createUpdateProductForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $("#createUpdateProductHotField").prop("disabled",false);
            $("#createUpdateProductImageField").prop("disabled",false);
            $.ajax({//get product information and fill the product fields with the information
                url:"/adminPage/" + $("#createUpdateProductCategoryField").val() + "/" + $("#createUpdateProductSelectName").val().split("Id:")[1],
                type: "GET",
            }).done((product) => {fillProductFields(product);})
        }
    });


    $("#createProductSubmit").click(function(){//create product
        //validate fields
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate() 
        || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
            $("#createUpdateProductAlert").prop("hidden",false);
                setTimeout(() => {
                    $("#createUpdateProductAlert").prop("hidden",true);
                },3000);
        }
        else{//is valid 
            var productHot = $("#createUpdateProductHotField").val();
            if(productHot === "0" || productHot === "No"){
                productHot = false;
            }
            else
                productHot = true;
            var image;
            if($("#createUpdateProductImageField").val() === "0"){
                image = "";
            }
            else{
                image ="public/images/" + $("#createUpdateProductImageField").val();
            }
            $.ajax({//create product
                url: "/adminPage/createProduct",
                type: "POST",
                data: { 
                    Id: $("#createUpdateProductIdField").val(), 
                    categoryName: $("#createUpdateProductCategoryField").val(),
                    productName: $("#createUpdateProductNameField").val(),
                    color: $("#createUpdateProductColorField").val(),
                    size: $("#createUpdateProductSizeField").val(),
                    image: image,
                    description: $("#createUpdateProductDescField").val(),
                    price: $("#createUpdateProductPriceField").val(),
                    amount: $("#createUpdateProductAmountField").val(),
                    brand: $("#createUpdateProductBrandField").val(),
                    hot: productHot
                },
                success: (product) =>{
                    $("#createUpdateProductSuccess strong").text("product created succesfuly!")
                    $("#createUpdateProductSuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateProductSuccess").prop("hidden",true);
                    },3000);
                    resetCreateProductFields();
                    socket.emit('add product',product);//sends message so the server will send everyone about the product

                },
                error: () =>{
                    $("#createUpdateProductError").text("An error occurred while trying to create the product");
                    $("#createUpdateProductAlert").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateProductAlert").prop("hidden",true);
                    },3000);
                }
            })
            
            
        }
    })

    $("#updateProductSubmit").click(function(){//update product
        //validate product fields
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate()
        || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
            $("#createUpdateProductAlert").prop("hidden",false);
                setTimeout(() => {
                    $("#createUpdateProductAlert").prop("hidden",true);
                },3000);
        }
        else{//is valid
            var productHot = $("#createUpdateProductHotField").val();
            if(productHot === "0" || productHot === "No"){
                productHot = false;
            }
            else
                productHot = true;
            var image;
            if($("#createUpdateProductImageField").val() === "0"){
                image = "";
            }
            else{
                image ="public/images/" + $("#createUpdateProductImageField").val();
            }
            $.ajax({//update product
                url: "/adminPage/updateProduct/" + $("#createUpdateProductCategoryField").val() + "/" + $("#createUpdateProductSelectName").val().split("Id:")[1],
                type: "POST",
                data: { 
                    newName: $("#createUpdateProductNameField").val(),
                    newId: $("#createUpdateProductIdField").val(),
                    newColor: $("#createUpdateProductColorField").val(),
                    newSize: $("#createUpdateProductSizeField").val(),
                    newImage: image,
                    newDescription: $("#createUpdateProductDescField").val(),
                    newPrice: $("#createUpdateProductPriceField").val(),
                    newAmount: $("#createUpdateProductAmountField").val(),
                    newBrand: $("#createUpdateProductBrandField").val(),
                    newHot: productHot
                },
                success: () =>{
                    $("#createUpdateProductSuccess strong").text("product updated succesfuly!")
                    $("#createUpdateProductSuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateProductSuccess").prop("hidden",true);
                    },3000);
                    //disable product fields
                    $("#createUpdateProductForm .form-control").each(function(){
                        $(this).prop("disabled",true);
                    });
                    $("#createUpdateProductHotField").prop("disabled",true);
                    //resets product fields including name select
                    $("#createUpdateProductSelectName").val("0");
                    $("#createUpdateProductSelectName").prop("disabled",true);
                    resetCreateProductFields();
                },
                error: () =>{
                    $("#createUpdateProductError").text("An error occurred while trying to update the product");
                    $("#createUpdateProductAlert").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateProductAlert").prop("hidden",true);
                    },3000);
                }
            })
            
            
        }
    })

    $("#addProductAmountButton").click(function(){//reset add product amount offcanvas
        $("#addAmountCategoryField").val("0");
        $("#addAmountCategoryField").change()
    })

    $("#addAmountCategoryField").change(function() {//change category name select of addAmount
        category = $(this).val();
        
        if (category === "0") {//if default category
            //disable and reset product select
            $("#addAmountProductField").prop("disabled", true);
            $("#addAmountProductField").empty();
            $("#addAmountProductField").append(new Option("Product", "0"));
            $("#addAmountProductField").change();
        } else {
            //fill products from the category in product select
            getProducts(category,$("#addAmountProductField"));
        }
    });

    $("#addAmountProductField").change(function() {//products name select of addAmount
        product = $(this).val();
        
        if (product === "0") {//if default product
            //disable and reset amount field, hide submit button
            $("#addAmountField").prop("disabled", true);
            $("#addAmountSubmit").prop("hidden", true);
            $("#addAmountField").val("");
        } else {//product selected
            //enable amount field and show submit button
            $("#addAmountField").prop("disabled", false);
            $("#addAmountSubmit").prop("hidden", false);

        }
    });

    $("#addAmountSubmit").click(function(){//add amount to product
        if(!addAmountValidate()){//validate amount field
            $("#addAmountAlert").prop("hidden", false);
            setTimeout(() => {
                $("#addAmountAlert").prop("hidden", true);
            },3000);
        }
        else{//is valid
            $.ajax({//add amount
                url: "/adminPage/addProductAmount/" + $("#addAmountProductField").val().split('Id:')[1],
                type: "POST",
                data: {
                    categoryName: $("#addAmountCategoryField").val(),
                    amount: $("#addAmountField").val()
                },
                success: (product) => {
                    $("#addAmountSuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#addAmountSuccess").prop("hidden",true);
                    },3000);
                    //if amount of product was 0 send message to server of restock
                    if(product.amount === parseInt($("#addAmountField").val())){
                        socket.emit('product restock',product);
                    }
                    //reset amount field
                    $("#addAmountCategoryField").val("0");
                    $("#addAmountCategoryField").change();
                },
                error: () => {
                    $("#addAmountError").text("An error occurred while trying to create the product");
                    $("#addAmountAlert").prop("hidden", false);
                    setTimeout(() => {
                        $("#addAmountAlert").prop("hidden", true);
                    },3000);
                }
            })
        } 

    })
})


    //================== Functions =============================

    //checking if name is valid
    function categoryNameValidate(){
        if($("#createUpdateCategoryNameField").val().length === 0){
            $("#createUpdateCategoryError").text("Name field is empty");
            return false;
        }
        return true;
    }

    //filling the category fields according to the category details given
    function fillCategoryFields(categoryDetails){
        $("#createUpdateCategoryNameField").val(categoryDetails.categoryName);
        if(categoryDetails.image === ""){
            $("#createUpdateCategoryImageField").val("0");
        }
        else
            $("#createUpdateCategoryImageField").val(categoryDetails.image.split('images/')[1]);
    }

    //reseting the category fields
    function resetCategoryFields(){
        $("#createUpdateCategoryNameField").val("");
        $("#createUpdateCategoryImageField").val("0");
    }

    //checking if product id is valid
    function productIdValidate(){
        if($("#createUpdateProductIdField").val().length == 0){
            $("#createUpdateProductError").text("Id field is empty");
            return false;
        }
        var number = +($("#createUpdateProductIdField").val());//trying to convert to a number
        if(number <= 0){
            $("#createUpdateProductError").text("Id is not a positive number");
            return false;
        }
        if(!number){//failed to convert
            $("#createUpdateProductError").text("Id is not a number");
            return false;
        }
        else if(number % 1 != 0){//checking if it is a whole number
            $("#createUpdateProductError").text("Number is not a whole number");
            return false;
        }
        var boolean = true;
        //checking if a product with the same id exists
        $.ajax({//getting all categorys
            url: "/adminPage/getCategorys",
            async: false,//async false because cant continue creating/updating before checking this
            type: "GET",
            success: function(data) {
                data.forEach((category)=>{
                    $.ajax({//checking for each product of the category
                        url:"/adminPage/" + category.categoryName + "/" + $("#createUpdateProductIdField").val(),
                        async: false,//async false because cant continue creating/updating before checking this
                        type: "GET",
                        success: (data) => {
                            //if we are in update mode than need to check if found an id different than the previous id of the product
                            if(data.id !== parseInt($("#createUpdateProductSelectName").val().split("Id:")[1])){
                                $("#createUpdateProductError").text("Product with the same id already exists");
                                boolean = false;//found a product with the same id
                            }
                        }
                    });
                })
            },
            error: function() {
                alert("An error occurred while trying to fetch categories");
            }
        });
        return boolean;
    }

    //checking if product name is valid
    function productNameValidate(){
        if($("#createUpdateProductNameField").val().length === 0){
            $("#createUpdateProductError").text("Name field is empty");
            return false;
        }   
        return true;
    }

    //checking if product category name is valid
    function productCategoryValidate(){
        if($("#createUpdateProductCategoryField").val() === "0"){
            $("#createUpdateProductError").text("Category hasn't been chosen");
            return false;
        }
        return true;
    }

    //checking if product color is valid
    function productColorValidate(){
        if($("#createUpdateProductColorField").val().length === 0){
            $("#createUpdateProductError").text("Color field is empty");
            return false;
        }
        return true;
    }

    //checking if product size is valid
    function productSizeValidate(){
        if($("#createUpdateProductSizeField").val().length === 0){
            $("#createUpdateProductError").text("Size field is empty");
            return false;
        }
        if(!isNumeric($("#createUpdateProductSizeField").val())){//checking if size is a number
            $("#createUpdateProductError").text("Size field is invalid");
            return false;
        }
        return true;
    }

    //checking if product description is valid
    function productDescValidate(){
        if($("#createUpdateProductDescField").val().length === 0){
            $("#createUpdateProductError").text("Description field is empty");
            return false;
        }   
        return true;
    }

    //checking if product price is valid
    function productPriceValidate(){
        if($("#createUpdateProductPriceField").val().length === 0){
            $("#createUpdateProductError").text("Price field is empty");
            return false;
        }
        if(!isNumeric($("#createUpdateProductPriceField").val())){//cheking if price is a number
            $("#createUpdateProductError").text("Price field is invalid");
            return false;
        }
        return true;
    }

    //checking if product amount is valid
    function productAmountValidate(){
        if($("#createUpdateProductAmountField").val().length === 0){
            $("#createUpdateProductError").text("Amount field is empty");
            return false;
        }
        var number = +($("#createUpdateProductAmountField").val());//trying to convert to a number
        if(number <= 0){
            $("#createUpdateProductError").text("Amount is not a positive number");
            return false;
        }
        else if(!number){
            $("#createUpdateProductError").text("Amount is not a number");
            return false;
        }
        else if(number % 1 != 0){//checking if it is a whole number
            $("#createUpdateProductError").text("Number is not a whole number");
            return false;
        }
        return true;
    }

    //checking if product brand is valid
    function productBrandValidate(){
        if($("#createUpdateProductBrandField").val().length === 0){
            $("#createUpdateProductError").text("Brand field is empty");
            return false;
        }   
        return true;
    }

    //filling the product fields according to the product given
    function fillProductFields(product){
        $("#createUpdateProductIdField").val(product.id);
        $("#createUpdateProductNameField").val(product.name);
        $("#createUpdateProductColorField").val(product.color);
        
        if(product.image[0] === "")
            $("#createUpdateProductImageField").val("0");
        else
            $("#createUpdateProductImageField").val(product.image[0].split('images/')[1]);
        if(product.hot)
            $("#createUpdateProductHotField").val("Yes");
        else
            $("#createUpdateProductHotField").val("No");
        $("#createUpdateProductSizeField").val(product.size.$numberDecimal);
        $("#createUpdateProductDescField").val(product.description);
        $("#createUpdateProductPriceField").val(product.price.$numberDecimal);
        $("#createUpdateProductAmountField").val(product.amount);
        $("#createUpdateProductBrandField").val(product.brand);
    }

    //reseting the product fields
    function resetCreateProductFields(){
        $("#createUpdateProductIdField").val("");
        $("#createUpdateProductNameField").val("");
        $("#createUpdateProductCategoryField").val("0");
        $("#createUpdateProductColorField").val("");
        $("#createUpdateProductImageField").val("0");
        $("#createUpdateProductHotField").val("0");
        $("#createUpdateProductSizeField").val("");
        $("#createUpdateProductDescField").val("");
        $("#createUpdateProductPriceField").val("");
        $("#createUpdateProductAmountField").val("");
        $("#createUpdateProductBrandField").val("");
    }

    //check the amount is valid
    function addAmountValidate(){
        var amount = $("#addAmountField").val();
        if(amount.length === 0){
            $("#addAmountError").text("Amount field is empty");
            return false;
        }
        var number = +(amount);//trying to convert to a number
        if(number <= 0){
            $("#addAmountError").text("Amount is not a positive number");
            return false;
        }
        else if(!number){//failed to convert
            $("#addAmountError").text("Amount is not a number");
            return false;
        }
        else if(number % 1 != 0){//if not a whole number
            $("#addAmountError").text("Amount is not a whole number");
            return false;
        }
        return true;
    }

    //cheking if a value is a number,
    //check if it starts with a one or more digits '\d+' ,and optional '()' for having a dot '\.' and after one or more digits '\d+'
    function isNumeric(value){
        return /^\d+(\.\d+)?$/.test(value);
    }

    //gets category and product name field
    //it empties the field, gets all products in the category and fills the field with the products
    function getProducts(category,field){
        $.ajax({
            url: "/adminPage/getCategoryDetails/" + category,
            type: "GET",
            success: function(categoryDetails) {
                field.prop("disabled", false);//enables the option to choose product from field
                field.empty();//empty field
                field.append(new Option("Product", "0"));//add default option
                //adds products
                categoryDetails.products.forEach(product => {
                    field.append(new Option(product.name + ",Id:" +product.id,product.name + ",Id:" +product.id));
                });
            },
            error: function() {
                alert("An error occurred while trying to get category products");
            }
        });
    }

    function getImages(){
        $.ajax({
            url: "/adminPage/getAllImages",
            type:"GET",
        }).done((images)=>{
            images.sort();
            $(".imagesList").each(function(){
                $(this).empty();
                $(this).append(new Option("Image","0"));
                images.forEach((image) => $(this).append(new Option(image,image)));
                $(this).val("0");
            })
        })
    }

    function getCategories(){
        $.ajax({
            url: "/adminPage/getCategorys",
            type: "GET",
            success: function(categories) {
                categoryNames = [];
                categories.forEach((category)=> categoryNames.push(category.categoryName));
                categoryNames.sort();
                $(".categoriesList").each(function(){
                    $(this).empty();
                    $(this).append(new Option("Category","0"));
                    categoryNames.forEach((category) => $(this).append(new Option(category,category)));
                })
            },
            error: function() {
                alert("An error occurred while trying to fetch categories");
            }
        });
    }
