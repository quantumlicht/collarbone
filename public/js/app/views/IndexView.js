// IndexView.js

define(["app",
        "views/BlogPostContainerView",
        "text!templates/Index.html", "text!templates/LoggedIn.html"],

    function(app, BlogPostContainerView, IndexTemplate, LoggedInTemplate){

        var IndexView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: ".magic",
            template: Handlebars.compile(IndexTemplate),
            // View constructor
            initialize: function() {

                // Calls the view's render method
                _.bindAll(this);
                app.session.on("change:logged_in", this.render);
                console.log('LoginView', 'initialize');
                this.blogView = new BlogPostContainerView();
                // this.render();

            },

            // View Event Handlers
            events: {
                "click #login": "redirectLogin",
                "click #register": "redirectRegister"
            },

            redirectRegister: function(){
                app.router.navigate('/register', {trigger:true});
            },

            redirectLogin: function(){
                app.router.navigate('/login', {trigger:true});
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                // Dynamically updates the UI with the view's template
                if(app.session.get('logged_in')){
                    app.router.navigate('', {trigger:true});
                }

                console.log('IndexView','render','app.session.user.toJSON', app.session.toJSON());
                this.$el.html(this.template({
                    logged_in: app.session.get('logged_in'),
                    user: app.session.user.toJSON()
                }));


                console.log('IndexView', 'render', 'adding blogview');
                this.$el.append(this.blogView.$el);
                this.blogView.render();
                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return IndexView;

    }

);
