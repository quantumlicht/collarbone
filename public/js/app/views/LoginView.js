// IndexView.js

define(["jquery", "backbone","handlebars","collections/UserCollection", "text!templates/Login.html"],

    function($, Backbone, Handlebars, userCollection, template){

        var LoginView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".magic",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();
                this.collection = new userCollection();
                this.collection.fetch();

            },

            // View Event Handlers
            events: {
                "click #login": "login"
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


            login: function(e) {
                e.preventDefault();
                this.collection.fetch({reset: true});
                this.collection.each(function(el, i){
                    if ( el.attributes.password === $('#password').val() &&
                    el.attributes.username === $('#username').val() ) {
                        $("#loginForm").submit();
                    } 
                });
                this.renderError({},'Wrong Password or Username');
                formData = {};

                if ($("#password").val() ==='' || $("#username").val() === '') {
                    this.renderError({},'Password or Username cannot be empty');
                }
            },
            
            renderError: function(error, errMsg) {
                $('.error-field').html(errMsg);
            }

        });

        // Returns the View class
        return LoginView;

    }

);
