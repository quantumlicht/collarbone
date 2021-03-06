// IndexCollection.js

define(["jquery", "backbone", "models/CommentModel"],
	function($, Backbone, Model) {

		// Creates a new Backbone Collection class object
		var CommentCollection = Backbone.Collection.extend({

			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: Model,
			url: '/comments'

		});

		// Returns the Model class
		return CommentCollection;

	}

);