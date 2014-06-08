// Init.js
// =======

if (typeof DEBUG === 'undefined') DEBUG = false;

require.config({

   // Sets the js folder as the base directory for all future relative paths
   baseUrl: "./js",

   // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
   // probably a good idea to keep version numbers in the file names for updates checking
   paths: {

      // Core Libraries
      // ==============
      "jquery": "libs/jquery/dist/jquery",

      "underscore": "libs/lodash/dist/lodash",

      "backbone": "libs/backbone/backbone",

      "marionette": "libs/marionette/lib/backbone.marionette",

      "handlebars": "libs/handlebars/handlebars",

      "bootstrap": "libs/bootstrap/dist/js/bootstrap",

      "app": "app/app",

      "google": "app/google",

      "utils": "app/utils",

      "hbar_helpers": "app/hbar_helpers",

      "newrelic": "app/newrelic",
      // Plugins
      // =======

      "backbone.validateAll": "libs/plugins/Backbone.validateAll",

      "text": "libs/text/text",

      // Application Folders
      // ===================

      "collections": "app/collections",      

      "models": "app/models",

      "routers": "app/routers",

      "templates": "app/templates",

      "views": "app/views",

      "events": "app/events/Notifier"

   },

   // Sets the configuration for your third party scripts that are not AMD compatible
   shim: {

      // Bootstrap
      "bootstrap": ["jquery"],

      // Backbone
      "backbone": {

        // Depends on underscore/lodash and jQuery
        "deps": ["underscore", "jquery"],

        // Exports the global window.Backbone object
        "exports": "Backbone"

      },
      
      'handlebars': {
        exports: 'Handlebars'
      },

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.validateAll": ["backbone"]
   }

});
require(['newrelic']);
// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["app", "utils", "hbar_helpers", "handlebars", "routers/Router","models/SessionModel", "bootstrap", "backbone.validateAll"],

   function(app, utils, hbar_helpers, Handlebars, Router, sessionModel) {
    
      // Main
      // Backbone.emulateHTTP = true;

      // Instantiates a new Desktop Router instance
      app.router = new Router();
      app.session = new sessionModel();

      // Check the auth status upon initialization,
      // before rendering anything or matching routes
      app.session.checkAuth({

         // Start the backbone routing once we have captured a user's auth status
         complete: function(){
            // HTML5 pushState for URLs without hashbangs
            var hasPushstate = !!(window.history && history.pushState);
            if(hasPushstate){
               // Backbone.history.start({ pushState: true, root: '/' } );
               Backbone.history.start(); 
            } 
            else Backbone.history.start();   
         }
      });   

      $('#content-app').on("click", "a:([data-bypass])", function(evt) {
         console.log('Init', 'data bypass');
         evt.preventDefault();
         var href = $(this).attr("href");
         app.router.navigate(href, { trigger : true, replace : false } );
      });


      // window.onhashchange = function(){ 
      //    $('ul.navbar-nav').find('li').removeClass('active');
      //    $('#loc-' + Backbone.history.fragment).addClass('active');
      // };
   }
);
