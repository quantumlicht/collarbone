// IndexModel.js

define(["app"],

    function(app) {

        // Creates a new Backbone Model class object
        var BlogPostModel = Backbone.Model.extend({

            validators: {
                futureDate: function(date) {
                    return date > new Date();
                },

                isEmptyString: function(string_to_check) {
                    return string_to_check === '';
                }
            },
            // Model Constructor

            initialize: function() {
                this.set({can_alter:app.session.user.get('username')==this.get('username')});
            },
            
            // Default values for all of the Model attributes
            defaults: {
                title: "",
                username: "Philippe Guay",
                content: ""
            },

            parse: function(response) {
                // console.log('parsing');
                response.id = response._id;
                return response;
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {
                var errors = this.errors = {};

                if (this.validators.isEmptyString(attrs.username)) {
                    this.errors.username = 'username cannot be empty';  
                }

                if (attrs.username !== app.session.get('username')) {
                    this.errors.username = 'username needs to match user session';
                }

            }

        });

        // Returns the Model class
        return BlogPostModel;

    }

);
