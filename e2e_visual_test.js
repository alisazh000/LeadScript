const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

async function run() {
  const appPath = path.resolve(__dirname, "index.html");
  const outDir = path.resolve(__dirname, "e2e-artifacts");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1720, height: 980 } });

  await page.goto(`file:///${appPath.replace(/\\/g, "/")}`, {
    waitUntil: "domcontentloaded",
  });

  await page.screenshot({
    path: path.join(outDir, "01_initial.png"),
    fullPage: true,
  });

  await page.fill("#q", "Need ad script for coffee delivery app");
  await page.click("#send");
  await page.waitForTimeout(150);

  await page.fill("#idea", "Coffee app ad with hook in first 2 seconds");
  await page.selectOption("#mode", "tiktok");
  await page.selectOption("#submode", "sales");
  await page.fill("#niche", "food delivery");
  await page.fill("#audience", "students 18-28");
  await page.fill("#tone", "bold and energetic");
  await page.fill("#goal", "increase installs");
  await page.click("#txGen");
  await page.waitForTimeout(150);

  await page.click("#saveScript");
  await page.waitForTimeout(100);

  await page.selectOption("#atype", "platform_check");
  await page.fill("#platform", "TikTok");
  await page.fill(
    "#script",
    "Scene 1: hook in first 2 sec. Scene 2: app demo. Scene 3: CTA with keyword."
  );
  await page.click("#txRun");
  await page.waitForTimeout(150);

  await page.screenshot({
    path: path.join(outDir, "02_after_actions.png"),
    fullPage: true,
  });

  const checks = await page.evaluate(() => {
    const result = document.getElementById("result")?.textContent || "";
    const analysis = document.getElementById("analysis")?.textContent || "";
    const conv = document.getElementById("convList")?.children.length || 0;
    const scripts = document.getElementById("scripts")?.children.length || 0;
    return {
      hasResult: result.length > 30,
      hasAnalysis: /score|scoring|итог|total/i.test(analysis),
      convCount: conv,
      scriptCount: scripts,
    };
  });

  await browser.close();

  if (!checks.hasResult) throw new Error("No generated script output.");
  if (!checks.hasAnalysis) throw new Error("No QA analysis output.");
  if (checks.convCount < 1) throw new Error("Conversation list is empty.");
  if (checks.scriptCount < 1) throw new Error("Saved scripts list is empty.");

  console.log("VISUAL_E2E_OK");
  console.log(`Initial screenshot: ${path.join(outDir, "01_initial.png")}`);
  console.log(`After actions screenshot: ${path.join(outDir, "02_after_actions.png")}`);
}

run().catch((err) => {
  console.error("VISUAL_E2E_FAILED:", err.message);
  process.exit(1);
});
