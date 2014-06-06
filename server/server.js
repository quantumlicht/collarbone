// DEPENDENCIES
// ============

var newrelic = require('newrelic');
var Config =  global.Config = require('./config/config').config,
    express = require("express"),
    bcrypt = require("bcrypt-nodejs"),
    _ = require("underscore"),
    http =    require("http"),
    exphbs = require('express3-handlebars'),
    path = require('path'),
    port =    ( process.env.PORT || Config.listenPort ),
    mongoose =     require('mongoose'),
    server =  module.exports = express();

// DATABASE CONFIGURATION
// ======================

// Connect to Database
mongoose.connect(Config.database.mongohq_url);
// mongoose.connect('mongodb://' + Config.database.IP + ':' + Config.database.port + '/' + Config.database.name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});


// SERVER CONFIGURATION
// ====================

server.enable('trust proxy');

server.configure('local', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
server.configure('development', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
server.configure('production', function(){
    server.use(express.errorHandler());
});


server.configure(function() {
  
  server.set('views', path.join(__dirname, '/views'));
  
  server.engine('handlebars', exphbs({
    defaultLayout:'main',
    layoutsDir: server.get('views') + '/layouts'
  }));

  server.set('view engine', 'handlebars');
  
  server.use('/', express.static(path.join(__dirname + "./../public")));
  server.use('/tests', express.static(path.join(__dirname + "./../public")));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));


  server.use( express.compress() );
  
  server.use( express.urlencoded() );            // Needed to parse POST data sent as JSON payload
  
  server.use( express.json() );
  
  server.use(express.bodyParser());

  server.use(express.methodOverride());

  server.use( express.cookieParser( Config.cookieSecret ) );           // populates req.signedCookies
  
  server.use( express.cookieSession( Config.sessionSecret ) );  

  server.use(server.router);

});

// API
// ===

require('./routes/api')(server);
require('./routes/blog')(server);
require('./routes/blog_admin')(server);
require('./routes/comments')(server);
require('./routes/index')(server);
require('./routes/tests')(server);
require('./routes/trivia')(server);
require('./routes/users')(server);

// Start Node.js Server
http.createServer(server).listen(port);

console.log('\n\nWelcome to Stacked!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js\n\n');
