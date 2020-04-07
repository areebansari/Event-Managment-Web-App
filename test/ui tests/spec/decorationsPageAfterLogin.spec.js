const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Decorations page after login",function(){
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(100000);
                await page.visit("http://localhost:3000");

                // navigate to register page
                let signup = await page.findByLinkText("Sign Up");
                await signup.click();

                // generate random string for username and password
                let username = await page.findByName("username");
                let password = await page.findByName("password");
                let signupButton = await page.findByXpath("//input[@type = 'submit']");

                // registering a new user
                let r = Math.random().toString(36).substring(7);
                await username.sendKeys(r)
                await password.sendKeys(r)
                await signupButton.click();
                
                // navigate to venues page        
                let decorationsPage = await page.findByLinkText("Decorations");
                await decorationsPage.click()
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should allow a user to add a decorator",async function(){
                let addNewDecorator = await page.findByLinkText("Add New Decorator");
                await addNewDecorator.click();

                // navigates to http://localhost:3000/decorations/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(true);

                let name = await page.findByName("name");
                let description = await page.findByName("description");
                let price = await page.findByName("price");
                let location = await page.findByName("location");
                let contactno = await page.findByName("contactno");
                let image = await page.findByName("image");
                
                name.sendKeys("Queen Wedding Decor");
                description.sendKeys("We are one of the Toronto wedding flowers & wedding decor specialists. Our design styles range from traditional to modern day trendy. We work closely with you and assist you with choosing the right type of wedding flowers, chair covers, centerpieces and backdrops for your wedding")
                price.sendKeys("10000");
                location.sendKeys("85 Midwest Rd, Scarborough, ON M1P 3A6");
                contactno.sendKeys("647-631-2227");
                image.sendKeys("https://www.queenweddingdecor.com/wp-content/uploads/2019/11/backdrop_2019_09_01.jpg");

                let submitButton = await page.findByXpath("//input[@type = 'submit']");
                await submitButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(false);
            })

            it("should go back to decorations page",async function(){
                let addNewVenue = await page.findByLinkText("Add New Decorator");
                await addNewVenue.click();

                // navigates to http://localhost:3000/decorations/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(true);

                let goBackLink = await page.findByLinkText("Go Back")
                await goBackLink.click();

                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("new")).toBe(false);
            })

            it("add a new comment to the first decorator listed",async function(){
                let firstDecorationListedMoreInfo = await page.findByLinkText("More Info")
                await firstDecorationListedMoreInfo.click();

                let addNewComment = await page.findByLinkText("Add a new comment");
                await addNewComment.click();

                // navigates to http://localhost:3000/decorations/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("comments/new")).toBe(true);

                let comment = await page.findByName("comment[text]");
                comment.sendKeys("Beautiful and modern decorators in the city")
                let submitButton = await page.findByXpath("//input[@type = 'submit']");
                await submitButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("comments/new")).toBe(false);
            })

        })
    } catch (error) {
        console.log(error);
    }
})();
