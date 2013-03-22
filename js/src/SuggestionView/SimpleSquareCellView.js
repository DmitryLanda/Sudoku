/**
 * Renderer for suggestions.
 * Suggestions will be rendered in 3 lines square
 * with empty cell in the center (just to see origin cell in sudoku grid)
 */
var SimpleSquareCellView = function() {
    var self = this;
    self.id = 'line-suggestion-renderer';

    self.clear = function() {
        $('#' + self.id).remove();
    };

    self.render = function(cell) {
        this.clear();

        //create wrapper
        var commonDiv = $('<div></div>');
        commonDiv.attr('id', this.id);
        var row = $('<div class="row"></div>');
        for (var i = 0; i <= 9; i++) {
            if (i == 5) {
                continue;
            }

            var curCell = $('<div class="cell"></div>');
            var val = (i > 5) ? i : (i + 1);
            if ($.inArray(val, cell.getSuggestions()) != -1) {
                curCell.text(val);
            curCell.on('click', function(e) {
                var div = $(e.currentTarget);
                e.stopPropagation();
                cell.setValue(div.text());
                self.clear();
            });

            }
            row.append(curCell);

            if (i % 3 == 0 && i > 0) {
                commonDiv.append(row);
                var row = $('<div class="row"></div>');
            }
        }

        cell.view.append(commonDiv);
    }

};
