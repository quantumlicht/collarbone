
/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/', function(req, res) {
  		res.render('home', { title: 'Movie Trivia' });
	});

	app.get('/register', function(req, res) {
  		res.render('home', { title: 'Movie Trivia' });
	});
};
