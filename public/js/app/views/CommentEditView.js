// IndexView.js

define(["app", "collections/CommentCollection", "text!templates/CommentEdit.html"],

    function(app, CommentCollection, template){

        var CommentEditView = Backbone.View.extend({


            template: Handlebars.compile(template),
            // View constructor
            initialize: function(options) {
                _.bindAll(this);
                this.collection = new CommentCollection();
            },

            // View Event Handlers
            events: {
                "click #comment-edit-cancel": "removeEdit",
                "click #comment-edit-save": "saveEdit"
            },

            removeEdit: function(){
                this.model.trigger('comment-edit');
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.html(this.template({content:this.model.get('content')}));

                // Maintains chainability
                return this;

            },

            saveEdit: function(){
                this.model.set('content', $('.commentEdit').val());
                this.collection.create(this.model);
                this.model.trigger('comment-edit');
            }

        });

        // Returns the View class
        return CommentEditView;

    }

);
