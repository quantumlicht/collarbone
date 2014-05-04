// IndexView.js

define([
    "jquery",
    "backbone",
    "handlebars",
    "views/BlogPostView",
    "models/BlogPostModel",
    "collections/BlogPostCollection",
    "text!templates/BlogPostContainer.html"
    ],

    function($, Backbone, Handlebars, BlogPostView, BlogPostModel, BlogPostCollection, template){

        var BlogPostContainerView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".magic",

            template: Handlebars.compile(template),

            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.collection = new BlogPostCollection();
                this.collection.fetch({reset: true});
                this.render();
                
                this.listenTo(this.collection, 'add', this.renderPost);
                this.listenTo(this.collection, 'reset', this.render);
            },

            // View Event Handlers
            events: {
                'click #add': 'addBlogPost'
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.empty();
                // this.template = Handlebars.compile(template);
                // this.$el.html(this.template);
                // Setting the view's template property using the Underscore template method
                this.collection.each(function(item) {
                    this.renderPost(item);
                }, this);

                // Dynamically updates the UI with the view's template
                // this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            // addBlogPost: function(e) {
            //     e.preventDefault();
            //     var formData = {};

            //     $('#addBlogPost div').children('input,textarea').each(function(i, el) {
            //         if ($(el).val() !== '') {
            //             formData[el.id] = $(el).val();
            //         }
            //     });
            //     this.collection.create(formData);
            // },

            renderPost: function(post) {
                var postView = new BlogPostView({
                    model: post,
                    admin: false
                });
                this.$el.append(postView.render().el);
                
            }

        });

        // Returns the View class
        
        return BlogPostContainerView;

    }

);
