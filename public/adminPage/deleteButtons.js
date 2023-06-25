

$(document).ready(function() {
    var selectedCategory = "";
    $.ajax({
        url: "/getCategorys",
        type: "GET",
        success: function(categories) {
            $(".categorySelect").empty();
            $(".categorySelect").append(new Option("Select a category", ""));
            categories.forEach(function(category) {
                $(".categorySelect").append(new Option(category.categoryName, category.categoryName));
            });
        },
        error: function() {
            alert("An error occurred while trying to fetch categories");
        }
    });

    $("#categorySelect1").change(function() {
        selectedCategory = $(this).val();
        $("#deletionSuccessMessage").addClass("d-none");
        
        if (selectedCategory === "") {
            $("#confirmationSection").addClass("d-none");
        } else {
            fetchCategoryDetails(selectedCategory);
        }
    });
    
    // Hide the confirmation devision and reset the selection
    $("#cancelDeleteButton").click(function() {
        $("#confirmationSection").addClass("d-none");
        $(".categorySelect").val("");
    });

    // Deleting a selected category
    $("#confirmDeleteButton").click(function() {
        $.ajax({
            url: "/" + selectedCategory,
            type: "DELETE",
            success: function() {
                $("#deletionSuccessText").html("Category <strong>" + selectedCategory + "</strong> has been deleted!");
                $("#deletionSuccessMessage").removeClass("d-none");
                $("#confirmationSection").addClass("d-none");
                $(".categorySelect").val("");
                // Update the category list after deletion
                $(".categorySelect option[value='" + selectedCategory + "']").remove();
            },
            error: function() {
                $("#deletionSuccessText").text("An error occurred while trying to delete: " + selectedCategory);
            }
        });
    });
    //================== Product deletion =============================
    $("#productSelect").change(function() {
        var selectedProduct = $(this).val();
        
        if (selectedProduct === "") {
            $("#productDeleteConfirmationSection").addClass("d-none");
        } else {
            $("#productDeleteConfirmationText").html("Are you sure you want to delete the product: <strong>" 
            + selectedProduct + "</strong> from category: <strong>" + selectedCategory + "</strong>?");
            $("#productDeleteConfirmationSection").removeClass("d-none");
        }
    });

    $("#categorySelect2").change(function() {
        selectedCategory = $(this).val();
        
        if (selectedCategory === "") {
            $("#productSelect").prop("disabled", true);
            $("#productSelect").empty();
            $("#productSelect").append(new Option("Select a product", ""));
            $("#productConfirmationSection").addClass("d-none");
        } else {
            fetchProducts(selectedCategory);
        }
    });

    $("#cancelProductDeleteButton").click(function() {
        $("#productDeleteConfirmationSection").addClass("d-none");
        $("#productSelect").val("");
    });

    $("#confirmProductDeleteButton").click(function() {
        var selectedProduct = $("#productSelect").val();
    
        if (!selectedProduct) {
            alert("Please select a product to delete.");
            return;
        }
    
        $.ajax({
            url: "/deleteProduct",
            type: "DELETE",
            data: {
                categoryName: selectedCategory,
                productName: selectedProduct
            },
            success: function() {
                $("#productDeletionSuccessText").html("Product <strong>" + selectedProduct + "</strong> has been deleted from Category <strong>" + selectedCategory + "</strong>");
                $("#productDeletionSuccessMessage").removeClass("d-none");
                $("#productDeleteConfirmationSection").addClass("d-none");
                $("#productSelect option[value='" + selectedProduct + "']").remove();
                $("#productSelect").val("");
            },
            error: function() {
                $("#productDeletionSuccessText").text("An error occurred while trying to delete: " + selectedProduct);
            }
        });
    });
});

//=============== Functions ====================
function fetchCategoryDetails(categoryName) {
    $.ajax({
        url: "/getCategoryDetails/" + categoryName,
        type: "GET",
        success: function(categoryDetails) {
            let productsName = "";
            categoryDetails.products.forEach(product=>{
                productsName += product.name+", ";
            })
            $("#confirmationText").html("Are you sure you want to delete the category: <strong>" + categoryName + "</strong>?<br>"
                + "<u>Number of Products:</u> " + categoryDetails.products.length + "<br>"
                + "<u>Products:</u> " + productsName);
            
            $("#confirmationSection").removeClass("d-none");
        },
        error: function() {
            alert("An error occurred while trying to fetch category details");
        }
    });
}

function fetchProducts(categoryName) {
    $.ajax({
        url: "/getCategoryDetails/" + categoryName,
        type: "GET",
        success: function(categoryDetails) {

            $("#productSelect").prop("disabled", false);
            $("#productSelect").empty();
            $("#productSelect").append(new Option("Select a product", ""));
            
            categoryDetails.products.forEach(product => {
                $("#productSelect").append(new Option(product.name, product.name));
            });
        },
        error: function() {
            alert("An error occurred while trying to fetch category products");
        }
    });
}