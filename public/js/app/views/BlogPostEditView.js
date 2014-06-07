// IndexView.js

define(["app", "collections/BlogPostCollection", "text!templates/BlogPostEdit.html"],

    function(app, BlogPostCollection, template){

        var BlogPostEditView = Backbone.View.extend({


            template: Handlebars.compile(template),
            // View constructor
            initialize: function(options) {
                _.bindAll(this);
                this.collection = new BlogPostCollection();
            },

            // View Event Handlers
            events: {
                "click #blogpost-edit-cancel": "removeEdit",
                "click #blogpost-edit-save": "saveEdit"
            },

            removeEdit: function(){
                console.log('BlogPostEditView', 'removeEdit');
                this.model.trigger('blogpost-edit');
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.html(this.template({content:this.model.get('content')}));

                // Maintains chainability
                return this;

            },

            saveEdit: function(){
                console.log('BlogPostEditView', 'saveEdit');
                this.model.set('content', $('.blogpost-edit').val());
                this.collection.create(this.model);
                this.model.trigger('blogpost-edit');
            }

        });

        // Returns the View class
        return BlogPostEditView;

    }

);
