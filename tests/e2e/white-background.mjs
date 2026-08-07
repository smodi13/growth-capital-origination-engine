/**
 * End to end verification that the site is actually white.
 *
 * CSS source inspection is not sufficient here. A stylesheet can declare
 * #FFFFFF on html and still paint a dark ground through a fixed overlay, a
 * gradient, or a full width section, and only a real browser resolves the
 * result. So this drives Chromium over the exported build, reads computed
 * styles, and samples the rendered pixels.
 *
 * Usage:  node tests/e2e/white-background.mjs [baseUrl]
 * Exit code is non zero on the first failure, so it can gate a deploy.
 */

import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4321';

const ROUTES = [
  '/',
  '/universe/',
  '/pipeline/',
  '/compare/',
  '/underwriting/',
  '/structures/',
  '/methodology/',
  '/sources/',
  '/about/',
  '/companies/vanta/',
];

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];

const WHITE = 'rgb(255, 255, 255)';

const failures = [];
const notes = [];
function check(ok, message) {
  if (!ok) failures.push(message);
}

/** Parse an rgb/rgba string into channels. */
function channels(value) {
  const m = /rgba?\(([^)]+)\)/.exec(value);
  if (!m) return null;
  const [r, g, b, a = '1'] = m[1].split(',').map((s) => parseFloat(s));
  return { r, g, b, a };
}

/** True when a colour is dark enough that a large area of it would read as a dark surface. */
function isDarkSurface(value) {
  const c = channels(value);
  if (!c || c.a < 0.5) return false;
  // Rec. 601 luma. Anything below 128 is a mid to dark ground.
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b < 128;
}

/** True when a colour is a saturated blue rather than a near neutral. */
function isBlueSurface(value) {
  const c = channels(value);
  if (!c || c.a < 0.5) return false;
  return c.b - Math.max(c.r, c.g) > 24;
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});

try {
  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      const page = await browser.newPage({ viewport });
      const consoleErrors = [];
      page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
      page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));

      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      const where = `${route} @ ${viewport.width}px`;

      /* ---------------------------------------------------- computed roots */

      const roots = await page.evaluate(() => {
        const get = (el) => (el ? getComputedStyle(el).backgroundColor : null);
        return {
          html: get(document.documentElement),
          body: get(document.body),
          main: get(document.querySelector('main')),
          nav: get(document.querySelector('header')),
        };
      });

      check(roots.html === WHITE, `${where}: html background is ${roots.html}, expected ${WHITE}`);
      check(roots.body === WHITE, `${where}: body background is ${roots.body}, expected ${WHITE}`);
      check(
        roots.main === WHITE || roots.main === 'rgba(0, 0, 0, 0)',
        `${where}: main background is ${roots.main}, expected white or transparent over white`,
      );
      check(
        !isDarkSurface(roots.nav) && !isBlueSurface(roots.nav),
        `${where}: navigation background is ${roots.nav}, which is not white`,
      );

      /* ------------------------------------------- no wide dark or blue band */

      const offenders = await page.evaluate(
        ({ vw }) => {
          const out = [];
          for (const el of document.querySelectorAll('body *')) {
            const rect = el.getBoundingClientRect();
            // Only surfaces wide and tall enough to read as a background band.
            if (rect.width < vw * 0.7 || rect.height < 120) continue;
            const cs = getComputedStyle(el);
            if (cs.position === 'fixed' && cs.pointerEvents === 'none' && cs.zIndex === '50') {
              continue; // the 2px reading progress rail
            }
            const bg = cs.backgroundColor;
            const img = cs.backgroundImage;
            out.push({
              tag: el.tagName.toLowerCase(),
              cls: String(el.className).slice(0, 80),
              bg,
              hasGradient: img.includes('gradient'),
              w: Math.round(rect.width),
              h: Math.round(rect.height),
            });
          }
          return out;
        },
        { vw: viewport.width },
      );

      offenders.forEach((o) => {
        check(
          !isDarkSurface(o.bg),
          `${where}: full width dark surface ${o.bg} on ${o.tag}.${o.cls} (${o.w}x${o.h})`,
        );
        check(
          !isBlueSurface(o.bg),
          `${where}: full width blue surface ${o.bg} on ${o.tag}.${o.cls} (${o.w}x${o.h})`,
        );
      });

      /* --------------------------------------------------- pixel sampling */

      // Sample the rendered page. A route that is genuinely white reads as a
      // high mean luma with very little blue cast, whatever the CSS says.
      const shot = await page.screenshot({ type: 'png' });
      const stats = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = 'data:image/png;base64,' + b64;
        await img.decode();
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const { data } = ctx.getImageData(0, 0, c.width, c.height);
        let light = 0;
        let blueCast = 0;
        let n = 0;
        for (let i = 0; i < data.length; i += 4 * 37) {
          const r = data[i];
          const g = data[i + 1];
          const bl = data[i + 2];
          const luma = 0.299 * r + 0.587 * g + 0.114 * bl;
          if (luma > 235) light++;
          if (bl - Math.max(r, g) > 24 && luma < 200) blueCast++;
          n++;
        }
        return { lightShare: light / n, blueShare: blueCast / n };
      }, shot.toString('base64'));

      check(
        stats.lightShare > 0.8,
        `${where}: only ${(stats.lightShare * 100).toFixed(1)}% of pixels are near white, expected over 80%`,
      );
      check(
        stats.blueShare < 0.06,
        `${where}: ${(stats.blueShare * 100).toFixed(1)}% of pixels are saturated blue, expected under 6%`,
      );
      notes.push(
        `${where}: ${(stats.lightShare * 100).toFixed(1)}% near white, ${(stats.blueShare * 100).toFixed(1)}% blue`,
      );

      check(
        consoleErrors.length === 0,
        `${where}: console errors ${JSON.stringify(consoleErrors.slice(0, 3))}`,
      );

      await page.close();
    }
  }
} finally {
  await browser.close();
}

notes.forEach((n) => console.log('  ' + n));

if (failures.length) {
  console.error(`\nFAILED ${failures.length} white background checks:`);
  failures.forEach((f) => console.error('  - ' + f));
  process.exit(1);
}
console.log(`\nAll white background checks passed across ${ROUTES.length} routes and ${VIEWPORTS.length} viewports.`);
