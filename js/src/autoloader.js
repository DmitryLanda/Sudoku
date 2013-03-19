var urls = [];
$.use = function(url, options) {
    if ($.inArray(url, urls) == -1) {
        //add url to the list
        urls.push(url);
        //upload script

        //set defaults
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            async: false
        });

        jQuery.ajax(url, options).done(function(scriptData) {
            var script = $('<script></script>');
            script.attr('type', 'text/javascript');
            script.text(scriptData);
            $(document.head).append(script);
        });
    }
};
