// IndexView.js

define(["app", "utils", "models/CommentModel","collections/CommentCollection", "text!templates/Comment.html"],

    function(app, utils, Model, CommentCollection, template){

        var CommentView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: '#commentContainer',
            tagName: 'div',
            className: 'comment',
            template: Handlebars.compile(template),

          
            // View constructor
            initialize: function(options) {
                this.admin = options.admin;
                this.render();
                _.bindAll(this);
                // this.collection = new CommentCollection();
                // this.collection.fetch({reset:true});

                // this.listenTo(this.collection,'reset', this.render);
                // this.collection.remove(this.model);
                // this.listenTo(this.model, 'destroy', this.render);
                // this.model.bind('remove', function(){
                //     console.log('destroying model');
                //     self.destroy();
                // });

            },

            // View Event Handlers
            events: {
                "click .delete-comment": "deleteComment"
            },

            deleteComment: function(evt){
                console.log('CommentView','deleteComment','model', this.model);
                console.log('CommentView','deleteComment','model is new ?', this.model.isNew());
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
            // Renders the view's template to the UI
            render: function() {
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template($.extend(this.model.toJSON(), {admin: this.admin})));

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return CommentView;

    }

);