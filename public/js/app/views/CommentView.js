// IndexView.js

define(["jquery", "backbone","handlebars", "models/CommentModel", "text!templates/Comment.html"],

    function($, Backbone, Handlebars, Model, template){

        var CommentView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: '#commentContainer',
            tagName: 'div',
            className: 'comment',
            template: Handlebars.compile(template),
            // View constructor
            initialize: function(options) {
                this.admin = options.admin;
                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template($.extend(this.model.toJSON(), {admin: this.admin})));

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return CommentView;

    }

);