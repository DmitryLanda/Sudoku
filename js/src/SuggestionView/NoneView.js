/**
 * Fake renderer for suggestions.
 * It doesn't display any suggestions
 */
var NoneView = (function() {
    var constructor = function() {};

    constructor.prototype = {
        /**
         * display suggestion
         *
         * @param e {Event}
         * @returns {boolean}
         */
        display: function(e) {
            e.stopPropagation();
            var div = $(e.currentTarget);
            if (div.parent().hasClass('filled')) {
                return false;
            }
            //create element to replace
            var input = $('<input>');
            //copy id, class and other values
            input.attr('class', div.attr('class'));
            input.attr('id', div.attr('id'));
            input.attr('type', 'number');
            input.attr('maxlength', 1);
            //save text value
            input.val(div.text());
            //replace element
            div.replaceWith(input);
            input.focus();
            input.select();

            //we should "cancel" replace when input lose focus
            input.on('blur', function(e) {
                var input = $(e.currentTarget);
                //create element to replace
                var div = $('<div></div>');
                //copy valuable values (id, class ...)
                div.attr('class', input.attr('class'));
                div.attr('id', input.attr('id'));
                //save text value
                div.text(input.val());
                //replace
                input.replaceWith(div);
            });

            input.on('keypress', function(e) {
                var input = $(e.currentTarget);
                var keyValue = String.fromCharCode(e.which);
                if (/^\d$/.test(keyValue)) {
                    input.val(keyValue);
                }
                input.blur();
            });

        }
    };

    return constructor;
})();
