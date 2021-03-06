// IndexCollection.js

define(["jquery", "backbone", "models/TriviaModel"],
	function($, Backbone, Model) {

		// Creates a new Backbone Collection class object
		var TriviaCollection = Backbone.Collection.extend({

			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: Model,
			url: '/trivia'

		});

		// Returns the Model class
		return TriviaCollection;

	}

);