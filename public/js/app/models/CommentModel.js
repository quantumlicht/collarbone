// IndexModel.js

define(["app"],

    function(app) {

        // Creates a new Backbone Model class object
        var CommentModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                this.set({can_alter:app.session.user.get('username')==this.get('username')});
            },

            // url: function(){
            //     // console.log('CommentView', 'url', '/blogposts/' + this.model.modelId + '/comments/' + this.model._id);
            //     return '/blogposts/' + this.get('modelId') + '/comments/' + this.get('_id');
            // },
            // Default values for all of the Model attributes
            defaults: {
                username: "Unknown",
                commentDate: new Date()
            },

            parse: function(response) {
                response.id = response._id;
                return response;
            },


            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return CommentModel;

    }

);
