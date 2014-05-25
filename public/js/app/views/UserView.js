// IndexView.js

define(["jquery", "backbone", "models/UserModel", "text!templates/User.html"],

    function($, Backbone, Model, template){

        var UserView = Backbone.View.extend({

            template: Handlebars.compile(template),
            // View constructor
            initialize: function() {

                // Calls the view's render method
                // this.render();
                _.bindAll(this);

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method

                // Dynamically updates the UI with the view's template
                console.log('UserView', 'render', 'model data', this.model.toJSON());
                this.$el.html( this.template(this.model.toJSON()));

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return UserView;

    }

);