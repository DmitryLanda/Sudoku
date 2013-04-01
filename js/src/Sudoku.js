Number.prototype.div = function(by){
    return (this - this % by) / by;
};

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
            if (self.getValue() > 0) {
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
            if (/^\d$/.test(value)) {
                value = parseInt(value);
                var oldValue = self.getValue();
                self.value = value ? value : '';
                self.view.text(self.value);
                self.suggestionManager.update(self.rowPosition, self.columnPosition, self.value, oldValue);

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
    var self = this;

    self.suggestion = [];

    self.render = function(i, j) {
        console.log(self.getCellSuggestions(i, j));
    };

    self.update = function(i, j, value, oldValue) {
        var cellEdgeX = i.div(3) * 3;
        var cellEdgeY = j.div(3) * 3;

        for (var x = cellEdgeX; x < cellEdgeX + 3; x++) {
            for (var y = cellEdgeY; y < cellEdgeY + 3; y++) {
                var key = $.inArray(value, self.suggestion[x][y]);
                if (key != -1) {
                    self.suggestion[x][y].splice(key, 1);
                }
                if (oldValue) {
                    self.suggestion[x][y].push(parseInt(oldValue));
                }
            }
        }

        for (var x = 0; x < 9; x++) {
            //update column
            var key = $.inArray(value, self.suggestion[i][x]);
            if (key != -1) {
                self.suggestion[i][x].splice(key, 1);
            }
            //update row
            var key = $.inArray(value, self.suggestion[x][j]);
            if (key != -1) {
                self.suggestion[x][j].splice(key, 1);
            }
            //restore previous value
            oldValue = parseInt(oldValue);
            if (oldValue) {
                self.suggestion[i][x].push(oldValue);
                self.suggestion[x][j].push(oldValue);
            }
        }
    };

    self.getCellSuggestions = function(i, j) {
        return self.suggestion[i][j];
    };


    self.init = function(data) {
        //fill suggestions with default data
        for (var i = 0; i < 9; i++) {
            //add i row to list
            self.suggestion.push([]);
            for (var j = 0; j < 9; j++) {
                self.suggestion[i].push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            }
        }

        //update suggestion
        for (var i = 0; i < 9; i++) {
            //add i row to list
            for (var j = 0; j < 9; j++) {
                self.update(i, j, data[i][j]);
            }
        }
        aaa = self.suggestion;
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