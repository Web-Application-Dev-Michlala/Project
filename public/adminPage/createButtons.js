var categories;

$(document).ready(function(){
    $.ajax({
        url: "/adminPage/getCategorys",
        type: "GET",
        success: function(data) {
            var categoryField =document.getElementById("productCategoryField");
            categories = data;
            categories.forEach((category) =>{
                const option = document.createElement("option");
                option.innerText = category.categoryName;
                categoryField.appendChild(option);
            });
        },
        error: function() {
            alert("An error occurred while trying to fetch categories");
        }
    });
    $("#createCategorySubmit").click(function(){
        var alertMessage = document.getElementById("createCategoryAlert");
        if(!alertMessage.classList.contains("d-none")){
            alertMessage.classList.add("d-none"); //cant use addClass
        }
        if(!categoryNameValidate() || !categoryImageValidate()){
            alertMessage.classList.remove("d-none");
            setTimeout(() => {
                alertMessage.classList.add("d-none");
            },4000);
        }
        else{
            var categoryName = document.getElementById("categoryNameField").value;
            var categoryImage = document.getElementById("categoryImageField").value;
            $.ajax({
                url: "/adminPage/createCategory",
                type: "POST",
                data: {
                    categoryName: categoryName,
                    image : categoryImage
                },
                success: () =>{
                    var successMessage = document.getElementById("createCategorySuccess");
                    successMessage.classList.remove("d-none");
                    setTimeout(() => {
                        successMessage.classList.add("d-none");
                    },3000);
                    resetCategoryFields();
                },
                error: () =>{
                    var errorMessage = document.getElementById("createCategoryError");
                    errorMessage.innerText = "An error occurred while trying to create the category";
                    alertMessage.classList.remove("d-none");
                    setTimeout(() => {
                        alertMessage.classList.add("d-none");
                    },3000);
                }
            })
            
            
        }
    })

    $("#createProductSubmit").click(function(){
        var alertMessage = document.getElementById("createProductAlert");
        if(!alertMessage.classList.contains("d-none")){
            alertMessage.classList.add("d-none");//cant use addClass
        }
        if(!productCategoryValidate() || !productNameValidate() || !productIdValidate() || !productColorValidate()
        || !productImageValidate() || !productSizeValidate() || !productDescValidate() || !productPriceValidate()
        || !productAmountValidate() || !productBrandValidate()){
                alertMessage.classList.remove("d-none");
                setTimeout(() => {
                    alertMessage.classList.add("d-none");
                },3000);
        }
        else{
            var productId = $("#productIdField").val();
            var productCategory = $("#productCategoryField").val();
            var productName = $("#productNameField").val();
            var productColor = $("#productColorField").val();
            var productSize = $("#productSizeField").val();
            var productImage = $("#productImageField").val();
            var productDesc = $("#productDescField").val();
            var productPrice = $("#productPriceField").val();
            var productAmount = $("#productAmountField").val();
            var productBrand = $("#productBrandField").val();
            var productHot = $("#productHotField").val();
            if(productHot == "0" || productHot == "No"){
                productHot = false;
            }
            else {
                productHot = true;
            }
            
            $.ajax({
                url: "/adminPage/createProduct",
                type: "POST",
                data: { 
                    Id: productId, 
                    categoryName: productCategory,
                    productName: productName,
                    color: productColor,
                    size: productSize,
                    image: productImage,
                    description: productDesc,
                    price: productPrice,
                    amount: productAmount,
                    brand: productBrand,
                    hot: productHot
                },
                success: () =>{
                    var successMessage = document.getElementById("createProductSuccess");
                    successMessage.classList.remove("d-none");
                    setTimeout(() => {
                        successMessage.classList.add("d-none");
                    },3000);
                    resetProductFields();
                },
                error: () =>{
                    var errorMessage = document.getElementById("createProductError");
                    errorMessage.innerText = "An error occurred while trying to create the product";
                    alertMessage.classList.remove("d-none");
                    setTimeout(() => {
                        alertMessage.classList.add("d-none");
                    },3000);
                }
            })
            
        }
    })
})


    //================== Functions =============================

    function categoryNameValidate(){
        var name = document.getElementById("categoryNameField");
        var errorMessage = document.getElementById("createCategoryError");
        if(name.value.length == 0){
            errorMessage.innerText = "Name field is empty";
            return false;
        }
        var boolean;
        $.ajax({
            url: "/adminPage/" + name.value,
            async:false,
            type: "GET",
            success: () => {
                errorMessage.innerText = "Category with this name already exists";
                boolean =  false;
            },
            error: () => {boolean = true;}
        }); 
        return boolean;
    }

    function categoryImageValidate(){ //check if image is in path instead
        var image = document.getElementById("categoryImageField");
        var errorMessage = document.getElementById("createCategoryError");
        if(image.value.length != 0){
            var linkParts = image.value.split('/');
            if(linkParts.length != 3 || linkParts[0] != "public" || linkParts[1] != "images"){
                errorMessage.innerText = "Image field is invalid";
                return false;
            }
            var imageParts = linkParts[2].split('.');
            if(!(imageParts[1] == "jpg" || imageParts[1] == "png")){
                errorMessage.innerText = "Image field is invalid";
                return false;
            }
        }
        return true;
    }

    function resetCategoryFields(){
        $("#categoryNameField").value = "";
        $("#categoryImageField").value = "";
    }

    function productIdValidate(){
        var id = document.getElementById("productIdField");
        var errorMessage = document.getElementById("createProductError");
        if(id.value.length == 0){
            errorMessage.innerText = "Id field is empty";
            return false;
        }
        var number = +(id.value);
        if(!number){
            errorMessage.innerText = "Id is not a number";
            return false;
        }
        if(number <= 0){
            errorMessage.innerText = "Id is not a positive number";
            return false;
        }
        var boolean = true;
        categories.forEach((category)=>{
            $.ajax({
                url:"/adminPage/" + category.categoryName + "/" + id.value,
                async: false,
                type: "GET",
                success: (data) => {
                    errorMessage.innerText = "Product with the same id already exists";
                    boolean = false;
                },
                error: (data) => {} 
            });
        })
        return boolean;
    }

    function productNameValidate(){
        var name = document.getElementById("productNameField");
        var errorMessage = document.getElementById("createProductError");
        if(name.value.length == 0){
            errorMessage.innerText = "Name field is empty";
            return false;
        }   
        return true;
    }

    function productCategoryValidate(){
        var category = document.getElementById("productCategoryField");
        var errorMessage = document.getElementById("createProductError");
        if(category.value == "0"){
            errorMessage.innerText = "Category hasn't been chosen";
            return false;
        }
        return true;
    }

    function productColorValidate(){
        var color = document.getElementById("productColorField");
        var errorMessage = document.getElementById("createProductError");
        if(color.value.length == 0){
            errorMessage.innerText = "Color field is empty";
            return false;
        }
        return true;
    }

    function productImageValidate(){
        var image = document.getElementById("productImageField");
        var errorMessage = document.getElementById("createProductError");
        if(image.value.length != 0){
            var linkParts = image.value.split('/');
            if(linkParts.length != 3 || linkParts[0] != "public" || linkParts[1] != "images"){
                errorMessage.innerText = "Image field is invalid";
                return false;
            }
            var imageParts = linkParts[2].split('.');
            if(!(imageParts[1] == "jpg" || imageParts[1] == "png")){
                errorMessage.innerText = "Image field is invalid";
                return false;
            }
        }
        return true;
    }

    function productSizeValidate(){
        var size = document.getElementById("productSizeField");
        var errorMessage = document.getElementById("createProductError");
        if(size.value.length == 0){
            errorMessage.innerText = "Size field is empty";
            return false;
        }
        if(!isNumeric(size.value)){
            errorMessage.innerText = "Size field is invalid";
            return false;
        }
        return true;
    }

    function productDescValidate(){
        var description = document.getElementById("productDescField");
        var errorMessage = document.getElementById("createProductError");
        if(description.value.length == 0){
            errorMessage.innerText = "Description field is empty";
            return false;
        }   
        return true;
    }

    function productPriceValidate(){
        var price = document.getElementById("productPriceField");
        var errorMessage = document.getElementById("createProductError");
        if(price.value.length == 0){
            errorMessage.innerText = "Price field is empty";
            return false;
        }
        if(!isNumeric(price.value)){
            errorMessage.innerText = "Price field is invalid";
            return false;
        }
        return true;
    }

    function productAmountValidate(){
        var amount = document.getElementById("productAmountField");
        var errorMessage = document.getElementById("createProductError");
        if(amount.value.length == 0){
            errorMessage.innerText = "Amount field is empty";
            return false;
        }
        var number = +(amount.value);
        if(number < 0){
            errorMessage.innerText = "Amount is not a positive number";
            return false;
        }
        else if(!number){
            errorMessage.innerText = "Amount is not a number";
            return false;
        }
        return true;
    }

    function productBrandValidate(){
        var brand = document.getElementById("productBrandField");
        var errorMessage = document.getElementById("createProductError");
        if(brand.value.length == 0){
            errorMessage.innerText = "Brand field is empty";
            return false;
        }   
        return true;
    }

    function resetProductFields(){
        $("#productIdField").value = "";
        $("#productNameField").value = "";
        $("#productCategoryField").value = "0";
        $("#productColorField").value = "";
        $("#productImageField").value = "";
        $("#productSizeField").value = "";
        $("#productHotField").value = "0";
        $("#productDescField").value = "";
        $("#productPriceField").value = "";
        $("#productAmountField").value = "";
        $("#productBrandField").value = "";
    }

    function isNumeric(value){
        return /^\d+(\.\d+)?$/.test(value);
    }