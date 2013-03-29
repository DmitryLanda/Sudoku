var Sudoku = (function() {
    var constructor = function(initialValues) {
        this.cells = [];

        var suggestionManager = new SuggestionManager();
        suggestionManager.init(initialValues);
        for (var i = 0; i < initialValues.length; i++) {
            var row = [];
            for (var j = 0; j < initialValues[i].length; j++) {
                var cell = new Cell(i, j, initialValues[i][j]);
                cell.setSuggestionManager(suggestionManager);
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
}());

var Cell = (function() {
    return function(i, j, data) {
        var self = this;

        self.rowPosition = i;
        self.columnPosition = j;
        self.value = data;
        self.isInitialCell = parseInt(data) > 0;
        self.suggestionManager = [];

        self.render = function() {
            var cell = $('<div class="sudoku-cell"></div>');
            if (self.getValue()) {
                $(cell).text(self.getValue());
            }
            if (self.isInitialCell) {
                $(cell).addClass('filled');
            } else {
                $(cell).addClass('empty');
            }
            $(cell).attr('id', 'cell-' + self.rowPosition + '-' + self.columnPosition);
            $(cell).click(function(e) {
                if (!self.isInitialCell) {
                    SuggestionRenderer.render(self);
                }
            });

            self.view = cell;

            return cell;
        };

        self.getValue = function() {
            return self.value ? self.value : null;
        };

        self.setValue = function(value) {
            if (/^\d+$/.test(value)) {
                self.value = parseInt(value);
                self.view.text(self.value);
                self.suggestionManager.update(self.rowPosition, self.columnPosition, self.value);

                return this.getValue();
            }
        };

        self.setSuggestionManager = function(suggestionManager) {
            self.suggestionManager = suggestionManager;
        };

        self.getSuggestions = function() {
            return self.suggestionManager.getCellSuggestions(self.rowPosition, self.columnPosition);
        };
    };
}());

var SuggestionManager = function() {
    this.suggestion = [];

    this.render = function(i, j) {
        console.log(this.getCellSuggestions(i, j));
    };

    this.update = function(i, j, value) {
        //temporary!!!
        this.suggestion[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var key = $.inArray(value, this.suggestion[i][j]);
        if (key != -1) {
            this.suggestion[i][j].splice(key, 1);
        }
    };

    this.getCellSuggestions = function(i, j) {
        return this.suggestion[i][j];
    };


    this.init = function(data) {
        for (var i = 0; i < 9; i++) {
            //add i row to list
            this.suggestion.push([]);
            for (var j = 0; j < 9; j++) {
                this.suggestion[i].push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                this.update(i, j, data[i][j]);
            }
        }
    };
};

var SuggestionRenderer = {
    self: this,
    renderer: null,

    setRenderer: function(renderer) {
        self.renderer = renderer;
    },

    render: function(cell) {
        self.renderer.render(cell);
    }
};