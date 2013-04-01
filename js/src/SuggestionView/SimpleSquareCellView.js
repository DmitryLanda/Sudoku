/**
 * Renderer for suggestions.
 * Suggestions will be rendered in 3 lines square
 * with empty cell in the center (just to see origin cell in sudoku grid)
 */
var SimpleSquareCellView = function() {
    var self = this;
    self.cssWrapperClassName = 'suggestion';
    self.cellCssClassName = 'suggestion-cell';
    self.rowCssClassName = 'suggestion-row';

    self.clear = function() {
        $('.' + self.cssWrapperClassName).remove();
    };

    /**
     * Creates and returns a div with specified class value
     *
     * @param {string} cssClass - css class value
     * @returns {jQuery|HTMLElement}
     */
    var createDiv = function(cssClass) {
        var div = $('<div></div>');
        div.addClass(cssClass)

        return div;
    }

    /**
     * Creates and returns a div with cell class value
     *
     * @returns {jQuery|HTMLElement}
     */
    var createCell = function() {
        return createDiv(self.cellCssClassName);
    };

    /**
     * Creates and returns a div with row class value
     *
     * @returns {jQuery|HTMLElement}
     */
    var createRow = function() {
        return createDiv(self.rowCssClassName);
    };

    /**
     * Creates and attaches to the 'cell' suggestions view
     *
     * @param cell
     */
    self.render = function(cell) {
        this.clear();

        //create wrapper
        var commonDiv = createDiv(self.cssWrapperClassName);
        var row = createRow();
        for (var i = 0; i <= 9; i++) {
            if (i == 5) {
                continue;
            }

            var curCell = createCell();
            var val = (i > 5) ? i : (i + 1);
            if ($.inArray(val, cell.getSuggestions()) != -1) {
                curCell.text(val);
            }
            curCell.on('click', function(e) {
                var div = $(e.currentTarget);
                e.stopPropagation();
                cell.setValue(div.text() || 0);
                self.clear();
            });

            row.append(curCell);

            if (i % 3 == 0 && i > 0) {
                commonDiv.append(row);
                var row = createRow();
            }
        }

        //destroy suggestions when user move mouse pointer away
//        commonDiv.on('mouseout', function(e) {
//            self.clear();
//        });

        cell.view.append(commonDiv);
    }

};
