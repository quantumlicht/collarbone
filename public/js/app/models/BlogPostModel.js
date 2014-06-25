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
                    return !string_to_check || string_to_check === '';
                },

                minLength: function(value, minLength) {
                    var length  =  value ? value.length : 0;
                    return length >= minLength;
                }
            },
            // Model Constructor

            initialize: function() {
                this.set({alterable:app.session.user.get('username') == this.get('username')});
            },
            
            // Default values for all of the Model attributes
            defaults: {
                title: "Please enter title",
                username: "Philippe Guay",
                content: "Please enter content",
                user_id: "please set id",
                postDate: new Date()
            },

            parse: function(response) {
                response.id = response._id;
                return response;
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {
                var errors = this.errors = {};

                //===============================================================
                if(attrs.hasOwnProperty('username')) {
                    if (this.validators.isEmptyString(attrs.username)){
                        errors.username = 'Username cannot be empty';
                    }
                }
                else {
                    errors.username = 'Username needs to be set';
                }

                //===============================================================
                if (attrs.hasOwnProperty('content')) {
                    if (this.validators.isEmptyString(attrs.content)){
                        errors.content = 'Content cannot be empty';
                    }
                }
                else {
                    errors.content = 'Content needs to be set';
                }

                //===============================================================
                if (attrs.hasOwnProperty('title')) {
                    if (this.validators.isEmptyString(attrs.title)){
                        errors.title = 'Title cannot be empty';
                    }
                }
                else {
                    errors.title = 'Title needs to be set';
                }

                //===============================================================
                if (attrs.hasOwnProperty('user_id')) {
                    if (this.validators.isEmptyString(attrs.user_id)){
                        errors.user_id = 'user_id cannot be empty';
                    }
                }
                else {
                    errors.user_id = 'user_id needs to be set';
                }

                //===============================================================
                if (attrs.hasOwnProperty('postDate')) {
                    if(this.validators.futureDate(attrs.postDate)) {
                        errors.postDate = 'Blog post date cannot be in the future';
                    }
                } 
                else {
                    errors.postDate = 'Post Date needs to be set';
                }
                //===============================================================


                if (!_.isEmpty(errors)) return errors;

            }
        });

        // Returns the Model class
        return BlogPostModel;

    }

);
