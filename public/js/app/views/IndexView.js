// IndexView.js

define(["app", "views/BlogPostContainerView",  "text!templates/Index.html", "text!templates/LoggedIn.html"],

    function(app, BlogPostContainerView, IndexTemplate, LoggedInTemplate, BlogPostContainer){

        var IndexView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: ".magic",

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
                if(app.session.get('logged_in')) this.template = Handlebars.compile(LoggedInTemplate);
                else this.template = Handlebars.compile(IndexTemplate);

                // Setting the view's template property using the Underscore template method

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template({
                    user: app.session.user.toJSON()
                }));

                this.$el.append(this.blogView.render());

                // Dynamically updates the UI with the view's template
                if (this.$el) {

                    this.$el.html(this.template);
                }
                else {
                    this.append(this.template);

                }

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return IndexView;

    }

);
