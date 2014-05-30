// IndexModel.js

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var BlogPostModel = Backbone.Model.extend({


            // Model Constructor

            initialize: function() {
            },
            
            // Default values for all of the Model attributes
            defaults: {
                title: "",
                author: "Philippe Guay",
                content: ""
            },

            parse: function(response) {
                // console.log('parsing');
                response.id = response._id;
                return response;
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return BlogPostModel;

    }

);
