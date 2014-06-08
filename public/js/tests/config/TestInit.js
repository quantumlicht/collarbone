// TestInit.js
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

      "lodash": "libs/lodash/dist/lodash",

      "backbone": "libs/backbone/backbone",

      "handlebars": "libs/handlebars/handlebars",

      "bootstrap": "libs/bootstrap/dist/js/bootstrap",

      "jasmine": "libs/jasmine/lib/jasmine-core/jasmine",

      "jasmine-html": "libs/jasmine/lib/jasmine-core/jasmine-html",

      "hbar_helpers": "app/hbar_helpers",
      
      "boot": "libs/jasmine/lib/jasmine-core/boot",


      // Plugins
      // =======

      "backbone.validateAll": "libs/plugins/Backbone.validateAll",

      "text": "libs/text/text",

      "jasmine-jquery": "libs/jasmine-jquery/lib/jasmine-jquery",
      
      "app": "app/app",

      "utils": "app/utils",


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

      // Jasmine-jQuery plugin
      "jasmine-jquery": ["jquery"],

      // Backbone
      "backbone": {

          // Lists jQuery and Underscore as dependencies
          "deps": ["underscore", "jquery"],

          // Exports the global 'window.Backbone' object
          "exports": "Backbone"

      },

      "bootstrap": ["jquery"],

      // Backbone.validateAll depends on Backbone
      "backbone.validateAll": ["backbone"],

      // Jasmine Unit Testing
      "jasmine": {

        // Exports the global 'window.jasmine' object
        exports: "window.jasmineRequire"

      },

      // Jasmine Unit Testing helper
      "jasmine-html": {

        deps: ["jasmine"],

        exports: "window.jasmineRequire"

      },

      "boot": {
        deps: ['jasmine', 'jasmine-html'],
        exports: 'window.jasmineRequire'
      }

  }

});

var specs = [];

specs.push('tests/specs/spec');
specs.push('tests/specs/spec_view');
// Include JavaScript files here (or inside of your router)
require(["handlebars",
         "underscore",
         "backbone",
         "app",
         "utils",
         "hbar_helpers",
         "boot",
         "events"],

  function(Handlebars, _, backbone, app, utils, hbar_helpers, boot) {


    require(specs, function() {
      window.onload();  
      // jasmine_html.getEnv().addReporter(new jasmine_html.TrivialReporter());

      // jasmine_html.getEnv().execute();

    });
  }

);