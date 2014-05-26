// IndexView.js

define([
    "app",
    "utils",
    "text!templates/Header.html"
],  function(app, utils, template){

        var HeaderView = Backbone.View.extend({

            // The DOM Element associated with this view
            template: Handlebars.compile(template),
            // View constructor,
            initialize: function() {

                _.bindAll(this);
                app.session.on("change:logged_in", this.onLoginStatusChange);

                // // Calls the view's render method
                // this.render();

            },

            // View Event Handlers
            events: {
                "click #logout-link": "onLogoutClick",
                "click #remove-account-link": "onRemoveAccountClick"
            },

            onLoginStatusChange: function(evt){
                this.render();
                if(app.session.get("logged_in")) utils.showAlert("Success!", "Logged in as "+app.session.user.get("username"), "alert-success");
                else {
                    utils.showAlert("See ya!", "Logged out successfully", "alert-success");
                    app.router.navigate('/', {trigger:true});
                }
                    
            },

            onLogoutClick: function(evt) {
                evt.preventDefault();
                app.session.logout({});  // No callbacks needed b/c of session event listening
            },

            onRemoveAccountClick: function(evt){
                evt.preventDefault();
                app.session.removeAccount({});
                this.render();
            },

            // Renders the view's template to the UI
            render: function() {
                if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                console.log('HeaderView','render', 'app.session', app.session);
                this.$el.html(this.template({
                    logged_in: app.session.get("logged_in"),
                    user: app.session.user.toJSON()
                }));

                return this;

            }

        });

        // Returns the View class
        return HeaderView;

    }

);
