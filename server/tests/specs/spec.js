// SERVER SIDE TEST SUITE
require('../../config/test_config');
var request = require('superagent'),	
	config = require('../../config/config').config,
	mongoose = require('mongoose');
	expect = require('expect.js'),
	BlogPostModel = require('../../models/blog_post'),
	CommentModel = require('../../models/comment'),
	TriviaModel = require('../../models/trivia'),
	UserModel  = require('../../models/user')
	app = require('../../server.js'),
	http = require('http');
	async = require('async');

// BEFORE HOOK
// beforeEach(function(){
// 	this.server = http.createServer(app).listen(3000);
// 	var dbUri = process.env.DB_URL;
// 	mongoose.connect(dbUri);
// 	this.db = mongoose.connection;
// 	cleanDB(this.db);
// });

// afterEach(function(done){
// 	cleanDB(this.db);
// 	this.server.close(done);
// });

// beforeEach(function(){
// });

function cleanDB(db){
	// console.log('------ CLEANING DB----------');
	db.collections.comments.remove({}, function(){});
	db.collections.trivias.remove({}, function(){});
	db.collections.users.remove({}, function(){});
	db.collections.blogposts.remove({}, function(){});
}


// TEST SUITES
describe('API: GET /api/auth', function(){
	it('Should return 200', function(done) {
		request.get('localhost:2000/api/auth').end(function(res) {
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			done();
		});
	});
});


describe('Blogposts Endpoint', function(){
	describe('GET /blogposts', function(){
		beforeEach(function(){
			this.server = http.createServer(app).listen(3000);
			var dbUri = process.env.DB_URL;
			mongoose.connect(dbUri);
			this.db = mongoose.connection;
			cleanDB(this.db);
		});

		afterEach(function(done){
			cleanDB(this.db);
			this.server.close(done);
		});
		it('Should return 200', function(done) {
			request.get('localhost:2000/blogposts').end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				done();
			});
		});

		it('Should return some blogpost models', function(done) {
			request.get('localhost:2000/blogposts').end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body.length).to.be(0);
				done();
			});
		});
	});

	describe(' POST /blogposts', function(){
		beforeEach(function(){
			this.server = http.createServer(app).listen(3000);
			var dbUri = process.env.DB_URL;
			mongoose.connect(dbUri);
			this.db = mongoose.connection;
			cleanDB(this.db);
		});

		afterEach(function(done){
			cleanDB(this.db);
			this.server.close(done);
		});
		it('Should send the created post', function(done) {
			blogpost = new BlogPostModel({
			  	title: 'test-title',
			  	userId: 'user-id',
			  	username: 'test-username',
    			content: 'test-content',
    			postDate: new Date('2014-12-12 00:00:00')
			});
			request.post('localhost:2000/blogposts').send(blogpost).end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body).to.not.be.empty();
				expect(res.body.title).to.be('test-title');
				expect(res.body.userId).to.be('user-id');
				expect(res.body.username).not.to.be('wrong-username');
				expect(res.body.username).to.be('test-username');
				expect(res.body.content).to.be('test-content');
				expect(res.body).to.have.key('postDate');
				expect(res.body).to.have.key('_id');
			});

			request.get('localhost:2000/blogposts').end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body.length).to.be(1);
				done();
			});
		});

		it('Should have unique title', function(done){
			blogpost = new BlogPostModel({
			  	title: 'test-title',
			  	userId: 'user-id',
			  	username: 'test-username',
				content: 'test-content',
				postDate: new Date('2014-12-12 00:00:00')
			});

			//TODO: refactor with async module
			request.post('localhost:2000/blogposts').send(blogpost).end(function(){
				request.post('localhost:2000/blogposts').send(blogpost).end(function(res) {
					expect(res.statusCode).to.be(409);
					done();
				});
				
			});
		});
		it('should make sure the userId exists or matches the username provided');
		it('should make sure the username exist');
		it('should make make sure all fields are passed correctly');
	});

	describe(' PUT /blogposts', function(){
		beforeEach(function(){
			this.server = http.createServer(app).listen(3000);
			var dbUri = process.env.DB_URL;
			mongoose.connect(dbUri);
			this.db = mongoose.connection;
			cleanDB(this.db);
		});

		afterEach(function(done){
			cleanDB(this.db);
			this.server.close(done);
		});
		it('Sanity check', function(done) {
			// SANITY CHECK
			request.get('localhost:2000/blogposts').end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body.length).to.be(0);
				done();
			});
		});

		it('Should modify the blogpost', function(done){
			var self = this;
			blogpost = new BlogPostModel({
			  	title: 'test-title',
			  	username: 'test-username',
			  	userId: 'user-id',
    			content: 'test-content',
    			postDate: new Date('2014-12-12 00:00:00')
			});

			async.waterfall([
				function(cb){
					request.post('localhost:2000/blogposts').send(blogpost).end(function(err, res){
						cb(null, res.body);
					});
				},
				function(model, cb){
					model.title = 'edited-title';
					model.username = 'edited-username';
					request.put('localhost:2000/blogposts/'+ model._id).send(model).end(function(res){
						cb(null, res);
					});	
				}
			], function(err, res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body).to.not.be.empty();
				expect(res.body.title).to.be('edited-title');
				expect(res.body.username).not.to.be('wrong-username');
				expect(res.body.username).to.be('edited-username');
				expect(res.body.content).to.be('test-content');
				expect(res.body).to.have.key('postDate');
				expect(res.body).to.have.key('_id');
				done();
			});
		});
	});
});