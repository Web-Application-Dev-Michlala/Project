var categories;
var currCategoryName;
var socket = io();

$(document).ready(function(){
    $.ajax({
        url: "/adminPage/getCategorys",
        type: "GET",
        success: function(data) {
            categories = data;
            categories.forEach((category) =>{
                $(".categoriesList").each(function(){
                    $(this).append(new Option(category.categoryName,category.categoryName));
                });
            });
        },
        error: function() {
            alert("An error occurred while trying to fetch categories");
        }
    });


    $("#createUpdateCategoryButton").click(function(){
        $("#createUpdateCategoryActionType").val("0");
        $("#createUpdateCategoryActionType").change();
    })

    $("#createUpdateCategoryActionType").change(function(){
        var action = $(this).val();
        resetCategoryFields();
        if (action === "0") {
            $("#createUpdateCategoryInfo").prop("hidden", true);
            $("#createUpdateCategorySelectName").val("0");
            $("#createUpdateCategorySelectName").change();
        } else if (action === "Create") {
            $("#createUpdateCategoryInfo").prop("hidden",false);
            $("#createUpdateCategorySelectName").prop("hidden",true);
            $("#createCategorySubmit").prop("hidden",false);
            $("#updateCategorySubmit").prop("hidden",true);
            $("#createUpdateCategorySelectName").val("0");
            $("#createUpdateCategorySelectName").change();
            $("#createUpdateCategoryForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
        } else {
            $("#createUpdateCategoryInfo").prop("hidden",false);
            $("#createUpdateCategorySelectName").prop("hidden",false);
            $("#createCategorySubmit").prop("hidden",true);
            $("#updateCategorySubmit").prop("hidden",false);
            $("#createUpdateCategoryForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
        }
    })

    $("#createUpdateCategorySelectName").change(function(){
        var name = $(this).val();

        if(name === "0"){
            $("#createUpdateCategoryForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            resetCategoryFields();
        } else {
            $("#createUpdateCategoryForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $.ajax({
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

    $("#createCategorySubmit").click(function(){
       
        if(!categoryNameValidate() || !categoryImageValidate()){
            $("#createUpdateCategoryAlert").prop("hidden",false);;
            setTimeout(() => {
                $("#createUpdateCategoryAlert").prop("hidden",true);;
            },3000);
        }
        else{
            $.ajax({
                url: "/adminPage/createCategory",
                type: "POST",
                data: {
                    categoryName: $("#createUpdateCategoryNameField").val(),
                    image : $("#createUpdateCategoryImageField").val()
                },
                success: (category) =>{
                    $(".categoriesList").append(new Option(category.categoryName,category.categoryName));
                    $("#createUpdateCategorySuccess strong").text("Category created succesfuly!");
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
            
            
        }
    })

    $("#updateCategorySubmit").click(function(){
        if(!categoryNameValidate() || !categoryImageValidate()){
            $("#createUpdateCategoryAlert").prop("hidden",false);
            setTimeout(() => {
                $("#createUpdateCategoryAlert").prop("hidden",true);
            },4000);
        }
        else{
            $.ajax({
                url: "/adminPage/updateCategory/" + currCategoryName,
                type: "POST",
                data: {
                    newName: $("#createUpdateCategoryNameField").val(),
                    newImage: $("#createUpdateCategoryImageField").val()
                },
                success: (category) => {
                    $(".categoriesList option[value='" + currCategoryName + "']").each(function(){
                        $(this).remove();
                    });
                    $(".categoriesList").append(new Option(category.categoryName,category.categoryName));
                    $("#createUpdateCategorySuccess strong").text("Category updated succesfuly!");
                    $("#createUpdateCategorySuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createUpdateCategorySuccess").prop("hidden",true);
                    },3000);
                    $("#createUpdateCategoryForm .form-control").each(function(){
                        $(this).prop("disabled",true);
                    });
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

    $("#createUpdateProductButton").click(function(){
        $("#createUpdateProductActionType").val("0");
        $("#createUpdateProductActionType").change()
    })

    $("#createUpdateProductActionType").change(function(){
        var action = $(this).val();
        $("#createUpdateProductCategoryField").val("0");
        $("#createUpdateProductCategoryField").change();
        resetCreateProductFields();
        if (action === "0") {
            $("#createUpdateProductInfo").prop("hidden", true);
        } else if (action === "Create") {
            $("#createUpdateProductInfo").prop("hidden",false);
            $("#createUpdateProductSelectName").prop("hidden",true);
            $("#createProductSubmit").prop("hidden",false);
            $("#updateProductSubmit").prop("hidden",true);
            $("#createUpdateProductForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $("#createUpdateProductHotField").prop("disabled",false);
        } else {
            $("#createUpdateProductInfo").prop("hidden",false);
            $("#createUpdateProductSelectName").prop("hidden",false);
            $("#createProductSubmit").prop("hidden",true);
            $("#updateProductSubmit").prop("hidden",false);
            $("#createUpdateProductForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            $("#createUpdateProductHotField").prop("disabled",true);
        }
    })

    $("#createUpdateProductCategoryField").change(function() {
        category = $(this).val();
        if($("#createUpdateProductActionType").val() !== "Create"){
            if (category === "0") {
                $("#createUpdateProductSelectName").prop("disabled", true);
                $("#createUpdateProductSelectName").empty();
                $("#createUpdateProductSelectName").append(new Option("Product", "0"));
                $("#createUpdateProductSelectName").change();
            } else {
                $("#createUpdateProductSelectName").val("0");
                $("#createUpdateProductSelectName").change();
                getProducts(category,$("#createUpdateProductSelectName"));
            }
        }
    });

    $("#createUpdateProductSelectName").change(function() {
        product = $(this).val();
        category = $("#createUpdateProductCategoryField").val();
        if (product === "0") {
            $("#createUpdateProductForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            $("#createUpdateProductHotField").prop("disabled",true);
            resetCreateProductFields();
            $("#createUpdateProductCategoryField").val(category);
        } else {
            $("#createUpdateProductForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $("#createUpdateProductHotField").prop("disabled",false);
            $.ajax({
                url:"/adminPage/" + $("#createUpdateProductCategoryField").val() + "/" + $("#createUpdateProductSelectName").val().split("Id:")[1],
                type: "GET",
            }).done((product) => {fillProductFields(product);})
        }
    });


    $("#createProductSubmit").click(function(){
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate()
        || !productImageValidate() || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
            $("#createUpdateProductAlert").prop("hidden",false);
                setTimeout(() => {
                    $("#createUpdateProductAlert").prop("hidden",true);
                },3000);
        }
        else{
            var productHot = $("#createUpdateProductHotField").val();
            if(productHot === "0" || productHot === "No"){
                productHot = false;
            }
            else {
                productHot = true;
            }
            
            $.ajax({
                url: "/adminPage/createProduct",
                type: "POST",
                data: { 
                    Id: $("#createUpdateProductIdField").val(), 
                    categoryName: $("#createUpdateProductCategoryField").val(),
                    productName: $("#createUpdateProductNameField").val(),
                    color: $("#createUpdateProductColorField").val(),
                    size: $("#createUpdateProductSizeField").val(),
                    image: $("#createUpdateProductImageField").val(),
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
                    socket.emit('add product',product);

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

    $("#updateProductSubmit").click(function(){
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate()
        || !productImageValidate() || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
            $("#createUpdateProductAlert").prop("hidden",false);
                setTimeout(() => {
                    $("#createUpdateProductAlert").prop("hidden",true);
                },3000);
        }
        else{
            var productHot = $("#createUpdateProductHotField").val();
            if(productHot === "0" || productHot === "No"){
                productHot = false;
            }
            else {
                productHot = true;
            }
            
            $.ajax({
                url: "/adminPage/updateProduct/" + $("#createUpdateProductCategoryField").val() + "/" + $("#createUpdateProductSelectName").val().split("Id:")[1],
                type: "POST",
                data: { 
                    newName: $("#createUpdateProductNameField").val(),
                    newId: $("#createUpdateProductIdField").val(),
                    newColor: $("#createUpdateProductColorField").val(),
                    newSize: $("#createUpdateProductSizeField").val(),
                    newImage: $("#createUpdateProductImageField").val(),
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
                    $("#createUpdateProductForm .form-control").each(function(){
                        $(this).prop("disabled",true);
                    });
                    $("#createUpdateProductHotField").prop("disabled",true);
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

    $("#addProductAmountButton").click(function(){
        $("#addAmountCategoryField").val("0");
        $("#addAmountCategoryField").change()
    })

    $("#addAmountCategoryField").change(function() {
        category = $(this).val();
        
        if (category === "0") {
            $("#addAmountProductField").prop("disabled", true);
            $("#addAmountProductField").empty();
            $("#addAmountProductField").append(new Option("Product", "0"));
            $("#addAmountProductField").change();
        } else {
            getProducts(category,$("#addAmountProductField"));
        }
    });

    $("#addAmountProductField").change(function() {
        product = $(this).val();
        
        if (product === "0") {
            $("#addAmountField").prop("disabled", true);
            $("#addAmountSubmit").prop("hidden", true);
            $("#addAmountField").val("");
        } else {
            $("#addAmountField").prop("disabled", false);
            $("#addAmountSubmit").prop("hidden", false);

        }
    });

    $("#addAmountSubmit").click(function(){
        if(!addAmountValidate()){
            $("#addAmountAlert").prop("hidden", false);
            setTimeout(() => {
                $("#addAmountAlert").prop("hidden", true);
            },3000);
        }
        else{
            $.ajax({
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
                    if(product.amount === parseInt($("#addAmountField").val())){
                        socket.emit('product restock',product);
                    }
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

    function categoryNameValidate(){
        if($("#createUpdateCategoryNameField").val().length === 0){
            $("#createUpdateCategoryError").text("Name field is empty");
            return false;
        }
        var boolean = true;
        $.ajax({
            url: "/adminPage/" + $("#createUpdateCategoryNameField").val(),
            async:false,
            type: "GET",
            success: (data) => {
                if(data.categoryName !== $("#createUpdateCategorySelectName").val()){
                    $("#createUpdateCategoryError").text("Category with this name already exists");
                    boolean =  false;
                }
            }
        }); 
        return boolean;
    }

    function categoryImageValidate(){ //check if image is in path instead
        if($("#createUpdateCategoryImageField").val().length != 0){
            var linkParts = $("#createUpdateCategoryImageField").val().split('/');
            if(linkParts.length != 3 || linkParts[0] != "public" || linkParts[1] != "images"){
                $("#createUpdateCategoryError").text("Image field is invalid");
                return false;
            }
            var imageParts = linkParts[2].split('.');
            if(!(imageParts[1] == "jpg" || imageParts[1] == "png")){
                $("#createUpdateCategoryError").text("Image field is invalid");
                return false;
            }
        }
        return true;
    }

    function fillCategoryFields(categoryDetails){
        $("#createUpdateCategoryNameField").val(categoryDetails.categoryName);
        $("#createUpdateCategoryImageField").val(categoryDetails.image);
    }

    function resetCategoryFields(){
        $("#createUpdateCategoryNameField").val("");
        $("#createUpdateCategoryImageField").val("");
    }

    function productIdValidate(){
        if($("#createUpdateProductIdField").val().length == 0){
            $("#createUpdateProductError").text("Id field is empty");
            return false;
        }
        var number = +($("#createUpdateProductIdField").val());
        if(!number){
            $("#createUpdateProductError").text("Id is not a number");
            return false;
        }
        if(number <= 0){
            $("#createUpdateProductError").text("Id is not a positive number");
            return false;
        }
        var boolean = true;
        categories.forEach((category)=>{
            $.ajax({
                url:"/adminPage/" + category.categoryName + "/" + $("#createUpdateProductIdField").val(),
                async: false,
                type: "GET",
                success: (data) => {
                    if(data.id !== parseInt($("#createUpdateProductSelectName").val().split("Id:")[1])){
                        $("#createUpdateProductError").text("Product with the same id already exists");
                        boolean = false;
                    }
                }
            });
        })
        return boolean;
    }

    function productNameValidate(){
        if($("#createUpdateProductNameField").val().length === 0){
            $("#createUpdateProductError").text("Name field is empty");
            return false;
        }   
        return true;
    }

    function productCategoryValidate(){
        if($("#createUpdateProductCategoryField").val() === "0"){
            $("#createUpdateProductError").text("Category hasn't been chosen");
            return false;
        }
        return true;
    }

    function productColorValidate(){
        if($("#createUpdateProductColorField").val().length === 0){
            $("#createUpdateProductError").text("Color field is empty");
            return false;
        }
        return true;
    }

    function productImageValidate(){
        if($("#createUpdateProductImageField").val().length != 0){
            var linkParts = $("#createUpdateProductImageField").val().split('/');
            if(linkParts.length != 3 || linkParts[0] != "public" || linkParts[1] != "images"){
                $("#createUpdateProductError").text("Image field is invalid");
                return false;
            }
            var imageParts = linkParts[2].split('.');
            if(!(imageParts[1] === "jpg" || imageParts[1] === "png")){
                $("#createUpdateProductError").text("Image field is invalid");
                return false;
            }
            const image = new Image();
            image.src ="/" + $("#createUpdateProductImageField").val();
            if(image.complete){
                return true;
            }
            image.onload = () => {
                return true;
            }
            image.onerror = () => {
                return false;
            }
        }
        return true;
    }

    function productSizeValidate(){
        if($("#createUpdateProductSizeField").val().length === 0){
            $("#createUpdateProductError").text("Size field is empty");
            return false;
        }
        if(!isNumeric($("#createUpdateProductSizeField").val())){
            $("#createUpdateProductError").text("Size field is invalid");
            return false;
        }
        return true;
    }

    function productDescValidate(){
        if($("#createUpdateProductDescField").val().length === 0){
            $("#createUpdateProductError").text("Description field is empty");
            return false;
        }   
        return true;
    }

    function productPriceValidate(){
        if($("#createUpdateProductPriceField").val().length === 0){
            $("#createUpdateProductError").text("Price field is empty");
            return false;
        }
        if(!isNumeric($("#createUpdateProductPriceField").val())){
            $("#createUpdateProductError").text("Price field is invalid");
            return false;
        }
        return true;
    }

    function productAmountValidate(){
        if($("#createUpdateProductAmountField").val().length === 0){
            $("#createUpdateProductError").text("Amount field is empty");
            return false;
        }
        var number = +($("#createUpdateProductAmountField").val());
        if(number <= 0){
            $("#createUpdateProductError").text("Amount is not a positive number");
            return false;
        }
        else if(!number){
            $("#createUpdateProductError").text("Amount is not a number");
            return false;
        }
        else if(number % 1 != 0){
            $("#createUpdateProductError").text("Number is not a whole number");
            return false;
        }
        return true;
    }

    function productBrandValidate(){
        if($("#createUpdateProductBrandField").val().length === 0){
            $("#createUpdateProductError").text("Brand field is empty");
            return false;
        }   
        return true;
    }

    function fillProductFields(product){
        $("#createUpdateProductIdField").val(product.id);
        $("#createUpdateProductNameField").val(product.name);
        $("#createUpdateProductColorField").val(product.color);
        $("#createUpdateProductImageField").val(product.image);
        $("#createUpdateProductSizeField").val(product.size.$numberDecimal);
        if(product.hot)
            $("#createUpdateProductHotField").val("Yes");
        else
            $("#createUpdateProductHotField").val("No");
        $("#createUpdateProductDescField").val(product.description);
        $("#createUpdateProductPriceField").val(product.price.$numberDecimal);
        $("#createUpdateProductAmountField").val(product.amount);
        $("#createUpdateProductBrandField").val(product.brand);
    }

    function resetCreateProductFields(){
        $("#createUpdateProductIdField").val("");
        $("#createUpdateProductNameField").val("");
        $("#createUpdateProductCategoryField").val("0");
        $("#createUpdateProductColorField").val("");
        $("#createUpdateProductImageField").val("");
        $("#createUpdateProductSizeField").val("");
        $("#createUpdateProductHotField").val("0");
        $("#createUpdateProductDescField").val("");
        $("#createUpdateProductPriceField").val("");
        $("#createUpdateProductAmountField").val("");
        $("#createUpdateProductBrandField").val("");
    }

    function addAmountValidate(){
        var amount = $("#addAmountField").val();
        if(amount.length === 0){
            $("#addAmountError").text("Amount field is empty");
            return false;
        }
        var number = +(amount);
        if(number <= 0){
            $("#addAmountError").text("Amount is not a positive number");
            return false;
        }
        else if(!number){
            $("#addAmountError").text("Amount is not a number");
            return false;
        }
        else if(number % 1 != 0){
            $("#addAmountError").text("Amount is not a whole number");
            return false;
        }
        return true;
    }

    function isNumeric(value){
        return /^\d+(\.\d+)?$/.test(value);
    }

    function getProducts(category,field){
        $.ajax({
            url: "/adminPage/getCategoryDetails/" + category,
            type: "GET",
            success: function(categoryDetails) {
                field.prop("disabled", false);
                field.empty();
                field.append(new Option("Product", "0"));
                
                categoryDetails.products.forEach(product => {
                    field.append(new Option(product.name + ",Id:" +product.id,product.name + ",Id:" +product.id));
                });
            },
            error: function() {
                alert("An error occurred while trying to get category products");
            }
        });
    }
