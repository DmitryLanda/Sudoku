/**
 * Renderer for suggestions.
 * Suggestions will be rendered in 3 lines square
 * with empty cell in the center (just to see origin cell in sudoku grid)
 */
var SimpleSquareCellView = (function() {
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
            //remove old elements if they exists
            $('#line-suggestion-renderer').remove();
            //create wrapper
            var commonDiv = $('<div></div>');
            commonDiv.attr('id', 'line-suggestion-renderer');

            //create first row
            var row1 = $('<div></div>');
            row1.attr('id', 'line-suggestion-row-first');
            //fill row with values
            for (var i = 1; i <= 4; i++ ) {
                var cellDiv = $('<div></div>');
                cellDiv.text(i);
                cellDiv.attr('id', 'line-suggestion-cell-' + i);
                //we should remove suggestions popup when value is selected
                cellDiv.on('click', function(e) {
                    var div = $(e.currentTarget);
                    e.stopPropagation();
                    commonDiv.parent().text(div.text());
                    commonDiv.remove();
                });
                row1.append(cellDiv);
            }

            //create second row
            var row2 = $('<div></div>');
            row2.attr('id', 'line-suggestion-row-second');
            //fill it
            for (var i = 5; i <= 6; i++ ) {
                var cellDiv = $('<div></div>');
                cellDiv.text(i);
                cellDiv.attr('id', 'line-suggestion-cell-' + i);
                //we should remove suggestions popup when value is selected
                cellDiv.on('click', function(e) {
                    var div = $(e.currentTarget);
                    e.stopPropagation();
                    commonDiv.parent().text(div.text());
                    commonDiv.remove();
                });
                row2.append(cellDiv);
            }

            //create last row
            var row3 = $('<div></div>');
            row3.attr('id', 'line-suggestion-row-third');
            //and fill it
            for (var i = 7; i <= 9; i++ ) {
                var cellDiv = $('<div></div>');
                cellDiv.text(i);
                cellDiv.attr('id', 'line-suggestion-cell-' + i);
                //we should remove suggestions popup when value is selected
                cellDiv.on('click', function(e) {
                    var div = $(e.currentTarget);
                    e.stopPropagation();
                    commonDiv.parent().text(div.text());
                    commonDiv.remove();
                });
                row3.append(cellDiv);
            }

            commonDiv.append(row1);
            commonDiv.append(row2);
            commonDiv.append(row3);

            div.append(commonDiv);
        }
    };

    return constructor;
})();
