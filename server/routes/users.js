var User = require('../models/user');
var Comment = require('../models/comment');
var Trivia = require('../models/trivia');
var notLoggedIn = require('./middleware/not_logged_in');
var _ = require('underscore');
var loadUser = require('./middleware/load_users');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');
var async = require('async');

module.exports = function(server) {

	// var maxUsersPerPage = 5;
	server.get('/users', function(req, res, next) {
		return User.find(function(err, users) {
			if(!err) {

				filtered_users = _.map(users, function(user) {
					return _.pick(user, 'username', '_id');

				});

				console.log('GET /users', filtered_users);
				res.send(filtered_users);
			}
			else {
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

	server.get('/users/:username', function(req, res, next) {
		console.log('GET /users/:username', req.params);
		async.parallel(
			{
				user: function(next) {
					User.findOne({username: req.params.username}).exec(next);
				},
				comments: function(next) {
					Comment.find({username: req.params.username}).exec(next);
				},
				trivias: function(next) {
					Trivia.find({author: req.params.username}).exec(next);
				}	
			},
			function(err, results) {
				if(err){
					return next(err);
				}
				console.log('/users/:username', 'results', results);

				var data = {
					users: results.user,
					comments: results.comments,
					trivias: results.trivias
				}
				// console.log('GET /users/:username','username:', req.params.username,'data', data);
				res.send(data);
			}
		);
	});

	server.post('/users', function(req, res) {
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


	server.del('/users/:name', loadUser, restrictUserToSelf, function(req, res, next) {
		req.user.remove(function(err) {
			if (err) { return next(err); }
			res.redirect('/users');
		});
	});
};