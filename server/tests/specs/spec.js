// SERVER SIDE TEST SUITE
require('../../config/test_config');
var request = require('superagent'),	
	config = require('../../config/config').config,
	expect = require('expect.js'),
	BlogPostModel = require('../../models/blog_post'),
	app = require('../../server.js'),
	http = require('http');

// BEFORE HOOK
before(function(){

	console.log(global.Config);
	this.server = http.createServer(app).listen(3000);
});

// AFTER HOOK
after(function(done){
	this.server.close(done);
	
});

// TEST SUITES
describe('API: GET /hello', function() {
	it('Should return 404', function(done) {
		request.get('localhost:2000/hello').end(function(res) {
			expect(res).to.exist;
			expect(res.status).to.equal(404);
			done();
		});
	});
});

describe('API: GET /blogposts', function(){
	it('Should return 200', function(done) {
		request.get('localhost:2000/blogposts').end(function(res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.body.length).to.be(0);
			done();
		});
	});
});


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
		it('Should return 200', function(done) {
			request.post('localhost:2000/blogposts').end(function(res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				done();	
			});
		});
		it('Should send the created post', function(done) {
			blogpost = new BlogPostModel({
			  	title: 'test-title',
			  	author: 'test-author',
    			userId: 'userId',
    			content: 'test-content',
    			postDate: new Date('2014-12-12 00:00:00')
			});
			request.post('localhost:2000/blogposts').send(blogpost).end(function(res){
				expect(res).to.exist;
				expect(res.body).to.not.be.empty();
				expect(res.body.title).to.be('test-title');
				expect(res.body.author).not.to.be('wrong-author');
				expect(res.body.author).to.be('test-author');
				expect(res.body.userId).to.be('userId');
				expect(res.body.content).to.be('test-content');
				expect(res.body).to.have.key('postDate');
				expect(res.body).to.have.key('_id');
				done();
			});
		});
	});
});