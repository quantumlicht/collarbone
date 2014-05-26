// Router.js

define([
    "app",
    "models/BlogPostModel",
    "models/UserModel",
    "views/HeaderView",
    "views/LoginView",
    "views/RegisterView",
    "views/IndexView",
    "views/BlogPostContainerView",
    "views/BlogAdminView",
    "views/TriviaContainerView",
    "views/TriviaView",
    "views/UserView",
    "collections/BlogPostCollection",
    "collections/TriviaCollection",
    "collections/UserCollection"

    ],

    function(app,
             BlogPostModel,
             UserModel,
             HeaderView,
             LoginView,
             RegisterView,
             IndexView,
             blogPostContainerView,
             blogAdminView,
             TriviaContainerView,
             TriviaView,
             UserView,
             Collection,
             TriviaCollection,
             UserCollection) {

        Backbone.View.prototype.close = function () {
            this.$el.empty();
            this.unbind();
        };

        var Router = Backbone.Router.extend({

            initialize: function() {

                _.bindAll(this);
                // Tells Backbone to start watching for hashchange events
                // Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                "": "index",
                "register": "register",
                "blog": "blog",
                "trivia": "triviaList",
                "trivia/:id" : "trivia",
                "users/:username": "userprofile",
                "admin": "admin",
                "login": "login"    
            },  

            index: function() {
                console.log('Router', 'index');
                // Instantiates a new view which will render the header text to the page
                var hasPushState = !!(window.history && history.pushState);
                if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
                else {
                    console.log('Router','index','has push state');
                    this.show( new IndexView({}) );
                    //if(app.session.get('logged_in')) this.show( new LoginPageView({}) );
                    //else this.show( new LoggedInPageView({}) );
                }        
            },

            blog: function(){
                this.show(new blogPostContainerView());
            },

            admin: function(){
                console.log('Router','admin');
                this.show(new blogAdminView());
            },

            new_users: function() {
                this.show(new userView());
            },

            login: function() {
                console.log('Router', 'login');
                this.show(new LoginView());
            },

            register: function() {
                console.log('Router', 'register');
                var hasPushState = !!(window.history && history.pushState);
                if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
                else {
                    console.log('Router','register','has push state');
                    this.show( new RegisterView({}) );
                }
            },

            triviaList: function(){
                this.show(new TriviaContainerView());
            },

            trivia: function(id) {
                var collection = new TriviaCollection();
                collection.fetch({reset:true, async:false});
                
                var model = collection.get(id);
                this.show(new TriviaView({model: model}));
            },

            userprofile: function(username) {
                var self = this;
                var collection = new UserCollection();

                collection.bind('reset', function () { 
                    var model = collection.findWhere({username: username});
                    var view = new UserView({model: model});
                    self.show(view);
                });
                collection.fetch({reset:true});
            },

            loadView: function(view) {
                if (this.view) this.view.close();
                // this.view && this.view.remove();
                this.view = view;
            },

            show: function(view, options) {
                if (!this.headerView) {
                    this.headerView = new HeaderView({});
                    this.headerView.setElement($("header")).render();
                }

                console.log('Router', 'show', 'this.currentView', this.currentView);
                if (this.currentView) this.currentView.close();
                this.currentView = view;
                console.log('Router','show', 'this.currentView', this.currentView);

                // Need to be authenticated before rendering view.
                // For cases like a user's settings page where we need to double check against the server.
                if (typeof options !== 'undefined' && options.requiresAuth){        
                    var self = this;
                    app.session.checkAuth({
                        success: function(res){
                            console.log('Router','show', 'success callback');
                            // If auth successful, render inside the page wrapper
                            $('#content').html( self.currentView.render().$el);
                        }, error: function(res){
                            self.navigate("/", { trigger: true, replace: true });
                        }
                    });

                } else {
                    // Render inside the page wrapper
                    console.log('Router', 'show', 'no options or requiresAuth false');
                    $('#content').html(this.currentView.render().$el);
                    //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
                }
            }
        });

        // Returns the DesktopRouter class
        return Router;

    }

);