// IndexModel.js

define(["app"],

    function(app) {

        // Creates a new Backbone Model class object
        var CommentModel = Backbone.Model.extend({

            validators: {
                futureDate: function(date) {
                    return date > new Date();
                },

                isEmptyString: function(string_to_check) {
                    return !string_to_check || string_to_check === '';
                },

                minLength: function(value, minLength) {
                    return value.length >= minLength;
                }
            },

            // Model Constructor
            initialize: function() {
                this.set({alterable:app.session.get('user').name == this.get('username')});
                console.log(this.get('username'));
                console.log(app.session);
                console.log(app.session.user.get('username'));
                console.log('CommentModel', 'initialize', this.get('alterable'));
            },

            defaults: {
                username: "Unknown",
                content: "",
                user_id: "",
                modelUrl: "",
                modelId: "",
                commentDate: new Date()
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
                if(attrs.hasOwnProperty('content')) {
                    if (this.validators.isEmptyString(attrs.content)){
                        errors.content = 'Content cannot be empty';
                    }
                }
                else {
                    errors.content = 'You need to set a content';
                }

                //===============================================================
                if(attrs.hasOwnProperty('user_id')) {
                    if (this.validators.isEmptyString(attrs.user_id)){
                        errors.user_id = 'user_id cannot be empty';
                    }
                }
                else {
                    errors.user_id = 'You need to set a user_id';
                }

                //===============================================================
                if(attrs.hasOwnProperty('modelId')) {
                    if (this.validators.isEmptyString(attrs.modelId)){
                        errors.modelId = 'modelId cannot be empty';
                    }
                }
                else {
                    errors.modelId = 'You need to set a modelId';
                }

                //===============================================================
                if(attrs.hasOwnProperty('modelUrl')){
                    if(this.validators.isEmptyString(attrs.modelUrl)){
                        errors.modelUrl = 'modelUrl cannot be empty';
                    }
                }
                else {
                    errors.modelUrl = 'You need to set a modelUrl';
                }

                //===============================================================
                if (attrs.hasOwnProperty('commentDate')) {
                    if(this.validators.futureDate(attrs.commentDate)) {
                        errors.commentDate = 'Comment date cannot be in the future';
                    }
                } 
                else {
                    errors.commentDate = 'Comment needs to be set';
                }
                //===============================================================

                console.log('errors', errors);
                if (!_.isEmpty(errors)) return errors;

            }

        });

        // Returns the Model class
        return CommentModel;

    }

);
