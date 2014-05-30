// IndexCollection.js

define(["jquery", "backbone", "models/BlogPostModel"],
	function($, Backbone, Model) {

		// Creates a new Backbone Collection class object
		var BlogPostCollection = Backbone.Collection.extend({

			comparator: function(a, b) {
                console.log('BlogPostCollection','comparator','a',a);
                return new Date(a.get('postDate')).getTime() > new Date(b.get('postDate')).getTime() ? -1: 1;
            },
			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: Model,
			url: '/blogposts'

		});

		// Returns the Model class
		return BlogPostCollection;

	}

);