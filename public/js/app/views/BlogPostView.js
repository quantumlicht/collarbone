// IndexView.js

define(["jquery", "backbone", "handlebars", "models/BlogPostModel", "text!templates/BlogPost.html"],

    function($, Backbone, Handlebars, Model, BlogPostTemplate){

        var BlogPostView = Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: 'div',
            className: 'blogPostContainer',
            template: Handlebars.compile(BlogPostTemplate),

            // View constructor
            initialize: function(options) {
                console.log(options);
                // Calls the view's render method
                this.admin = options.admin;
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
                this.model.set({admin:this.admin});
                // Setting the view's template property using the Underscore template method
                this.$el.html( this.template( this.model.toJSON() ));

            //     // Maintains chainability
                return this;

            }


        });

        // Returns the View class
        return BlogPostView;

    }

);