var Sudoku = (function() {
    var constructor = function(initialValues) {
        this.cells = [];
        cells = this.cells;

        var suggestions = new Suggestion(initialValues);
        suggestions.setRenderer(1);
        for (var i = 0; i < initialValues.length; i++) {
            var row = [];
            for (var j = 0; j < initialValues[i].length; j++) {
                var cell = new Cell(i, j, initialValues[i][j]);
                cell.setSuggestions(suggestions);
                row.push(cell);
            }
            this.cells.push(row);
        }
    };

    constructor.prototype = {
        render: function() {
            var container = $('<div class="sudoku"></div>');
            for (var i = 0; i < this.cells.length; i++) {
                var row = $('<div class="sudoku-row"></div>');
                for (var j = 0; j < this.cells[i].length; j++) {
                    $(row).append(this.cells[i][j].render());
                }
                $(container).append(row);
            }

            return container;
        }
    };

    return constructor;
})();

var Cell = (function() {
    var constructor = function(i, j, data) {
        var self = this;

        this.setSuggestions = function(suggestions) {
            this.suggestions = suggestions;
        };

        this.render = function() {
            var cell = $('<div class="sudoku-cell"></div>');
            if (this.getValue()) {
                $(cell).text(this.getValue());
            }
            if (this.isInitialCell) {
                $(cell).addClass('filled');
            } else {
                $(cell).addClass('empty');
            }
            $(cell).attr('id', 'cell-' + this.rowPosition + '-' + this.columnPosition);
            $(cell).click(function(e) {
                console.log(this);

                self.suggestions.render(self.rowPosition, self.columnPosition);
            });

            this.view = cell;

            return cell;
        };

        this.getValue = function() {
            return this.value;
        };
        this.setValue = function(value) {
            if (!/^\d+$/.test(this.value)) {
                return false;
            }

            this.value = parseInt(value);
            $(this.view).text(this.value);
            this.suggestions.update(this.rowPosition, this.columnPosition, this.value);
        };

        this.rowPosition = i;
        this.columnPosition = j;
        this.value = data;
        this.isInitialCell = parseInt(data) > 0;
        this.suggestions = null;
    };

    return constructor;
})();

var Suggestion = (function() {
    var renderer = null;
    var suggestion = [];

    var constructor = function(data) {
        this.update = function(i, j, value) {
            //temporary!!!
            suggestion[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            if (value in suggestion[i][j]) {
                var key = suggestion[i][j].indexOf(value);
                if (key != -1) {
                    suggestion[i][j].splice(key, 1);
                }
            }
        };
        this.getCellSuggestions = function(i, j) {
            return suggestion[i][j];
        };
        this.render = function(i, j) {
            if (!renderer) {
                throw 'Suggestion renderer should be set!';
            }

            console.log(suggestion[i][j]);
        };
        this.setRenderer = function(rendererInstance) {
            renderer = rendererInstance;
        };

        for (var i = 0; i < 9; i++) {
            //add i row to list
            suggestion.push([]);
            for (var j = 0; j < 9; j++) {
                suggestion[i].push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                this.update(i, j, data[i][j]);
            }
        }
    };

    constructor.prototype = {

    };

    return constructor;
})();