$.use('/js/src/Sudoku.js');
$.use('/js/src/SuggestionViewFactory.js');

var init = function() {
    //create some radio buttons
    //just to test on-fly switching renderers...
    $(document.body).append('None: ');
    $(document.body).append($('<input type="radio" name="switcher" value="none">'));
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
    var renderer = SuggestionViewFactory.create('line');
    SuggestionRenderer.setRenderer(renderer);

    //display it
    $(document.body).append(s.render());
};

$(window).load(init);
