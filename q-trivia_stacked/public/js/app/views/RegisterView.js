// IndexView.js

define(["jquery", "backbone","handlebars", "collections/UserCollection", "text!templates/Register.html"],

    function($, Backbone, Handlebars, userCollection, template){

        var LoginView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".magic",
            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();
                this.collection = new userCollection();
                this.collection.fetch({reset:true});

            },

            // View Event Handlers
            events: {
                "click #register": "register"
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = Handlebars.compile(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            renderError: function(error, errMsg) {
                error.parent().addClass('has-error');
                error.siblings('.error-field').text(errMsg);
            },

            register: function(e) {
                var formData = {};
                if ($("#password").val() != $("#password-again").val())  {
                    this.renderError($('#password'),'Passwords do not match');
                }
                else{
                    $('#registerForm .form-group').children('input').each(function(i, el) {
                        if ($(el).val()   !='') {
                            formData[el.id] = $(el).val();
                        }
                        $(el).val('');

                        
                    });
                    console.log('creating User');
                    this.collection.create(formData);
                }
            }

        });

        // Returns the View class
        return LoginView;

    }

);
