const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function waitForHealth(url, retries = 50) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 200));
  }
  return false;
}

(async () => {
  const server = spawn('python', ['app.py'], { cwd: 'C:/coder/LeadScript_v2', stdio: 'ignore' });
  try {
    const ok = await waitForHealth('http://127.0.0.1:5050/api/health');
    if (!ok) throw new Error('Server did not start');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5050/', { waitUntil: 'domcontentloaded' });

    await page.fill('#nameField', 'UI User');
    await page.fill('#emailField', `ui${Date.now()}@mail.com`);
    await page.fill('#passwordField', 'password123');
    await page.click('#registerBtn');
    await page.waitForTimeout(400);

    await page.fill('#ideaInput', 'Coffee ad with strong hook');
    await page.click('#generateForm button[type="submit"]');
    await page.waitForTimeout(300);

    const result = await page.textContent('#scriptResult');
    if (!result || result.length < 20) throw new Error('No script result generated');

    await page.click('#saveScriptBtn');
    await page.waitForTimeout(300);

    await page.fill('#chatInput', 'Give me 3 CTA ideas');
    await page.click('#sendBtn');
    await page.waitForTimeout(500);

    const chatHtml = await page.$eval('#chatMessages', (el) => el.innerText);
    if (!chatHtml.toLowerCase().includes('alice')) throw new Error('No AliceAI response visible');

    await page.fill('#qaScriptText', result);
    await page.click('#qaForm button[type="submit"]');
    await page.waitForTimeout(300);

    const qa = await page.textContent('#qaOutput');
    if (!qa || qa.length < 10) throw new Error('No QA output');

    console.log('UI_E2E_OK');
    await browser.close();
  } catch (err) {
    console.error('UI_E2E_FAIL', err.message);
    process.exitCode = 1;
  } finally {
    server.kill();
  }
})();
