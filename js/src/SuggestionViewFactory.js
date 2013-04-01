$.use('http://192.168.1.33/test/js/src/SuggestionView/NoneView.js');
$.use('http://192.168.1.33/test/js/src/SuggestionView/SimpleSquareCellView.js');

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
                return new NoneView();
            case 'line':
                return new SimpleSquareCellView();
        }
    }
};