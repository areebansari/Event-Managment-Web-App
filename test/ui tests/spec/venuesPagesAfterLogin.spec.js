const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Venues page after login",function(){
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

                // logout
                let logout = await page.findByLinkText("Logout")
                await logout.click();

                // Logging in
                let loginLink = await page.findByLinkText("Login")
                await loginLink.click();
                
                // login page
                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("login")).toBe(true);

                // generate random string for username and password
                username = await page.findByName("username");
                password = await page.findByName("password");
                let loginButton = await page.findByXpath("//input[@type = 'submit']");

                await username.sendKeys(r)
                await password.sendKeys(r)
                await loginButton.click();
                
                // navigate to venues page        
                let venuesPage = await page.findByLinkText("Venues");
                await venuesPage.click()
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should allow a user to add venue",async function(){
                let addNewVenue = await page.findByLinkText("Add New Venue");
                
                await addNewVenue.click();

                // navigates to http://localhost:3000/venues/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(true);

                let name = await page.findByName("name");
                let description = await page.findByName("description");
                let price = await page.findByName("price");
                let location = await page.findByName("location");
                let capacity = await page.findByName("capacity");
                let category = await page.findByName("category");
                let cateringAvailable = await page.findByName("cateringAvailable");
                let decorationAvailable = await page.findByName("decorationAvailable");
                let contactno = await page.findByName("contactno");
                let image = await page.findByName("image");
                
                name.sendKeys("Brighton Convention and Event Centre");
                description.sendKeys("Brighton Convention and Event Centre is a beautiful North East Toronto destination for weddings, banquets and business events. With 16,627 square feet on 3.25 acres of landscaped grounds, the elegantly decorated we offer a world of possibilities for your personal and business special event needs. Our experienced, professional staff will ensure you receive truly personalized service, giving your guests the attention that they deserve. From your first visit to our hall until the end of your wedding celebration, you will love all we have to offer. We offer beautifully appointed bridal suites, large lobby, wheelchair access to halls and washrooms and a gorgeous outdoor patio that can be used for small ceremonies, weather permitting. There are indoor areas for photo you’ll always treasure.");
                price.sendKeys("80000");
                location.sendKeys("2155 McNicoll Ave, Scarborough, ON M1V 5P1");
                capacity.sendKeys("1000");
                category.sendKeys("Weddings, banquets and business events. ");
                cateringAvailable.sendKeys("Yes");
                decorationAvailable.sendKeys("Yes");
                contactno.sendKeys(" 416-299-0077");
                image.sendKeys("https://eventective-media.azureedge.net/2235051_lg.jpg");

                let submitButton = await page.findByXpath("//input[@type = 'submit']");
                await submitButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(false);
            })

            it("should go back to venues page",async function(){
                let addNewVenue = await page.findByLinkText("Add New Venue");
                await addNewVenue.click();

                // navigates to http://localhost:3000/venues/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("new")).toBe(true);

                let goBackLink = await page.findByLinkText("Go Back")
                await goBackLink.click();

                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("new")).toBe(false);
            })

            it("add a new comment to the first venue listed",async function(){
                let firstVenueListedMoreInfo = await page.findByLinkText("More Info")
                await firstVenueListedMoreInfo.click();

                let addNewComment = await page.findByLinkText("Add a new comment");
                await addNewComment.click();

                // navigates to http://localhost:3000/venues/new
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl)
                expect(currentUrl.includes("comments/new")).toBe(true);

                let comment = await page.findByName("comment[text]");
                comment.sendKeys("One of the best venues for surprise parties")
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
