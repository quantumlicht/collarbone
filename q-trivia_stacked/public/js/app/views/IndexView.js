// IndexView.js

define(["jquery", "backbone", "handlebars", "text!templates/Index.html"],

    function($, Backbone, Handlebars, IndexTemplate){

        var IndexView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".test",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = Handlebars.compile(IndexTemplate);

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return IndexView;

    }

);
