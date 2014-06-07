// IndexView.js

define(["app",
        "views/CommentView",
        "views/BlogPostEditView",
        "models/BlogPostModel",
        "models/CommentModel",
        "collections/CommentCollection",
        "text!templates/BlogPost.html"],

    function(app, CommentView, BlogPostEditView, Model, commentModel, CommentCollection, BlogPostTemplate){

        var BlogPostView = Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: 'div',
            className: 'blogPostContainer',
            template: Handlebars.compile(BlogPostTemplate),
            renderForListView: false,
            // View constructor
            initialize: function(options) {
                console.log('BlogPostView', 'Fragment', Backbone.history.fragment);

                // $('#' + Backbone.history.fragment.split('/')[0]).addClass('active');
                // Calls the view's render method
                this.admin = options.admin;
                if (typeof options.renderForListView === 'boolean' ) {
                    this.renderForListView = options.renderForListView;
                }
                _.bindAll(this);
                this.commentCollection = new CommentCollection();
                this.commentCollection.fetch({async:false, reset:true});
                this.comments = this.commentCollection.where({modelId:this.model.id});

                this.listenTo(this.commentCollection, 'reset', this.render);
                this.listenTo(this.commentCollection, 'add', this.renderComment);
                this.listenTo(this.model, 'blogpost-edit', this.render);
            },

            // View Event Handlers
            events: {
                'click .edit-post': "editBlogPost",
                'click .delete-post': 'deleteBlogPost',
                'click #commentSubmit': "commentSubmit"
            },

            commentSubmit: function(e) {
                console.log('BlogPostView', 'commentSubmit', 'author', app.session.user.get('username'));
                var $comment = this.$el.find('textarea');
                if( $comment.val() !=='') {

                    var data = new commentModel({
                        content: this.$el.find('textarea').val(),
                        username: app.session.user.get('username')  ,
                        modelId: this.model.id,
                        modelUrl: this.model.url()
                    });
                    console.log(this.comments);
                    this.commentCollection.create(data);
                    $comment.val('');
                }
            },

            deleteBlogPost: function(){
                console.log('deleteBlogPost','comments', this.comments);
                this.remove();  
                this.model.destroy({
                    success:this.removeComments
                });
            },

            removeComments: function(model) {
                console.log('removing comments');
                var collection = new CommentCollection();
                collection.fetch({reset:true});
                collection.on('reset', function(collection){
                    comments = collection.where({modelId:model.get('_id')});
                    _.each(comments, function(comment){
                        comment.destroy();
                    });
                });

            },

            editBlogPost: function(){
                console.log('BlogPostView', 'editBlogPost', 'content', this.model.get('content'));
                var blogPostEditView = new BlogPostEditView({
                    model: this.model
                });
                this.$el.find('.panel-body').html(blogPostEditView.render().el);
            },

            // Renders the view's template to the UI
            render: function() {
                this.model.set({
                    admin: this.admin,
                    renderForListView: this.renderForListView
                });

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