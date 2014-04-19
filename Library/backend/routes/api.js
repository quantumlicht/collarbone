var BookModel = require('../data/models/book');

module.exports = function(app) {



	app.get('/api/books', function(req, res) {
		return BookModel.find(function(err, books) {
			if( !err) {
				return res.send(books);
			}
			else {
				return console.log(err);
			}
		});
	});

	app.put('/api/books/:id', function(req, res) {
		console.log( 'Updating book ' + req.body.title );
		return BookModel.findById( request.params.id, function(err, book) {
			book.title = req.body.title;
			book.author = req.body.author;
			book.releaseDate = req.body.releaseDate;
			book.keywords = req.body.keywords;

			return book.save( function(err) {
				if (!err) {
					console.log('book updated');
					return res.send(book);
				}
				else {
					console.log(err);
				}
			});
		});
	});

	app.get( '/api/books/:id', function(req, res) {
		return BookModel.findById(req.params.id, function(err, book) {
			if (!err) {
				return res.send(book);
			}
			else {
				return console.log(err);
			}
		});
	});

	app.post('/api/books', function(req, res) {
		var book = new BookModel({
			title: req.body.title,
			author: req.body.author,
			releaseDate: req.body.releaseDate,
			keywords: req.body.keywords
		});

		return book.save(function(err) {
			if (!err) {
				console.log('book created', book);
				return res.send(book);
			}
			else {
				console.log(err);
			}

		});
	});

	app.delete('/api/books/:id', function(req, res) {
		console.log('Deleting book with id: ' + req.params.id);
		return BookModel.findById(req.params.id, function(err, book) {
			return book.remove(function(err) {
				if (!err) {
					console.log('Book removed');
					return res.send('');
				}
				else {
					return console.log(err);
				}
			});
		});
	});
};