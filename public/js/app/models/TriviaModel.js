// IndexModel.js

define(["app"],

    function(app) {

        // Creates a new Backbone Model class object
        var TriviaModel = Backbone.Model.extend({


            // Model Constructor
            initialize: function() {
                this.set({alterable:app.session.get('user').name == this.get('username')});
            },
            
            // Default values for all of the Model attributes
            defaults: {
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
        return TriviaModel;

    }

);
