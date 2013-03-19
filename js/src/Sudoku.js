var Sudoku = (function() {
    var constructor = function(initialValues) {
        this.cells = [];


        for (var i = 0; i < initialValues.length; i++) {
            var row = [];
            for (var j = 0; j < initialValues[i].length; j++) {
                var cell = new Cell(i, j, initialValues[i][j]);
//                var suggestions = new Suggestion(i, j, initialValues);
//                cell.setSuggestions(suggestions);
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
//                    console.log(i + ', ' + j);
//                    console.log(cells[i][j]._asString());
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
        this.rowPosition = i;
        this.columnPosition = j;
        this.value = data;
        this.isInitialCell = parseInt(data) > 0;
        this.suggestions = null;
    };

    constructor.prototype = {
        setSuggestions: function(suggestionValues) {
            this.suggestions = suggestionValues;
        },

        render:function() {
            var cell = $('<div class="sudoku-cell"></div>');
            if (this.value) {
                $(cell).text(this.value);
            }
            if (this.isInitialCell) {
                $(cell).addClass('filled');
            } else {
                $(cell).addClass('empty');
            }
            $(cell).attr('id', 'cell-' + this.rowPosition + '-' + this.columnPosition);

            return cell;
        },
        getRowPos: function() {return this.rowPosition},
        getColPos: function() {return this.columnPosition},
        getValue: function() {return this.value}
    };

    return constructor;
})();

var Suggestion = (function() {
    var constructor = function() {

    };

    constructor.prototype = {

    };

    return constructor;
})();