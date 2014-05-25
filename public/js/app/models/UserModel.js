// IndexModel.js

define(["app", "utils"],

    function(app, utils) {

        // Creates a new Backbone Model class object
        var UserModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                _.bindAll(this);
            },

            url : function() {                   
                return '/users/test';
            },


            // Default values for all of the Model attributes
            defaults: {
                id: 0,
                username: ''

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },
            
            parse: function(response) {
               response.id = response._id;
               return response;
            }

        });

        // Returns the Model class
        return UserModel;

    }

);
