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

    let phone = '';

    switch(userData.phone[0]){
      case '0':
      case 0:
        phone = `+38${userData.phone}`;
        break;
      case '8':
      case 8:
        phone = `+3${userData.phone}`;
        break;
      case '3':
      case 3:
        phone = `+${userData.phone}`;
        break;
      default:
        phone = `+${userData.phone}`
    }
    await page.type('#phone', phone);

    await page.click('form button[type=submit]');

    await page.waitFor(1000);
    const result = await page.evaluate(() => {
      let link = document.querySelector('.content > div > div > h4 > a').href;

      return link;
    });
    
    await page.goto(result);
    await page.waitFor(2000);
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