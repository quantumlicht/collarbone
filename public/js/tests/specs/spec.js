// Jasmine Unit Testing Suite
// ==========================

define(["app",
        "text!templates/BlogPost.html",
        "views/BlogPostView",
        "models/BlogPostModel",
        "models/CommentModel",
        "collections/BlogPostCollection",
        "routers/Router",
        "jasmine-jquery"],

    function(app, template, View, BlogPostModel, CommentModel, Collection, Router) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("A blogPostModel", function() {
            it("can be created with default values", function(){
                var post = new BlogPostModel();
                expect(post.get('username')).toBe('Philippe Guay');
                expect(post.get('title')).toBe('');
                expect(post.get('content')).toBe('');
            });

            it("can store various values", function(){
                var post = new BlogPostModel({
                    title: 'This is a title',
                    username: 'username string',
                    userId: '12345abcde',
                    postDate: new Date('2014-12-12'),
                    content: 'Content'
                });
                expect(post.get('title')).toBe('This is a title');
                expect(post.get('username')).toBe('username string');
                expect(post.get('userId')).toBe('12345abcde');
                expect(post.get('postDate')).toEqual(jasmine.any(Date)); 
                expect(post.get('postDate')).toEqual(new Date('2014-12-12'));

                expect(post.get('content')).toBe('Content');

                expect(post.get('invalid property')).not.toBeDefined();

            });
        });

        describe("a commentModel", function() {
            it("can be created with default values", function(){
                var comment = new CommentModel();
                expect(comment.get('username')).toBe('Unknown');
                expect(comment.get('commentDate')).toEqual(jasmine.any(Date));
                expect(comment.get('commentDate')).toBeLessThan(new Date());
                expect(comment.get('invalid property')).not.toBeDefined();
            });

            it("can store various values", function(){
                var comment = new CommentModel({
                    username: 'Username',
                    userId: '123465789',
                    content: 'Content',
                    commentDate: new Date('2014-12-12'),
                    modelId: '134abc'
                });

                expect(comment.get('username')).toBe('Username');
                expect(comment.get('userId')).toBe('123465789');
                expect(comment.get('modelId')).toBe('134abc');
                expect(comment.get('commentDate')).toEqual(jasmine.any(Date)); 
                expect(comment.get('commentDate')).toEqual(new Date('2014-12-12'));

                expect(comment.get('content')).toBe('Content');

                expect(comment.get('invalid property')).not.toBeDefined();
            });
        });



         // End of the View test suite

        //     // Backbone Model Suite: contains all tests related to models
        //     describe("Backbone models", function() {

        //         // Runs before every Model spec
        //         beforeEach(function() {

        //             // Instantiates a new Model instance
        //             this.model = new Model();

        //             // We are spying on the _validate method to see if it gets called
        //             spyOn(CommentModel.prototype, "validate").andCallThrough();

        //         });

        //         it("should be in a valid state", function() {

        //             expect(this.model.isValid()).toBe(true);

        //         });

        //         it("should call the validate method when setting a property", function() {

        //             this.model.set({ example: "test" }, { validate: true });

        //             expect(CommentModel.prototype.validate).toHaveBeenCalled();

        //         });

        //     }); // End of the Model test suite

        // // Backbone Collection Suite: contains all tests related to collections
        // describe("Backbone collections", function() {

        //     // Runs before every Collection spec
        //     beforeEach(function() {

        //         // Instantiates a new Collection instance
        //         this.collection = new Collection();

        //     });

        //     it("should contain the correct number of models", function() {

        //         expect(this.collection.length).toEqual(0);

        //     });

        // }); // End of the Collection test suite

        // Backbone Router Suite: contains all tests related to routers
        // describe("Backbone routers", function () {

        //     // Runs before every Router spec
        //     beforeEach(function () {

        //         // Stops the router from listening to hashchange events (Required because Backbone will only allow you to run Backbone.history.start() once for each page load.)
        //         Backbone.history.stop();

        //         // Instantiates a new Router instance
        //         this.router = new Router();

        //         // Creates a Jasmine spy
        //         this.routeSpy = jasmine.createSpy("index");

        //         // When the route index method is called, the Jasmine spy is also called
        //         this.router.on("route:index", this.routeSpy);

        //     });

        //     it("should call the router index method when there is no hash on the url", function() {

        //         // Navigates to a different route
        //         this.router.navigate("elsewhere");

        //         // Navigates to the default route
        //         this.router.navigate("", { trigger: true });
    
        //         // Expects the Jasmine spy to have been called
        //         expect(this.routeSpy).toHaveBeenCalled();

        //     });

        // }); // End of the Router test suite

    // }); // End of the Jasmine test suite

});