/**
 * Main class (common sudoku grid)
 */
var Sudoku = (function() {
    /**
     * Initial set of values
     *
     * @type {Array}
     */
    initialSet = [];

    /**
     * Renderer for suggestions
     *
     * @type {null}
     */
    suggestionView = null;

    var constructor = function(sudokuValues) {
        initialSet = sudokuValues;
    };

    constructor.prototype = {
        /**
         * Display common grid with predefined values
         *
         * @returns {jQuery|HTMLElement}
         */
        display: function() {
            var sudokuWrapper = $('<div></div>');
            sudokuWrapper.attr('id', 'sudoku');
            sudokuWrapper.addClass('sudoku');

            for (var i in initialSet) {
                var row = $('<div></div>');
                row.addClass('sudoku-row');
                for (var j in initialSet[i]) {
                    var currentCellValue = initialSet[i][j];
                    var cellDiv = $('<div></div>');
                    cellDiv.addClass('sudoku-cell');

                    var cellValue = $('<div></div>');
                    cellValue.addClass('sudoku-cell-value');
                    cellDiv.append(cellValue);

                    if (!currentCellValue) {
                        cellDiv.attr('id', 'sudoku-cell-' + i + '-' + j);
                        cellDiv.addClass('empty');
                    } else {
                        cellValue.text(currentCellValue);
                        cellDiv.addClass('filled');
                    }

                    row.append(cellDiv);
                }

                sudokuWrapper.append(row);
            }

            return sudokuWrapper;
        },

        /**
         * Set renderer. It MUST has 'display' method
         *
         * @param view
         */
        setSuggestionView: function(view) {
            suggestionView = view;
        },

        /**
         * Render suggestions.
         * (realization for Strategy pattern)
         *
         * @param e {Event}
         */
        displaySuggestion: function(e) {
            if (!suggestionView) {
                throw 'Suggestion View is not set!';
            }

            suggestionView.display(e);
        }
    };

        return constructor;
})();

/**
 * Renderer factory
 */
var SuggestionViewFactory = {
    /**
     * Factory method
     *
     * @param type {String}
     * @returns {*}
     */
    create: function(type) {
        switch (type) {
            case 'none':
                return new NoneSuggestionView();
            case 'line':
                return new LineSuggestionView();
        }
    }
};

/**
 * Fake renderer for suggestions.
 * It doesn't display any suggestions
 */
var NoneSuggestionView = (function() {
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
            $(document).on('blur', 'input.sudoku-cell-value', function(e) {
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
        }
    };

    return constructor;
})();

/**
 * Renderer for suggestions.
 * Suggestions will be rendered in 3 lines square
 * with empty cell in the center (just to see origin cell in sudoku grid)
 */
var LineSuggestionView = (function() {
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
                console.log('Base cells are unchangable');
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
                row3.append(cellDiv);
            }

            commonDiv.append(row1);
            commonDiv.append(row2);
            commonDiv.append(row3);

            div.append(commonDiv);

            //we should remove suggestions popup when value is selected
            $(document).on('click', '#line-suggestion-renderer > div > div', function(e) {
                var div = $(e.currentTarget);
                e.stopPropagation();
                console.log(div);
                $('#line-suggestion-renderer').parent().text(div.text());
                $('#line-suggestion-renderer').remove();
            });
        }
    };

    return constructor;
})();

$(document).ready(function() {
    //create some radio buttons
    //just to test on-fly switching renderers...
    $(document.body).append('None: ');
    $(document.body).append($('<input type="radio" name="switcher" value="none" checked="checked">'));
    $(document.body).append('Line: ');
    $(document.body).append($('<input type="radio" name="switcher" value="line">'));

    //create sudoku instance
    var s = new Sudoku(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 8],
            [0, 0, 9, 0, 0, 0, 0, 0, 1],
            [0, 0, 5, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 0, 0],
            [0, 8, 0, 0, 0, 0, 0, 2, 0],
            [7, 6, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 2, 0, 0, 0, 4, 0, 0],
            [0, 1, 0, 8, 0, 7, 0, 0, 0]
        ]
    );
    //display it
    $(document.body).append(s.display());

    //set suggestion renderer to Sudoku
    $('input[name~="switcher"]').on('change', function(e) {
        var view = SuggestionViewFactory.create(e.currentTarget.value);
        s.setSuggestionView(view);
    });

    //bind event to render suggestions
    $(document).on('click', '.sudoku-cell.empty div.sudoku-cell-value', s.displaySuggestion);
});
