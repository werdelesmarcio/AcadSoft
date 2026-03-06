import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    console.log(`BROWSER ${type}: ${text}`);
  });

  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.toString());
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      console.log('HTTP error', response.status(), response.url());
    }
  });

  const port = process.env.PORT || 3000;
  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle2', timeout: 20000 });
  // take a screenshot
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot saved');
  await browser.close();
})();