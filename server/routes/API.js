var User = require('../models/user');
var _ = require('underscore');
var bcrypt = require("bcrypt-nodejs");
var Config = require('../config/config').config;


module.exports = function(app) {

	app.get("/api/auth", function(req, res){
		console.log('/api/auth', 'req.signedCookies', req.signedCookies);
		console.log('/api/auth', 'user_id', req.signedCookies.user_id);

	    User.findOne({_id:req.signedCookies.user_id, auth_token: req.signedCookies.auth_token}, function(err, user){
	        if(user){
	        	console.log('/api/auth','found user: ', user);
	            res.json({ user: _.omit(user, ['password', 'auth_token']) });   
	        } else {  
	            res.json({ error: "Client has no valid login cookies."  });   
	        }
	    });
	});


	app.post("/api/auth/login", function(req, res){
	    User.findOne({username: req.body.username}, function(err, user){
	        if(user){

	            // Compare the POSTed password with the encrypted db password
	            if( bcrypt.compareSync( req.body.password, user.password)){
	                res.cookie('user_id', user._id, { signed: true, maxAge: Config.cookieMaxAge  });
	                res.cookie('auth_token', user.auth_token, { signed: true, maxAge: Config.cookieMaxAge  });

	                // Correct credentials, return the user object
	                res.json({ user: _.omit(user, ['password', 'auth_token']) });   

	            } else {
	                // Username did not match password given
	                res.json({ error: "Invalid username or password."  });   
	            }
	        } else {
	            // Could not find the username
	            res.json({ error: "Username does not exist."  });   
	        }
	    });
	});

	// POST /api/auth/signup
	// @desc: creates a user
	app.post("/api/auth/signup", function(req, res){
		console.log('api/auth/signup', 'req.body', req.body);
		var user = {
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			auth_token: bcrypt.genSaltSync(8)
		};
		User.create(user, function(err, user){
			if (err) {
				if (err.code === 11000) {
					res.send('Conflict', 409);
				}
				else {
					if (err.name === 'ValidationError') {
						return res.send(Object.keys(err.errors).map(function(errField) {
							return err.errors[errField].message;
						}).join('. '), 406);
					}
					else {
						res.cookie('user_id', user.id, { signed: true, maxAge: Config.cookieMaxAge  });
                    	res.cookie('auth_token', user.auth_token, { signed: true, maxAge: Config.cookieMaxAge  });
                    	res.json({ user: _.omit(user, ['password', 'auth_token']) });   
						// next(err);
					}
				}
				return;
			}
			// res.redirect('/users');			
		});
	});

	// POST /api/auth/logout
	// @desc: logs out a user, clearing the signed cookies
	app.post("/api/auth/logout", function(req, res){
    	res.clearCookie('user_id');
    	res.clearCookie('auth_token');
    	res.json({ success: "User successfully logged out." });
	});

	// POST /api/auth/remove_account
	// @desc: deletes a user
	app.post("/api/auth/remove_account", function(req, res){
    User.remove({_id:req.signedCookies.user_id, auth_token:req.signedCookies.auth_token}, function(err){
        if(err){ 
            res.json({ error: "Error while trying to delete user." });
        } else {
            res.clearCookie('user_id');
            res.clearCookie('auth_token');
            res.json({ success: "User successfully deleted." });
        }
    });
});
	
};