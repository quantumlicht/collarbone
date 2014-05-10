// IndexView.js

define(["jquery", "backbone", "handlebars", "models/TriviaModel", "text!templates/Trivia.html"],

    function($, Backbone, Handlebars, Model, template){

        var TriviaView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: ".magic",
            
            template: Handlebars.compile(template),

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

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return TriviaView;

    }

);