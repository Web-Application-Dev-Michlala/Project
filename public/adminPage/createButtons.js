var categories;
var currCategoryName;

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

    $("#categoryActionType").change(function(){
        var action = $(this).val();
        resetCategoryFields();
        if (action === "0") {
            $("#categoryInfo").prop("hidden", true);
            $("#categorySelectName").val("0");
            $("#categorySelectName").change();
        } else if (action === "Create") {
            $("#categoryInfo").prop("hidden",false);
            $("#categorySelectName").prop("hidden",true);
            $("#createCategorySubmit").prop("hidden",false);
            $("#updateCategorySubmit").prop("hidden",true);
            $("#categorySelectName").val("0");
            $("#categorySelectName").change();
            $("#createCategoryForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
        } else {
            $("#categoryInfo").prop("hidden",false);
            $("#categorySelectName").prop("hidden",false);
            $("#createCategorySubmit").prop("hidden",true);
            $("#updateCategorySubmit").prop("hidden",false);
            $("#createCategoryForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
        }
    })

    $("#categorySelectName").change(function(){
        var name = $(this).val();

        if(name === "0"){
            $("#createCategoryForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            resetCategoryFields();
        } else {
            $("#createCategoryForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $.ajax({
                url: "/adminPage/getCategoryDetails/" + $("#categorySelectName").val(),
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
            $("#createCategoryAlert").prop("hidden",false);;
            setTimeout(() => {
                $("#createCategoryAlert").prop("hidden",true);;
            },3000);
        }
        else{
            $.ajax({
                url: "/adminPage/createCategory",
                type: "POST",
                data: {
                    categoryName: $("#categoryNameField").val(),
                    image : $("#categoryImageField").val()
                },
                success: (category) =>{
                    $(".categoriesList").append(new Option(category.categoryName,category.categoryName));
                    $("#createCategorySuccess strong").text("Category created succesfuly!");
                    $("#createCategorySuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createCategorySuccess").prop("hidden",true);
                    },3000);
                    resetCategoryFields();
                },
                error: () =>{
                    $("#createCategoryError").text("An error occurred while trying to create the category");
                    $("#createCategoryAlert").prop("hidden",false);;
                    setTimeout(() => {
                        $("#createCategoryAlert").prop("hidden",true);;
                    },3000);
                }
            })
            
            
        }
    })

    $("#updateCategorySubmit").click(function(){
        if(!categoryNameValidate() || !categoryImageValidate()){
            $("#createCategoryAlert").prop("hidden",false);
            setTimeout(() => {
                $("#createCategoryAlert").prop("hidden",true);
            },4000);
        }
        else{
            $.ajax({
                url: "/adminPage/updateCategory/" + currCategoryName,
                type: "POST",
                data: {
                    newName: $("#categoryNameField").val(),
                    newImage: $("#categoryImageField").val()
                },
                success: (category) => {
                    $(".categoriesList option[value='" + currCategoryName + "']").each(function(){
                        $(this).remove();
                    });
                    $(".categoriesList").append(new Option(category.categoryName,category.categoryName));
                    $("#createCategorySuccess strong").text("Category updated succesfuly!");
                    $("#createCategorySuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createCategorySuccess").prop("hidden",true);
                    },3000);
                    $("#createCategoryForm .form-control").each(function(){
                        $(this).prop("disabled",true);
                    });
                    resetCategoryFields();
                },
                error: () => {
                    $("#createCategoryError").text("An error occurred while trying to update the category");
                    $("#createCategoryAlert").prop("hidden",false);;
                    setTimeout(() => {
                        $("#createCategoryAlert").prop("hidden",true);;
                    },3000);
                }
            })
            
        }
    })

    $("#productActionType").change(function(){
        var action = $(this).val();
        $("#createProductCategoryField").val("0");
        $("#createProductCategoryField").change();
        resetCreateProductFields();
        if (action === "0") {
            $("#productInfo").prop("hidden", true);
        } else if (action === "Create") {
            $("#productInfo").prop("hidden",false);
            $("#productSelectName").prop("hidden",true);
            $("#createProductSubmit").prop("hidden",false);
            $("#updateProductSubmit").prop("hidden",true);
            $("#createProductForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $("#productHotField").prop("disabled",false);
        } else {
            $("#productInfo").prop("hidden",false);
            $("#productSelectName").prop("hidden",false);
            $("#createProductSubmit").prop("hidden",true);
            $("#updateProductSubmit").prop("hidden",false);
            $("#createProductForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            $("#productHotField").prop("disabled",true);
        }
    })

    $("#createProductCategoryField").change(function() {
        category = $(this).val();
        if($("#productActionType").val() !== "Create"){
            if (category === "0") {
                $("#productSelectName").prop("disabled", true);
                $("#productSelectName").empty();
                $("#productSelectName").append(new Option("Product", "0"));
                $("#productSelectName").change();
            } else {
                $("#productSelectName").val("0");
                $("#productSelectName").change();
                getProducts(category,$("#productSelectName"));
            }
        }
    });

    $("#productSelectName").change(function() {
        product = $(this).val();
        category = $("#createProductCategoryField").val();
        if (product === "0") {
            $("#createProductForm .form-control").each(function(){
                $(this).prop("disabled",true);
            });
            $("#productHotField").prop("disabled",true);
            resetCreateProductFields();
            $("#createProductCategoryField").val(category);
        } else {
            $("#createProductForm .form-control").each(function(){
                $(this).prop("disabled",false);
            });
            $("#productHotField").prop("disabled",false);
            $.ajax({
                url:"/adminPage/" + $("#createProductCategoryField").val() + "/" + $("#productSelectName").val().split("Id:")[1],
                type: "GET",
            }).done((product) => {fillProductFields(product[0]);})
        }
    });


    $("#createProductSubmit").click(function(){
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate()
        || !productImageValidate() || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
            $("#createProductAlert").prop("hidden",false);
                setTimeout(() => {
                    $("#createProductAlert").prop("hidden",true);
                },3000);
        }
        else{
            var productHot = $("#productHotField").val();
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
                    Id: $("#productIdField").val(), 
                    categoryName: $("#createProductCategoryField").val(),
                    productName: $("#productNameField").val(),
                    color: $("#productColorField").val(),
                    size: $("#productSizeField").val(),
                    image: $("#productImageField").val(),
                    description: $("#productDescField").val(),
                    price: $("#productPriceField").val(),
                    amount: $("#productAmountField").val(),
                    brand: $("#productBrandField").val(),
                    hot: productHot
                },
                success: () =>{
                    $("#createProductSuccess strong").text("product created succesfuly!")
                    $("#createProductSuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createProductSuccess").prop("hidden",true);
                    },3000);
                    resetCreateProductFields();
                },
                error: () =>{
                    $("#createProductError").text("An error occurred while trying to create the product");
                    $("#createProductAlert").prop("hidden",false);
                    setTimeout(() => {
                        $("#createProductAlert").prop("hidden",true);
                    },3000);
                }
            })
            
        }
    })

    $("#updateProductSubmit").click(function(){
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate()
        || !productImageValidate() || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
            $("#createProductAlert").prop("hidden",false);
                setTimeout(() => {
                    $("#createProductAlert").prop("hidden",true);
                },3000);
        }
        else{
            var productHot = $("#productHotField").val();
            if(productHot === "0" || productHot === "No"){
                productHot = false;
            }
            else {
                productHot = true;
            }
            
            $.ajax({
                url: "/adminPage/updateProduct/" + $("#createProductCategoryField").val() + "/" + $("#productSelectName").val().split("Id:")[1],
                type: "POST",
                data: { 
                    newName: $("#productNameField").val(),
                    newId: $("#productIdField").val(),
                    newColor: $("#productColorField").val(),
                    newSize: $("#productSizeField").val(),
                    newImage: $("#productImageField").val(),
                    newDescription: $("#productDescField").val(),
                    newPrice: $("#productPriceField").val(),
                    newAmount: $("#productAmountField").val(),
                    newBrand: $("#productBrandField").val(),
                    newHot: productHot
                },
                success: () =>{
                    $("#createProductSuccess strong").text("product updated succesfuly!")
                    $("#createProductSuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#createProductSuccess").prop("hidden",true);
                    },3000);
                    $("#createProductForm .form-control").each(function(){
                        $(this).prop("disabled",true);
                    });
                    $("#productHotField").prop("disabled",true);
                    $("#productSelectName").val("0");
                    $("#productSelectName").prop("disabled",true);
                    resetCreateProductFields();
                },
                error: () =>{
                    $("#createProductError").text("An error occurred while trying to update the product");
                    $("#createProductAlert").prop("hidden",false);
                    setTimeout(() => {
                        $("#createProductAlert").prop("hidden",true);
                    },3000);
                }
            })
            
            
        }
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
                url: "/adminPage/addProductAmount/" + $("#addAmountProductField").val(),
                type: "POST",
                data: {
                    categoryName: $("#addAmountCategoryField").val(),
                    amount: $("#addAmountField").val()
                }
            }).done((is_success)=>{
                if(is_success){
                    $("#addAmountSuccess").prop("hidden",false);
                    setTimeout(() => {
                        $("#addAmountSuccess").prop("hidden",true);
                    },3000);
                    $("#addAmountCategoryField").val("0");
                    $("#addAmountCategoryField").change();
                }
                else{
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
        if($("#categoryNameField").val().length === 0){
            $("#createCategoryError").text("Name field is empty");
            return false;
        }
        var boolean = true;
        $.ajax({
            url: "/adminPage/" + $("#categoryNameField").val(),
            async:false,
            type: "GET",
            success: (data) => {
                if(data.categoryName !== $("#categorySelectName").val()){
                    $("#createCategoryError").text("Category with this name already exists");
                    boolean =  false;
                }
            }
        }); 
        return boolean;
    }

    function categoryImageValidate(){ //check if image is in path instead
        if($("#categoryImageField").val().length != 0){
            var linkParts = $("#categoryImageField").val().split('/');
            if(linkParts.length != 3 || linkParts[0] != "public" || linkParts[1] != "images"){
                $("#createCategoryError").text("Image field is invalid");
                return false;
            }
            var imageParts = linkParts[2].split('.');
            if(!(imageParts[1] == "jpg" || imageParts[1] == "png")){
                $("#createCategoryError").text("Image field is invalid");
                return false;
            }
        }
        return true;
    }

    function fillCategoryFields(categoryDetails){
        $("#categoryNameField").val(categoryDetails.categoryName);
        $("#categoryImageField").val(categoryDetails.image);
    }

    function resetCategoryFields(){
        $("#categoryNameField").val("");
        $("#categoryImageField").val("");
    }

    function productIdValidate(){
        if($("#productIdField").val().length == 0){
            $("#createProductError").text("Id field is empty");
            return false;
        }
        var number = +($("#productIdField").val());
        if(!number){
            $("#createProductError").text("Id is not a number");
            return false;
        }
        if(number <= 0){
            $("#createProductError").text("Id is not a positive number");
            return false;
        }
        var boolean = true;
        categories.forEach((category)=>{
            $.ajax({
                url:"/adminPage/" + category.categoryName + "/" + $("#productIdField").val(),
                async: false,
                type: "GET",
                success: (data) => {
                    if(data[0].id !== parseInt($("#productSelectName").val().split("Id:")[1])){
                        $("#createProductError").text("Product with the same id already exists");
                        boolean = false;
                    }
                }
            });
        })
        return boolean;
    }

    function productNameValidate(){
        if($("#productNameField").val().length == 0){
            $("#createProductError").text("Name field is empty");
            return false;
        }   
        return true;
    }

    function productCategoryValidate(){
        if($("#createProductCategoryField").val() == "0"){
            $("#createProductError").text("Category hasn't been chosen");
            return false;
        }
        return true;
    }

    function productColorValidate(){
        if($("#productColorField").val().length == 0){
            $("#createProductError").text("Color field is empty");
            return false;
        }
        return true;
    }

    function productImageValidate(){
        if($("#productImageField").val().length != 0){
            var linkParts = $("#productImageField").val().split('/');
            if(linkParts.length != 3 || linkParts[0] != "public" || linkParts[1] != "images"){
                $("#createProductError").text("Image field is invalid");
                return false;
            }
            var imageParts = linkParts[2].split('.');
            if(!(imageParts[1] == "jpg" || imageParts[1] == "png")){
                $("#createProductError").text("Image field is invalid");
                return false;
            }
        }
        return true;
    }

    function productSizeValidate(){
        if($("#productSizeField").val().length == 0){
            $("#createProductError").text("Size field is empty");
            return false;
        }
        if(!isNumeric($("#productSizeField").val())){
            $("#createProductError").text("Size field is invalid");
            return false;
        }
        return true;
    }

    function productDescValidate(){
        if($("#productDescField").val().length == 0){
            $("#createProductError").text("Description field is empty");
            return false;
        }   
        return true;
    }

    function productPriceValidate(){
        if($("#productPriceField").val().length == 0){
            $("#createProductError").text("Price field is empty");
            return false;
        }
        if(!isNumeric($("#productPriceField").val())){
            $("#createProductError").text("Price field is invalid");
            return false;
        }
        return true;
    }

    function productAmountValidate(){
        if($("#productAmountField").val().length == 0){
            $("#createProductError").text("Amount field is empty");
            return false;
        }
        var number = +($("#productAmountField").val());
        if(number <= 0){
            $("#createProductError").text("Amount is not a positive number");
            return false;
        }
        else if(!number){
            $("#createProductError").text("Amount is not a number");
            return false;
        }
        else if(number % 1 != 0){
            $("#createProductError").text("Number is not a whole number");
            return false;
        }
        return true;
    }

    function productBrandValidate(){
        if($("#productBrandField").val().length == 0){
            $("#createProductError").text("Brand field is empty");
            return false;
        }   
        return true;
    }

    function fillProductFields(product){
        $("#productIdField").val(product.id);
        $("#productNameField").val(product.name);
        $("#productColorField").val(product.color);
        $("#productImageField").val(product.image);
        $("#productSizeField").val(product.size.$numberDecimal);
        if(product.hot)
            $("#productHotField").val("Yes");
        else
            $("#productHotField").val("No");
        $("#productDescField").val(product.description);
        $("#productPriceField").val(product.price.$numberDecimal);
        $("#productAmountField").val(product.amount);
        $("#productBrandField").val(product.brand);
    }

    function resetCreateProductFields(){
        $("#productIdField").val("");
        $("#productNameField").val("");
        $("#createProductCategoryField").val("0");
        $("#productColorField").val("");
        $("#productImageField").val("");
        $("#productSizeField").val("");
        $("#productHotField").val("0");
        $("#productDescField").val("");
        $("#productPriceField").val("");
        $("#productAmountField").val("");
        $("#productBrandField").val("");
    }

    function addAmountValidate(){
        var amount = $("#addAmountField").val();
        if(amount.length == 0){
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
                    field.append(new Option(product.name + " , Id:" +product.id,product.name + " , Id:" +product.id));
                });
            },
            error: function() {
                alert("An error occurred while trying to get category products");
            }
        });
    }
