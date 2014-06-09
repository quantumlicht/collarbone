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
                },

                minLength: function(value, minLength) {
                    return value.length >= minLength;
                }
            },
            // Model Constructor

            initialize: function() {
                this.on("invalid", function(model, error){
                    console.log('BlogPostModel error', error);
                });
                this.set({can_alter:app.session.user.get('username') == this.get('username')});
            },
            
            // Default values for all of the Model attributes
            defaults: {
                title: "Please enter title",
                username: "Philippe Guay",
                content: "Please enter content"
            },

            parse: function(response) {
                // console.log('parsing');
                response.id = response._id;
                return response;
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {
                console.log('BlogPostModel', 'validate');
                var errors = this.errors = {};

                if(attrs.username != null) {
                    if (this.validators.isEmptyString(attrs.username)) {
                        errors.username = 'username cannot be empty';  
                    }

                    console.log('username validator', attrs.username);
                    if (!this.validators.minLength(attrs.username, 2)){
                        errors.username = 'Username should be at least 2 characters';
                    }

                    // if (attrs.username !== app.session.get('username')) {
                    //     errors.username = 'username needs to match user session';
                    // }
                }
                else {
                    errors.username = 'Username needs to be set';
                }

                if (attrs.content != null) {
                    if (this.validators.isEmptyString(attrs.content)){
                        errors.content = 'Content cannot be empty';
                    }
                }
                else {
                    errors.content = 'Content needs to be set';
                }

                if (attrs.title != null) {
                    if (this.validators.isEmptyString(attrs.title)){
                        errors.title = 'Title cannot be empty';
                    }
                }
                else {
                    errors.title = 'Title needs to be set';
                }
                
                return errors;
            }
        });

        // Returns the Model class
        return BlogPostModel;

    }

);
