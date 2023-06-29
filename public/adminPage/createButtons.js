$(document).ready(function(){
    $.ajax({
        url: "/getCategorys",
        type: "GET",
        success: function(categories) {
            var categoryField = $("#productCategoryField");
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
        var alertMessage = $("#createCategoryAlert");
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
            var categoryName = $("#categoryNameField").value;
            var categoryImage = $("#categoryImageField").value;
            $.ajax({
                url: "/" + categoryName,
                type: "POST",
                data: { image : categoryImage},
                success: () =>{
                    var successMessage = $("#createCategorySuccess");
                    successMessage.classList.remove("d-none");
                    setTimeout(() => {
                        successMessage.classList.add("d-none");
                    },3000);
                    resetCategoryFields();
                },
                error: () =>{
                    var errorMessage = $("#createCategoryError");
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
        var alertMessage = $("#createProductAlert");
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
            var productId = $("#productIdField").value;
            var productCategory = $("#productCategoryField").value;
            var name = $("#productNameField").value;
            var productColor = $("#productColorField").value;
            var productSize = $("#productSizeField").value;
            var productImage = $("#productImageField").value;
            var productDesc = $("#productDescField").value;
            var productPrice = $("#productPriceField").value;
            var productAmount = $("#productAmountField").value;
            var productBrand = $("#productBrandField").value;
            var productHot = $("#productHotField").value;
            if(productHot.length == 0 || productHot == "No"){
                productHot = false;
            }
            else {
                productHot = true;
            }
            $.ajax({
                url: "/" + productId,
                type: "POST",
                data: { 
                    categoryName: productCategory,
                    productName: name,
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
                    var successMessage = $("#createProductSuccess");
                    successMessage.classList.remove("d-none");
                    setTimeout(() => {
                        successMessage.classList.add("d-none");
                    },3000);
                    resetProductFields();
                },
                error: () =>{
                    var errorMessage = $("#createProductError");
                    errorMessage.innerText = "An error occurred while trying to create the product";
                    alertMessage.classList.remove("d-none");
                    setTimeout(() => {
                        alertMessage.classList.add("d-none");
                    },3000);
                }
            })
            successMessage.classList.remove("d-none");
            setTimeout(() => {
                successMessage.classList.add("d-none");
            },4000);
            resetProductFields();        
        }
    })
})


    //================== Functions =============================

    function categoryNameValidate(){
        var name = $("#categoryNameField");
        var errorMessage = $("#createCategoryError");
        if(name.value.length == 0){
            errorMessage.innerText = "Name field is empty";
            return false;
        }
        $.ajax({
            url: "/" + name.value,
            type: "GET",
            success: () => {
                errorMessage.innerText = "Category with this name already exists";
                return false;
            },
            error: () => {return true;}
        }); 
    }

    function categoryImageValidate(){ //check if image is in path instead
        var image = $("#categoryImageField");
        var errorMessage = $("#createCategoryError");
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
        var id = $("#productIdField");
        var errorMessage = $("#createProductError");
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
        var categoryName = $("#productCategoryField").value;
        $.ajax({
            url:"/" + categoryName + "/" + id,
            type: "GET",
            success: () => {
                errorMessage.innerText = "Product with the same id already exists";
                return false;
            },
            error: () => {return true;} 
        });
    }

    function productNameValidate(){
        var name = $("#productNameField");
        var errorMessage = $("#createProductError");
        if(name.value.length == 0){
            errorMessage.innerText = "Name field is empty";
            return false;
        }   
        return true;
    }

    function productCategoryValidate(){
        var category = $("#productCategoryField");
        var errorMessage = $("#createProductError");
        if(category.value == "0"){
            errorMessage.innerText = "Category hasn't been chosen";
            return false;
        }
        return true;
    }

    function productColorValidate(){
        var color = $("#productColorField");
        var errorMessage = $("#createProductError");
        if(color.value.length == 0){
            errorMessage.innerText = "Color field is empty";
            return false;
        }
        return true;
    }

    function productImageValidate(){
        var image = $("#productImageField");
        var errorMessage = $("#createProductError");
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
        var size = $("#productSizeField");
        var errorMessage = $("#createProductError");
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
        var description = $("#productDescField");
        var errorMessage = $("#createProductError");
        if(description.value.length == 0){
            errorMessage.innerText = "Description field is empty";
            return false;
        }   
        return true;
    }

    function productPriceValidate(){
        var price = $("#productPriceField");
        var errorMessage = $("#createProductError");
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
        var amount = $("#productAmountField");
        var errorMessage = $("#createProductError");
        if(amount.value.length == 0){
            errorMessage.innerText = "Amount field is empty";
            return false;
        }
        var number = +(amount.value);
        if(!number){
            errorMessage.innerText = "Amount is not a number";
            return false;
        }
        if(number <= 0){
            errorMessage.innerText = "Amount is not a positive number";
            return false;
        }
        return true;
    }

    function productBrandValidate(){
        var brand = $("#productBrandField");
        var errorMessage = $("#createProductError");
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