/**
 * Fake renderer for suggestions.
 * It doesn't display any suggestions
 */
var NoneView = function() {
    this.render = function(cell) {
        //create element to replace
        var input = $('<input>');
        //copy id, class and other values
        input.attr('class', cell.view.attr('class'));
        input.addClass('selected');
        input.attr('id', cell.view.attr('id'));
        input.attr('type', 'number');
        input.attr('maxlength', 1);
        //save text value
        input.val(cell.getValue());
        //replace element
        cell.view.replaceWith(input);
        input.focus();
        input.select();

        //we should "cancel" replace when input lose focus
        input.on('blur', function(e) {
            cell.setValue($(this).val());
            $(this).replaceWith(cell.render());
        });

        input.on('keypress', function(e) {
            var keyValue = String.fromCharCode(e.which);
            if (/^\d$/.test(keyValue)) {
                $(this).val(keyValue);
            }
            $(this).blur();
        });
    }
};
