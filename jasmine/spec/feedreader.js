/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have not empty URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have not empty Names defined', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
         });
    });


    /* TESTING MENU */
    describe('The menu', function() {

        //returns true when menu is hidden
        function menuHidden() {
            return $('body').hasClass('menu-hidden');
        };

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(menuHidden()).toBe(true);
        });
        
        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when icon clicked', function() {
            $('.menu-icon-link').click();
            expect(menuHidden()).toBe(false); //menu should be visible after clicking on the icon

            $('.menu-icon-link').click();
            expect(menuHidden()).toBe(true); //menu should be visible after second clicking on the icon
        });
    });
    
    /* TESTING INITIAL ENTRIES */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /* TESTING NEW FEEDS */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed, newFeed; //HTML content of old and new Feed is stored here
        
            beforeEach(function(done) {
                loadFeed(0, function() {
                    oldFeed = $('.feed').html();
                    loadFeed(1, done);
                })
            });

        it('has different content than the old one', function() {
            newFeed = $('.feed').html();
            expect(newFeed).not.toBe(oldFeed);
        });
    });

}());
