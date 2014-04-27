// IndexView.js

define(["jquery", "backbone", "handlebars", "models/BlogPostModel", "text!templates/BlogPost.html"],

    function($, Backbone, Handlebars, Model, BlogPostTemplate){

        var BlogPostView = Backbone.View.extend({

            template: Handlebars.compile(BlogPostTemplate),
            // The DOM Element associated with this view
            tagName: 'div',
            className: 'blogPostContainer',
            

            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                'click .delete': 'deleteBlogPost'
            },

            deleteBlogPost: function(){
                this.model.destroy();
                
                this.remove();
            },

            // Renders the view's template to the UI
            render: function() {    
                // Setting the view's template property using the Underscore template method
                this.$el.html( this.template( this.model.toJSON() ) );

            //     // Maintains chainability
                return this;

            }


        });

        // Returns the View class
        return BlogPostView;

    }

);