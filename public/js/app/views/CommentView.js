
define(["app",
        "utils",
        "models/CommentModel",
        "views/CommentEditView",
        "collections/CommentCollection",
        "text!templates/Comment.html"],

    function(app, utils, Model, CommentEditView, CommentCollection, CommentTemplate){

        var CommentView = Backbone.View.extend({

            tagName: 'div',
            className: 'comment',
            template: Handlebars.compile(CommentTemplate),
          
            // View constructor
            initialize: function(options) {
                this.admin = options.admin;
                _.bindAll(this);
                this.listenTo(this.model, 'comment-edit', this.render);
            },

            // View Event Handlers
            events: {
                "click .accept-answer": "acceptAnswer",
                "click .delete-comment": "deleteComment",
                "click .edit-comment": "editComment"
            },

            // acceptAnswer: function(e){
            //     this.model.save({'accepted_answer': true});
            // },

            deleteComment: function(evt){
                this.remove();
                this.model.destroy({
                    success: function () {
                        utils.showAlert('Success', 'Comment deleted successfully' ,'alert-info');
                        // window.history.back();
                    },
                    error: function(err){
                        console.error(err);
                    }

                });
                return false;
            },

            editComment: function(evt){
                console.log('CommentView', 'editComment', 'content', this.model.get('content'));
                var commentEditView = new CommentEditView({
                    model: this.model
                });
                this.$el.find('#comment-container').html(commentEditView.render().el);

            },
            // Renders the view's template to the UI
            render: function() {
                console.log('CommentView', 'render', this.model.toJSON()); 
                this.template = Handlebars.compile(CommentTemplate);
                this.$el.html(this.template(this.model.toJSON()));

                var $commentText = this.$el.find('#comment-container');
                $commentText.html(utils.applyHyperLinks($commentText.text()));


                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return CommentView;

    }

);