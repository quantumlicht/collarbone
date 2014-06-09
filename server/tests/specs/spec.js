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

// BEFORE HOOK
before(function(){
	this.server = http.createServer(app).listen(3000);
	var dbUri = process.env.DB_URL;
	mongoose.connect(dbUri);
	this.db = mongoose.connection;
});

afterEach(function(){
	cleanDB(this.db);
});

beforeEach(function(){
	cleanDB(this.db);
});

function cleanDB(db){
	// console.log('------ CLEANING DB----------');
	db.collections.comments.remove({}, function(){});
	db.collections.trivias.remove({}, function(){});
	db.collections.users.remove({}, function(){});
	db.collections.blogposts.remove({}, function(){});
}
// AFTER HOOK
after(function(done){
	this.server.close(done);

});


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
		it('Should send the created post', function(done) {
			blogpost = new BlogPostModel({
			  	title: 'test-title',
			  	username: 'test-username',
    			userId: 'userId',
    			content: 'test-content',
    			postDate: new Date('2014-12-12 00:00:00')
			});
			request.post('localhost:2000/blogposts').send(blogpost).end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body).to.not.be.empty();
				expect(res.body.title).to.be('test-title');
				expect(res.body.username).not.to.be('wrong-username');
				expect(res.body.username).to.be('test-username');
				expect(res.body.userId).to.be('userId');
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
	});

	describe(' PUT /blogposts', function(){
		it('Sanity check', function(done) {
			// SANITY CHECK
			request.get('localhost:2000/blogposts').end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body.length).to.be(0);
				done();
			});
		});

		it('Should modify the blogpost', function(){
			blogpost = new BlogPostModel({
			  	title: 'test-title',
			  	username: 'test-username',
    			userId: 'userId',
    			content: 'test-content',
    			postDate: new Date('2014-12-12 00:00:00')
			});
			var savedModel;
			request.post('localhost:2000/blogposts').send(blogpost).end(function(res){
				savedModel = res.body;
				savedModel.title = 'edited-title';
				savedModel.username = 'edited-username';
				savedModel.userId = 'edited-userId';

				request.put('localhost:2000/blogposts/'+ savedModel._id).send(blogpost).end(function(res){
					expect(res).to.exist;
					expect(res.status).to.equal(200);
					expect(res.body).to.not.be.empty();
					expect(res.body.title).to.be('edited-title');
					expect(res.body.username).not.to.be('wrong-username');
					expect(res.body.username).to.be('edited-username');
					expect(res.body.userId).to.be('edited-userId');
					expect(res.body.content).to.be('test-content');
					expect(res.body).to.have.key('postDate');
					expect(res.body).to.have.key('_id');
					done();
				});
			});




		});
	});
});