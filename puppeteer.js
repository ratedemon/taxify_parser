const puppeteer = require('puppeteer');
const config = require('./config');


module.exports = async (userData) => {
  try{
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(`${config.taxify_link}/login`);

      await page.click('#username');
      await page.type('#username', userData.login);

      await page.click('#password');
      await page.type('#password', userData.password);
      await page.click('form button[type=submit]');

    await page.waitForNavigation();
    await page.click('div > div > div > div.col-md-9.col-sm-8.content > div:nth-child(3) > div:nth-child(1) > h3 > span > a');
    await page.click('#email');
    await page.type('#email', userData.email);

    await page.click('#phone');
    await page.type('#phone', userData.phone);

    await page.click('form button[type=submit]');

    await page.waitFor(2000);

    const result = await page.evaluate(() => {
      let link = document.querySelector('.content > div > div > h4 > a').href;

      return link;
    });
    
    await page.goto(result);

    await page.click('#first_name')
    await page.type('#first_name', userData.first_name);

    await page.click('#last_name')
    await page.type('#last_name', userData.last_name);

    await page.click('form button[type=submit]');

    await page.waitForNavigation();

    const link = await page.url();

    await browser.close();
    
    return link;
  }catch(e){
    console.log(e);
    throw new Error(e);
  }
}