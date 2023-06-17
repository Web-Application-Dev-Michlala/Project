$(document).ready(function(){
    $('#button-increase').click(function(){
        var value = parseInt($('#productQuantity').val());
        value = isNaN(value) ? 0 : value;
        value++;
        $('#productQuantity').val(value);
    });

    $('#button-decrease').click(function(){
        var value = parseInt($('#productQuantity').val());
        value = isNaN(value) ? 0 : value;
        if (value > 0) {
            value--;
        }
        $('#productQuantity').val(value);
    });
});