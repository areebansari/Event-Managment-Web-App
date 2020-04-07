const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Sign Up page",function(){
            let signupButton,username,password;
            
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(10000);
                await page.visit("http://localhost:3000/register");
                username = await page.findByName("username");
                password = await page.findByName("password");
                signupButton = await page.findByXpath("//input[@type = 'submit']");
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should not signup if username and password is not provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);

                await signupButton.click();
                console.log("Sign Up page should not signup if username and password is not provided")

                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);
            })

            it("should not signup if only username is provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);

                await username.sendKeys("logan")
                signupButton.click();
                console.log("\n Sign Up page should not signup if only username is provided")
                
                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);

            })

            it("should not signup if only password is provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);

                await password.sendKeys("logan")
                signupButton.click();
                console.log("\n Sign Up page should not signup if only password is provided")

                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);
            })

            it("should go back to home", async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("register")).toBe(true);

                let goBackLink = await page.findByLinkText("Go Back")                
                await goBackLink.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("register")).toBe(false);
            })

            it("should allow a user to register",async function(){
                let currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(true);

                // generate random string for username and password
                let r = Math.random().toString(36).substring(7);
                await username.sendKeys(r)
                await password.sendKeys(r)
                await signupButton.click();

                // after successful registration
                currentUrl = await page.getCurrentUrl();
                expect(currentUrl.includes("register")).toBe(false);

                // logout
                let logout = await page.findByLinkText("Logout")
                await logout.click();
            })

        })
    } catch (error) {
        console.log(error)
    }
})();
