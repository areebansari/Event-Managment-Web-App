const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Decorations page(not logged in)",function(){
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(100000);
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should not add new decorator without logging in",async function(){
                await page.visit("http://localhost:3000/decorations");
                let addNewDecorator = await page.findByLinkText("Add New Decorator")
                
                await addNewDecorator.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl) 
                
                console.log("\nshould not add new decorator without logging in")
                expect(currentUrl.includes("login")).toBe(true);
            })

            it("should display the detailed info page for first decoration",async function(){
                await page.visit("http://localhost:3000/decorations");
                let firstDecorationsListedMoreInfo = await page.findByLinkText("More Info")
                
                await firstDecorationsListedMoreInfo.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                //expect(currentUrl.includes("5e88d978eaad5f14cf69585f")).toBe(true);
            })

            it("should not allow a user to add comment without logging in",async function(){
                await page.visit("http://localhost:3000/decorations");
                let firstDecorationsListedMoreInfo = await page.findByLinkText("More Info")
                
                await firstDecorationsListedMoreInfo.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                //expect(currentUrl.includes("5e88d978eaad5f14cf69585f")).toBe(true);

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
