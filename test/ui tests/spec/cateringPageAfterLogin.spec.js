const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Catering page after login",function(){
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
                let cateringPage = await page.findByLinkText("Catering");
                await cateringPage.click()
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should allow a user to add venue",async function(){
                let addNewCaterer = await page.findByLinkText("Add A New Caterer");
                await addNewCaterer.click();

                // navigates to http://localhost:3000/venues/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(true);

                let name = await page.findByName("name");
                let description = await page.findByName("description");
                let price = await page.findByName("price");
                let location = await page.findByName("location");
                let beverages = await page.findByName("beverages");
                let contactno = await page.findByName("contactno");
                let image = await page.findByName("image");
                
                name.sendKeys("Hearty Catering");
                description.sendKeys("Healthful, delicious and sustainably sourced food that nourishes the body and supports a healthy environment.");
                price.sendKeys("80");
                location.sendKeys("1255 Sheppard Avenue East, North York, M2K1E2");
                beverages.sendKeys("Yes");
                contactno.sendKeys("416-410-2928");
                image.sendKeys("https://s3-media0.fl.yelpcdn.com/bphoto/ygnNiki0Arkydr4SJoA8hA/l.jpgs");

                let submitButton = await page.findByXpath("//input[@type = 'submit']");
                await submitButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(false);
            })

            it("should go back to catering page",async function(){
                let addNewCaterer = await page.findByLinkText("Add A New Caterer");
                await addNewCaterer.click();

                // navigates to http://localhost:3000/catering/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(true);

                let goBackLink = await page.findByLinkText("Go Back")
                await goBackLink.click();

                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("new")).toBe(false);
            })

            it("add a new comment to the first caterer listed",async function(){
                let firstCateringListedMoreInfo = await page.findByLinkText("More Info")
                await firstCateringListedMoreInfo.click();

                let addNewComment = await page.findByLinkText("Add a new comment");
                await addNewComment.click();

                // navigates to http://localhost:3000/catering/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("comments/new")).toBe(true);

                let comment = await page.findByName("comment[text]");
                comment.sendKeys("Tasty and affordable caterers")
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
