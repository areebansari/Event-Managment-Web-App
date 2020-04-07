const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Venues page(not logged in)",function(){
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(100000);
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should not add new venue without logging in",async function(){
                await page.visit("http://localhost:3000/venues");
                let addNewVenue = await page.findByLinkText("Add New Venue")
                
                await addNewVenue.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\nshould not add new venue without logging in")
                expect(currentUrl.includes("login")).toBe(true);
            })

            it("should display the detailed info page for first venue",async function(){
                await page.visit("http://localhost:3000/venues");
                let firstVenueListedMoreInfo = await page.findByLinkText("More Info")
                
                await firstVenueListedMoreInfo.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                //expect(currentUrl.includes("5e88d978eaad5f14cf695851")).toBe(true);
            })

            it("should not allow a user to add comment without logging in",async function(){
                await page.visit("http://localhost:3000/venues");
                let firstVenueListedMoreInfo = await page.findByLinkText("More Info")
                
                await firstVenueListedMoreInfo.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)

                let addNewComment = await page.findByLinkText("Add a new comment")
                await addNewComment.click();

                // Clicking on "Add a new comment" without logging in should navigate to login page
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("login")).toBe(true);
            })
        })
    } catch (error) {
        console.log(error);
    }
})();
