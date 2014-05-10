// IndexView.js

define(["app", "collections/UserCollection", "text!templates/Register.html", "text!templates/LoggedIn.html"],

    function(app, userCollection, template, LoggedInTemplate){

        var LoginView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: ".magic",
            // View constructor
            initialize: function() {

                // Calls the view's render method
                _.bindAll(this);
                app.session.on("change:logged_in", this.render);
                console.log('RegisterView', 'initialize');
                // app.session.on("change:logged_in", this.render);
                // this.render();
                // this.collection = new userCollection();
                // this.collection.fetch({reset:true});
                // this.hasErrors = false;

            },

            // View Event Handlers
            events: {
                "click #register": "onRegisterAttempt",
                "keyup #password": "onPasswordKeyup",
                "keyup #password-confirm": "onConfirmPasswordKeyup",
                "focus #registerForm": "cleanErrors"
            },

            // Renders the view's template to the UI
            render: function() {
                console.log('RegisterView', 'render');
                if(app.session.get('logged_in')) this.template = Handlebars.compile(LoggedInTemplate);
                else this.template = Handlebars.compile(template);
                // Setting the view's template property using the Underscore template method
                // this.template = Handlebars.compile(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            renderError: function(error, errMsg) {
                error.parent().addClass('has-error');
                error.siblings('.error-field').text(errMsg);
            },

            cleanErrors: function() {
                console.log('RegisterView', 'cleanError');
                if (this.hasErrors) {
                    $('.form-group').removeClass('has-error');
                    $('.error-field').html('');
                    this.hasErrors = false;
                }
            },

            // Allow enter press to trigger signup
            onConfirmPasswordKeyup: function(evt){
                var k = evt.keyCode || evt.which;

                if (k == 13 && $('#password-confirm').val() === ''){
                    evt.preventDefault();   // prevent enter-press submit when input is empty
                } else if(k == 13){
                    evt.preventDefault();
                    this.onSignupAttempt();
                    return false;
                }
            },

            onPasswordKeyup: function(evt){
                var k = evt.keyCode || evt.which;

                if (k == 13 && $('#password').val() === ''){
                    evt.preventDefault();    // prevent enter-press submit when input is empty
                } else if(k == 13){
                    evt.preventDefault();
                    this.onLoginAttempt();
                    return false;
                }
            },

            onRegisterAttempt: function(evt) {
                if(evt) evt.preventDefault();

                // if form is valid
                var formData = {};
                // if ($("#password").val() != $("#password-again").val())  {
                //     this.renderError($('#password'),'Passwords do not match');
                //     this.hasErrors = true;
                // }
                // if ($('#password').val() === '' || $('#password-again').val() === '') {
                //     this.renderError($('#password'),'Password cannot be empty');
                //     this.hasErrors = true;
                // }
                // if ($("#username").val() === '')  {
                //     this.renderError($('#username'),'Username is empty');
                //     this.hasErrors = true;
                // }

                app.session.signup({
                    username: this.$("#username").val(),
                    password: this.$("#password").val()
                }, {
                    success: function(mod, res) {
                        if (DEBUG) console.log(mod, res);
                    },

                    error: function(mod, res) {
                        if (DEBUG) console.log("ERROR", mod, res);
                    }
                });


                //Error Message if validation not passed.
                // else{
                //     $('#registerForm .form-group').children('input').each(function(i, el) {
                //         if ($(el).val() !== '') {
                //             formData[el.id] = $(el).val();
                //         }
                //         $(el).val('');

                        
                //     });
                //     console.log('creating User', formData);
                //     this.collection.create(formData);
                // }
            }

        });

        // Returns the View class
        return LoginView;

    }

);
