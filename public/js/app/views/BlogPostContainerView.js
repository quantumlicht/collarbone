// IndexView.js

define([
    "app",
    "views/BlogPostView",
    "models/BlogPostModel",
    "collections/BlogPostCollection",
    "text!templates/BlogPostContainer.html"
    ],

    function(app, BlogPostView, BlogPostModel, BlogPostCollection, template){

        var BlogPostContainerView = Backbone.View.extend({

            template: Handlebars.compile(template),

            // View constructor
            initialize: function() {
                // Calls the view's render method
                console.log('BlogPostContainerView', 'initialize');
                _.bindAll(this);
                this.collection = new BlogPostCollection();
                this.collection.fetch({reset: true});
                // this.render();
                
                this.listenTo(this.collection, 'add', this.renderPost);
                this.listenTo(this.collection, 'reset', this.render);
            },

            // View Event Handlers
            events: {
                'click #add': 'addBlogPost'
            },

            // Renders the view's template to the UI
            render: function() {
                // this.$el.empty();
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
                console.log('BlogPostContainerView','renderPost','post', post);
                console.log('BlogPostContainerView','renderPost','this.$el', this.$el);
                var postView = new BlogPostView({
                    model: post,
                    admin: false
                });
                $('#BlogPostContainer').append(postView.render().el);
                
            }

        });

        // Returns the View class
        
        return BlogPostContainerView;

    }

);
