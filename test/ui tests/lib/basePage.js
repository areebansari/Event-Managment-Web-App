const {Builder, Capabilities, By, until} = require('selenium-webdriver');

var Page = function(){
    var chromeCapabilities=Capabilities.chrome();
    var chromeOptions = {
        'excludeSwitchest': ['enable-automation']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    // create driver for chrome browser
    this.driver = new Builder()
                  .forBrowser('chrome')
                  .withCapabilities(chromeCapabilities).build();    
    //.forBrowser("chrome").build();

    // set timeouts
    // implicit :specifies the maximum amount of time to wait when locating elements on the page. 
    // pageLoad : specifies the maximum amount of time to wait for a page to finishing loading
    this.setTimeouts = async function(time){
        return await this.driver.manage().setTimeouts({
            implicit : time,
            pageLoad : time
        })
    }

    // visit a webpage
    this.visit = async function(url){
        return await this.driver.get(url);
    }

    // quit current session
    this.quit = async function(){
        return await this.driver.quit();
    }

    // wait and find a specific element by it's name
    this.findByName = async function(name){
        let el = await this.driver.findElement(By.name(name));
        return await driver.wait(until.elementIsVisible(el),10000);
    }

    // wait and find a specific element by it's class
    this.findByClass = async function(className){
        let el = await this.driver.findElement(By.className(className));
        return await driver.wait(until.elementIsVisible(el),10000);
    }

    // wait and find element by tagname
    this.findByTagName = async function(tagName){
        let el = await this.driver.findElement(By.tagName(tagName));
        return await driver.wait(until.elementIsVisible(el),10000);
    }

    // wait and find element by link text
    this.findByLinkText = async function(linkText){
        let el = await this.driver.findElement(By.linkText(linkText));
        return await driver.wait(until.elementIsVisible(el),10000);
    }

    // find by xpath
    this.findByXpath = async function(path){
        let el = await this.driver.findElement(By.xpath(path));
        return await driver.wait(until.elementIsVisible(el),10000);
    }

    // get currentURL
    this.getCurrentUrl = async function(){
        return driver.getCurrentUrl();
    }

    // fill input field
    this.write = async function(el,text){
        return await el.sendKeys(text);
    }
}

module.exports = Page;
