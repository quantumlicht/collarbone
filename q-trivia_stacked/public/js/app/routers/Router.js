// Router.js

define(["jquery", "backbone", "models/BlogPostModel","views/IndexView", "views/BlogPostContainerView", "collections/BlogPostCollection"],

    function($, Backbone, Model, indexView, blogView, Collection) {

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                "": "index",
                "blog": "blog"

            },  

            index: function() {
                // Instantiates a new view which will render the header text to the page
                new indexView();
            },
            blog: function(){
                new blogView();
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);