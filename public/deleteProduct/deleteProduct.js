
$(document).ready(function() {
    var selectedCategory = "";
    $.ajax({
        url: "/getCategorys",
        type: "GET",
        success: function(categories) {
            $("#categorySelect").empty();
            $("#categorySelect").append(new Option("Select a category", ""));
            categories.forEach(function(category) {
                $("#categorySelect").append(new Option(category.categoryName, category.categoryName));
            });
        },
        error: function() {
            alert("An error occurred while trying to fetch categories");
        }
    });
    
    $("#categorySelect").change(function() {
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
        $("#categorySelect").val("");
    });

    // Deleting a selected category
    $("#confirmDeleteButton").click(function() {
        $.ajax({
            url: "/" + selectedCategory,
            type: "DELETE",
            success: function() {
                $("#deletionSuccessText").text("Category " + selectedCategory + " has been deleted!");
                $("#deletionSuccessMessage").removeClass("d-none");
                $("#confirmationSection").addClass("d-none");
                $("#categorySelect").val("");
                // Update the category list after deletion
                $("#categorySelect option[value='" + selectedCategory + "']").remove();
            },
            error: function() {
                $("#deletionSuccessText").text("An error occurred while trying to delete: " + selectedCategory);
            }
        });
    });
});
function fetchCategoryDetails(categoryName) {
    $.ajax({
        url: "/getCategoryDetails/" + categoryName,
        type: "GET",
        success: function(categoryDetails) {
            // Update the confirmation section with category details
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