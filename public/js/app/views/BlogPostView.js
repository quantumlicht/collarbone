// IndexView.js

define(["app",
        "views/CommentView",
        "models/BlogPostModel",
        "models/CommentModel",
        "collections/CommentCollection",
        "text!templates/BlogPost.html"],

    function(app, CommentView, Model, commentModel, CommentCollection, BlogPostTemplate){

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
                _.bindAll(this);
                this.commentCollection = new CommentCollection();
                this.commentCollection.fetch({async:false, reset:true});
                this.comments = this.commentCollection.where({modelId:this.model.id});

                this.listenTo(this.commentCollection, 'reset', this.render);
                this.listenTo(this.commentCollection, 'add', this.renderComment);
            },

            // View Event Handlers
            events: {
                'click .delete-post': 'deleteBlogPost',
                'click #commentSubmit': "commentSubmit"
            },

            commentSubmit: function(e) {
                console.log('BlogPostView', 'commentSubmit', 'author', app.session.get('user').username);
                var $comment = this.$el.find('textarea');
                if( $comment.val() !=='') {

                    var data = new commentModel({
                        content: this.$el.find('textarea').val(),
                        username: app.session.get('user').username,
                        modelId: this.model.id,
                        modelUrl: this.model.url()
                    });
                    console.log(this.comments);
                    this.commentCollection.create(data);
                    $comment.val('');
                }
            },

            deleteBlogPost: function(){
                /*
                * TODO: Delete comments linked to the blogpost
                * BUG: it is probably not how its done right now.
                */
                this.comments.remove();
                this.remove();
                this.model.destroy();
            },

            // Renders the view's template to the UI
            render: function() {
                console.log('BlogPostView','render');
                this.model.set({admin:this.admin});
                this.$el.html( this.template( this.model.toJSON() ));


                if(this.comments) {
                    _.each(this.comments, function(item) {
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