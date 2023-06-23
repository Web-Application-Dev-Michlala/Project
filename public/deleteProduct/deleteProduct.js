
$(document).ready(function() {
    var selectedCategory = "";
    $.ajax({
        url: "/adminPage/getCategorys",
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
    // Update the selected category when the select menu value changes
    $("#categorySelect").change(function() {
        selectedCategory = $(this).val();
        $("#confirmationSection").toggleClass("d-none", selectedCategory === "");
        $("#deletionSuccessMessage").addClass("d-none");
        $("#confirmationText").text("Are you sure you want to delete " + selectedCategory + "?");
    });

    // Hide the confirmation devision and reset the selection
    $("#cancelDeleteButton").click(function() {
        $("#confirmationSection").addClass("d-none");
        $("#categorySelect").val("");
    });

    // Deleting a selected category
    $("#confirmDeleteButton").click(function() {
        $.ajax({
            url: "/adminPage/" + selectedCategory,
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