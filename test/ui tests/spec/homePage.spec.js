const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000; // in microseconds.

(async function test(){
    try {
        describe("Home page",function(){
            
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                // Timeout value is increased in this test suite because pages such as venues,
                // catering and decorations are taking time to load
                await page.setTimeouts(100000);
                await page.visit("http://localhost:3000");
            })

            afterEach(async function(){
                await page.quit();
            })

            it("Home page(Get Started)",async function(){
                let getStartedLink = await page.findByLinkText("Get Started!!")
                
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                await getStartedLink.click();

                // get url of current
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\n Clicking on Get Started will navigate to login page")
                expect(currentUrl.includes("login")).toBe(true);
            })

            it("Home page(Login)",async function(){
                let loginLink = await page.findByLinkText("Login")
                
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                await loginLink.click();

                // get url of current
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\n Clicking on Login will navigate to login page")
                expect(currentUrl.includes("login")).toBe(true);
            })

            it("Home page(Register)",async function(){
                let registerLink = await page.findByLinkText("Sign Up")
                
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                await registerLink.click();

                // get url of current
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\n Clicking on Register will navigate to register page")
                expect(currentUrl.includes("register")).toBe(true);
            })

            it("Home page(Venues)",async function(){
                let venuesLink = await page.findByLinkText("Venues")
                
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                await venuesLink.click();

                // get url of current
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\n Clicking on Venues will navigate to venues page")
                expect(currentUrl.includes("venues")).toBe(true);
            })

            it("Home page(Catering)",async function(){
                let cateringLink = await page.findByLinkText("Catering")
                
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                await cateringLink.click();

                // get url of current
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\n Clicking on Catering will navigate to catering page")
                expect(currentUrl.includes("catering")).toBe(true);
            })

            it("Home page(Decorations)",async function(){
                let decorationsLink = await page.findByLinkText("Decorations")
                
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                await decorationsLink.click();

                // get url of current
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                
                console.log("\n Clicking on Decorations will navigate to decorations page")
                expect(currentUrl.includes("decorations")).toBe(true);
            })

        })
    } catch (error) {
        console.log(error)
    }
})();
