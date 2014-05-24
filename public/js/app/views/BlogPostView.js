// IndexView.js

define(["app",
        "views/CommentView",
        "models/BlogPostModel",
        "models/CommentModel",
        "collections/CommentCollection",
        "text!templates/BlogPost.html"],

    function(app, CommentView, Model, commentModel, commentCollection, BlogPostTemplate){

        var BlogPostView = Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: 'div',
            className: 'blogPostContainer',
            template: Handlebars.compile(BlogPostTemplate),

            // View constructor
            initialize: function(options) {
                $('#' + Backbone.history.fragment).addClass('active');
                // Calls the view's render method
                this.admin = options.admin;

                this.id = this.model.get('id');
                this.comments = new commentCollection();
                this.comments.url = '/blogposts/' + this.id + '/comments';
                this.comments.fetch({async: false, reset:true});
                this.render();
            },

            // View Event Handlers
            events: {
                'click .delete-post': 'deleteBlogPost',
                'click #commentSubmit': "commentSubmit"
            },

            commentSubmit: function(e) {
                e.preventDefault();
                console.log('BlogPostView', 'commentSubmit', 'author', app.session.get('user').username)
                var data = new commentModel({
                    content: this.$el.find('textarea').val(),
                    username: app.session.get('user').username
                });
                this.comments.create(data);
                this.render();
            },

            deleteBlogPost: function(){
                this.model.destroy();
                this.comments.remove();
                this.remove();
            },

            // Renders the view's template to the UI
            render: function() {

                this.model.set({admin:this.admin});
                // Setting the view's template property using the Underscore template method
                this.$el.html( this.template( this.model.toJSON() ));
                if(this.comments) {
                    this.comments.each(function(item) {
                        this.renderComment(item);
                        }, this);
                }
                // Maintains chainability
                return this;

            },

            renderComment: function(comment) {
                var commentView = new CommentView({
                    model: comment,
                    admin: this.admin
                });
                this.$el.find('#commentContainer').append(commentView.render().el);
            }




        });

        // Returns the View class
        return BlogPostView;

    }

);