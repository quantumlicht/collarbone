var User = require('../models/user');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_users');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');
var async = require('async');

module.exports = function(app) {

	// var maxUsersPerPage = 5;
	app.get('/users', function(req, res, next) {
		return User.find(function(err, users) {
			if(!err) {
				res.send(users);
			}
			else{
				console.log(err);
			}
		});
		// var page = req.query.page && parseInt(req.query.page, 10) || 0;
		// async.parallel([
		// 	function(next) {
		// 		User.count(next);
		// 	},

		// 	function(next) {
		// 		User.find({})
		// 			.sort('name')
		// 			.skip(page * maxUsersPerPage)
		// 			.limit(maxUsersPerPage)
		// 			.exec(next);	
		// 	}
		// ],
		// 	function(err, results){
		// 		if (err){
		// 			return next(err);
		// 		}

		// 		var count = results[0];
		// 		var users = results[1];

		// 		var lastPage = (page + 1) * maxUsersPerPage >= count;

		// 		res.render('users/index', {
		// 			title: 'Users',
		// 			users: users,
		// 			page:page,
		// 			lastPage: lastPage
		// 		});
		// 	}
		// );
	});

	app.get('/users/new', notLoggedIn, function(req, res) {
		res.render('users/new', {title: "New User"});
	});

	app.get('/users/:name', loadUser, function(req, res, next) {
		res.render('users/profile', {title: 'Users', user: req.user});
	});

	app.post('/users', function(req, res) {
		var user = new User({
			username: req.body.username,
			password: req.body.password
		});
		console.log('test');
		return user.save(function(err) {
			if (!err) {

				console.log('User created', user);
				return res.send(user);
			}
			else {
				if (err.code === 11000) {
					res.send('Conflict', 409);
				}
				console.log(err);	
			}
		});
		// User.create(req.body, function(err){
		// 	if (err) {
		// 		if (err.code === 11000) {
		// 			res.send('Conflict', 409);
		// 		}
		// 		else {
		// 			if (err.name === 'ValidationError') {
		// 				return res.send(Object.keys(err.errors).map(function(errField) {
		// 					return err.errors[errField].message;
		// 				}).join('. '), 406);
		// 			}
		// 			else {
		// 				next(err);
		// 			}
		// 		}
		// 		return;
		// 	}
		// 	res.redirect('/users');			
		// });
	});


	app.del('/users/:name', loadUser, restrictUserToSelf, function(req, res, next) {
		req.user.remove(function(err) {
			if (err) { return next(err); }
			res.redirect('/users');
		});
	});
};