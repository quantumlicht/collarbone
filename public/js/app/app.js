/**
 * @desc        app globals
 */
define([
    "jquery",
    "underscore",
    "backbone",
    "handlebars",
    "events",
    "utils"
],
function($, _, Backbone, Handlebars, notifier) {

    var app = {
        root : "/",                     // The root path to run the application through.
        URL : "/",                      // Base application URL
        API : "/api",                   // Base API URL (used by models & collections)
        maxTextLength: 100
    };


    $.ajaxSetup({ cache: false });          // force ajax call on all browsers


    // Global event aggregator
    app.eventAggregator = notifier;

    return app;

});