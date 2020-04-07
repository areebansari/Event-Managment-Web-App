const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Login page",function(){
            let loginButton,username,password;

            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(10000);
                await page.visit("http://localhost:3000/login");
                loginButton = await page.findByXpath("//input[@type = 'submit']")                
                username = await page.findByName("username");
                password = await page.findByName("password");
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should not login if username and password is not provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                await loginButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);
                console.log("\nLogin Page should not login if username and password is not provided")
            })

            it("should not login if only username is provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                await username.sendKeys("logan");
                await loginButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);
                console.log("\nLogin Page should not login if only username is provided")
            })

            it("should not login if only password is provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                await password.sendKeys("logan");
                await loginButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                console.log("\nLogin Page should not login if only password is provided")
            })

            it("should go back to home", async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                let goBackLink = await page.findByLinkText("Go Back")                
                await goBackLink.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(false);
            })

            it("should redirect to register page for a new user",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                let registerLink = await page.findByLinkText("Register")
                await registerLink.click();
                
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("register")).toBe(true);
            })

            it("should allow a user to login and logout",async function(){
                // Registering a new user
                let registerLink = await page.findByLinkText("Register")
                await registerLink.click();
                
                // register page
                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);

                // generate random string for username and password
                username = await page.findByName("username");
                password = await page.findByName("password");
                let signupButton = await page.findByXpath("//input[@type = 'submit']");

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
                loginButton = await page.findByXpath("//input[@type = 'submit']");

                await username.sendKeys(r)
                await password.sendKeys(r)
                await loginButton.click();

                // logout
                logout = await page.findByLinkText("Logout")
                await logout.click();
            })


        })
    } catch (error) {
        console.log(error)
    }
})();
