const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('"Poppa stacken!" ska ta bort top elementet', async () => {

    //lägger till två push element.

    // klickar den första push elementet.
    let pushButton = await driver.findElement(By.id('push'))
    await pushButton.click();
    //hanterar prompt alert
    let alert1 = await driver.switchTo().alert();
    await alert1.sendKeys("Key lime pie");
    await alert1.accept();

    // klickar för den andra push elementet.
    await pushButton.click();
    //hanterar prompt alert
    let alert2 = await driver.switchTo().alert();
    await alert2.sendKeys("Red velvet");
    await alert2.accept();

    //klickar på "poppa stacken!"
    await driver.findElement(By.id('pop')).click();
    //hanterar prompt alert
    let popAlert = await driver.switchTo().alert();
    await popAlert.accept();

    //klickar sedan peek för att få fram den nya top elementet.
    await driver.findElement(By.id('peek')).click();
    //hanterar prompt alert
    let peekAlert = await driver.switchTo().alert();
    await peekAlert.accept();

    // Hämtar och checkar om elementet är "Key lime pie"
    let topOfStack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(topOfStack).toEqual("Key lime pie");

});