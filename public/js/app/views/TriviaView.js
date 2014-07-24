// IndexView.js

define(["app",
        "utils",
        "views/CommentView",
        "models/CommentModel",
        "collections/TriviaCollection",
        "collections/CommentCollection",
        "text!templates/Trivia.html"],

    function(app, utils, CommentView, CommentModel, TriviaCollection, CommentCollection, template){

        var TriviaView = Backbone.View.extend({

            // The DOM Element associated with this view
            template: Handlebars.compile(template),
            renderForListView: false,
            // View constructor
            initialize: function(options) {
                if (typeof options.renderForListView === 'boolean' ) {
                    this.renderForListView = options.renderForListView;
                }
                _.bindAll(this);
                this.model.fetch();
                this.listenTo(this.model, 'change', this.render);
                this.admin = options.admin || false;

                this.commentCollection = new CommentCollection();
                this.commentCollection.fetch({async:false, reset:true});
                this.comments = this.commentCollection.where({modelId:this.model.id});
            
                this.listenTo(this.commentCollection, 'reset', this.render);
                this.listenTo(this.commentCollection, 'add',this.renderComment);
                this.listenTo(this.commentCollection, 'change', function(model){
                    model.save();
                });
            },

            // View Event Handlers
            events: {
                'click #commentSubmit': "commentSubmit",
                "click .accept-answer": "acceptAnswer"
            },

            acceptAnswer: function(e){
                e.preventDefault();
                accepted_models = this.commentCollection.where({accepted_answer:true});
                console.log('accepted_models', accepted_models);
                _.invoke(accepted_models, 'set', {accepted_answer:false});
                commentId = $(e.currentTarget).data('commentId');
                this.commentCollection.get(commentId).set({accepted_answer:true});
                this.render();
            },

            // Renders the view's template to the UI
            render: function() {
                console.log('TriviaView','render');
                this.model.set({renderForListView:this.renderForListView});
                // Setting the view's template property using the Underscore template method
                this.$el.html( this.template(this.model.toJSON()));
                this.$el.find('#tooltip-btn').popover();
                if(this.comments) {
                    _.each(this.comments, function(item) {
                        item.set('acceptableAsAnswer',this.model.get('alterable'));
                        this.renderComment(item);
                        }, this);
                }


                // Maintains chainability
                return this;

            },

            renderComment: function(comment) {
                console.log('TriviaView', 'renderComment', 'comment', comment);
                var commentView = new CommentView({
                    model: comment
                });
                this.$el.find('#commentContainer').append(commentView.render().el);
            },

            commentSubmit: function(e) {
                e.preventDefault();
                if (app.session.get('user') !== undefined) {
                    var $comment = this.$el.find('textarea');
                    if( $comment.val() !== '') {
                        var formData = new CommentModel({
                            content: this.$el.find('textarea').val(),
                            username: app.session.get('user').username || app.session.get('user').name,
                            modelId: this.model.id,
                            modelUrl: this.model.url(),
                            user_id: app.session.get('user')._id || app.session.get('user').user_id
                        });
                        this.commentCollection.create(formData);
                        $comment.val('');
                    }
                }
                else {
                    utils.showAlert("Error", "You need to be logged in to comment.", "alert-warning");
                    app.router.navigate('#/login', {trigger:true});
                }
            },

            close: function(e) {
                this.$el.find('button#tooltip-btn').popover('destroy');
            }

        });

        // Returns the View class
        return TriviaView;

    }

);
