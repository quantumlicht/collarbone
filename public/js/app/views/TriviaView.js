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
            partialRender: false,
            // View constructor
            initialize: function(options) {
                if (typeof options.partialRender === 'boolean' ) {
                    this.partialRender = options.partialRender;
                }
                _.bindAll(this);
                this.model.fetch();
                this.listenTo(this.model, 'change', this.render);
                this.admin = options.admin || false;
                this.id = this.model.get('id');
                this.comments = new CommentCollection();
                this.comments.url = '/trivia/' + this.id + '/comments';
                this.comments.fetch({async: false, reset:true});
                // Calls the view's render method
                // this.render();

            },

            // View Event Handlers
            events: {
                'click #commentSubmit': "commentSubmit"
            },

            // Renders the view's template to the UI
            render: function() {
                console.log('TriviaView','render');
                this.model.set({partialRender:this.partialRender});
                // Setting the view's template property using the Underscore template method
                this.$el.html( this.template(this.model.toJSON()));
                this.$el.find('#tooltip-btn').popover();
                if(this.comments) {
                    this.comments.each(function(item) {
                        this.renderComment(item);
                        }, this);
                }
                // Dynamically updates the UI with the view's template
                // Maintains chainability
                return this;

            },

            renderComment: function(comment) {
                var commentView = new CommentView({
                    model: comment,
                    admin: this.admin
                });
                this.$el.find('#commentContainer').append(commentView.render().el);
            },

            commentSubmit: function(e) {
                e.preventDefault();
                console.log('TriviaView', 'commentSubmit', 'author', app.session.get('user').username);
                if( this.$el.find('textarea').val() !== '') {
                    var data = new CommentModel({
                        content: this.$el.find('textarea').val(),
                        username: app.session.get('user').username
                    });
                    this.comments.create(data);
                    this.render();
                }
            },

            close: function(e) {
                console.log('TriviaView', 'close');
                this.$el.find('#tooltip-btn').popover('destroy');
            }

        });

        // Returns the View class
        return TriviaView;

    }

);
