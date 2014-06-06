define([
    "app",
    "utils",
    "views/BlogPostView",
    "models/BlogPostModel",
    "collections/BlogPostCollection",
    "text!templates/BlogPostContainer.html"
    ],

    function(app, utils, BlogPostView, BlogPostModel, BlogPostCollection, template){

        var BlogAdminView = Backbone.View.extend({

            template: Handlebars.compile(template),
            admin :true,

            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.collection = new BlogPostCollection();
                this.collection.fetch({reset: true});
                this.render();
                this.listenTo(this.collection, 'add', this.render);
                this.listenTo(this.collection, 'reset', this.render);
            },

            // View Event Handlers
            events: {
                'click #add': 'addBlogPost'
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.html(this.template);
                // Setting the view's template property using the Underscore template method
                this.collection.each(function(item) {
                    this.renderPost(item);
                }, this);


                // Maintains chainability
                return this;

            },

            addBlogPost: function(e) {
                e.preventDefault();
                var formData = {};
                if (app.session.user.get('username') !== undefined) {
                    $('#addBlogPost div').children('input, textarea').each(function(i, el) {
                        if ($(el).val() !== '') {
                            formData[el.id] = $(el).val();
                        }
                        $(el).val('');
                    });
                    formData.author = app.session.user.get('username');
                    this.collection.create(formData);
                }
                else {
                    utils.showAlert("Error", "You need to be logged in to add a blog post.", "alert-warning");
                    app.router.navigate('#/login',{trigger:true});
                }
            },

            renderPost: function(post) {
                var postView = new BlogPostView({
                    model: post,
                    admin:true
                });
                this.$el.append(postView.render().el);
            }

        });

        // Returns the View class
        
        return BlogAdminView;

    }

);
