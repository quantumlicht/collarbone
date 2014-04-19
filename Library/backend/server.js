var application_root = __dirname,
	express = require('express'),
	// routes = require('./routes'),
	path = require('path'),
	mongoose = require('mongoose');

var app = express();
dbUrl = 'mongodb://localhost/library_database';
var db = require('mongoose').connect(dbUrl);


app.configure(function(){
	app.use(express.bodyParser());

	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express.static(path.join(application_root, '../site')));

	app.use(express.errorHandler({ dumpExceptions: true, showStack:true}));

});

var port = 2000;
require('./routes/api')(app);

app.listen(port, function(){
	console.log('Express servier listening on port %d in %s mode', port, app.settings.env);
});

// app.get( '/api', function( request, response ) {
//     response.send( 'Library API is running' );
// });