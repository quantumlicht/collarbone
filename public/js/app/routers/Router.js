// Router.js

define(["jquery",
        "backbone",
        "models/BlogPostModel",
        "views/UserView",
        "views/LoginView",
        "views/RegisterView",
        "views/IndexView",
        "views/BlogPostContainerView",
        "views/BlogAdminView",
        "collections/BlogPostCollection"],

    function($, Backbone, BlogPostModel, userView, loginView, RegisterView, indexView, blogPostContainerView, blogAdminView, Collection) {

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                "": "index",
                "blog": "blog",
                "admin": "admin",
                "login": "login",
                "register": "register",

            },  

            index: function() {
                // Instantiates a new view which will render the header text to the page
                this.loadView(new indexView());
            },

            blog: function(){
                this.loadView(new blogPostContainerView());
            },

            admin: function(){    
                this.loadView(new blogAdminView());
            },

            new_users: function() {
                this.loadView(new userView());
            },

            login: function() {
                this.loadView(new loginView());
            },

            register: function() {
                this.loadView(new RegisterView());
            },

            loadView: function(view) {
                // this.view && this.view.remove();
                this.view = view;
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);