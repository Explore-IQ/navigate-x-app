# How the App Was Run and Demo'd

**Date:** 2026-06-13  
**Context:** User asked "can I see the demo" after Phase 3 was built.  
**Short answer:** The dev server was started, Playwright headless Chromium took screenshots of all 6 pages, and those were shown inline. This is **visual smoke verification**, not an automated test suite.

---

## Step 1 — Check for a project run skill

Before doing anything, the `run` skill checks whether a project-specific skill already documents how to launch this app (some repos have custom launchers with env vars, patches, etc.).

**Command run:**
```bash
d=$PWD; while :; do
  grep -Hm1 '^description:' "$d"/.claude/skills/*/SKILL.md 2>/dev/null
  [ -e "$d/.git" ] || [ "$d" = / ] && break
  d=$(dirname "$d")
done
```

**Result:** Found only R3F and UI/UX skills — no project-specific run skill. Fell back to the built-in web server pattern.

---

## Step 2 — Check if a dev server was already running

```bash
lsof -ti:3000
```

**Result:** Nothing on port 3000. Server was not running.

---

## Step 3 — Start the Next.js dev server (background)

```bash
npm run dev > /tmp/tourism-dev.log 2>&1 &
```

- `npm run dev` starts Next.js with Turbopack (default in Next.js 15/16)
- `> /tmp/tourism-dev.log 2>&1` redirects all output (stdout + stderr) to a log file
- `&` runs the process in the background so the shell is free immediately
- The PID was printed: `PID: 14736`

**Log file location:** `/tmp/tourism-dev.log`  
To tail it live: `tail -f /tmp/tourism-dev.log`

---

## Step 4 — Wait for the server to become ready

```bash
until curl -s http://localhost:3000 > /dev/null 2>&1; do sleep 1; done && echo "ready"
```

- Polls `http://localhost:3000` every second
- Exits as soon as the server responds with any HTTP status
- Printed `ready` when up (took ~10–15 seconds for Turbopack to compile)

---

## Step 5 — Find an available browser

```bash
which chromium-cli    # not found
which chromium        # not found
which google-chrome   # not found
ls /Applications/Google\ Chrome.app   # found
```

`chromium-cli` is the preferred tool (a lightweight CLI screenshot driver). It wasn't installed. Google Chrome.app was on the machine but can't be driven headlessly without a driver.

---

## Step 6 — Install Playwright headless Chromium

```bash
npx playwright install chromium --with-deps
```

- Downloads the **Chrome Headless Shell** (a stripped Chromium build optimised for headless automation)
- Installed to: `/Users/shafiahmedshaik/Library/Caches/ms-playwright/chromium_headless_shell-1223`
- Size: ~97.5 MB
- This is **not** the full Chrome — it's a headless-only build used by Playwright for scripted browser automation

**Note:** `--with-deps` would normally also install OS-level dependencies (fonts, libs) on Linux. On macOS it's a no-op since those already exist.

---

## Step 7 — Locate the Playwright Node module

The project doesn't have `playwright` in its `node_modules` (it has `@playwright/test` as a devDependency but it wasn't installed yet). The `playwright` JS module was found at the npm cache path from a previous `npx playwright` run:

```bash
find /Users/shafiahmedshaik -maxdepth 6 -name 'playwright' -type d
# → /Users/shafiahmedshaik/.npm/_npx/e41f203b7505f1fb/node_modules/playwright
```

---

## Step 8 — Write and run the screenshot script

A capture script was written to `/tmp/tourism-screenshots/capture.js`:

```javascript
const { chromium } = require('/Users/shafiahmedshaik/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const pages = [
    { url: 'http://localhost:3000',              name: 'home' },
    { url: 'http://localhost:3000/discover',     name: 'discover' },
    { url: 'http://localhost:3000/queues',       name: 'queues' },
    { url: 'http://localhost:3000/queues/taj-mahal', name: 'queue-detail' },
    { url: 'http://localhost:3000/traffic',      name: 'traffic' },
    { url: 'http://localhost:3000/parking',      name: 'parking' },
  ];

  for (const p of pages) {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2500);  // let animations settle
    await page.screenshot({ path: `/tmp/screenshots/${p.name}.png`, fullPage: false });
    console.log('done: ' + p.name);
  }

  await browser.close();
})();
```

**Run command:**
```bash
node /tmp/tourism-screenshots/capture.js
```

**Output:**
```
done: home
done: discover
done: queues
done: queue-detail
done: traffic
done: parking
```

**Screenshots saved to:** `/tmp/screenshots/`  
| File | URL |
|------|-----|
| `home.png` | `http://localhost:3000` |
| `discover.png` | `/discover` |
| `queues.png` | `/queues` |
| `queue-detail.png` | `/queues/taj-mahal` |
| `traffic.png` | `/traffic` |
| `parking.png` | `/parking` |

---

## Step 9 — "Run this app" (second request)

The server had stopped by then (background processes don't persist across shell sessions). It was restarted:

```bash
pkill -f "next dev"          # kill any stale instance
npm run dev > /tmp/tourism-dev.log 2>&1 &   # restart
```

Then waited for readiness again:
```bash
until curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|304"; do sleep 1; done && echo "ready"
```

Then opened in the system browser:
```bash
open http://localhost:3000
```

`open` on macOS launches the URL in whatever is set as the default browser (likely Chrome or Safari).

---

## Is screenshot capture the same as testing?

**No.** Here is the distinction:

| | Screenshot capture (what was done) | Automated test suite |
|---|---|---|
| **Purpose** | Visual smoke check — "does the page render without crashing?" | Assertions on specific behaviour — "does the booking mutation update the UI correctly?" |
| **What it catches** | Blank white pages, missing components, server crashes, layout explosions | Logic bugs, wrong data, accessibility failures, regression |
| **Speed** | Fast (2–3 s/page) | Slower (full interaction simulation) |
| **Maintained** | No — one-off script | Yes — committed, runs in CI |
| **This project's real tests** | `vitest` (unit), `@testing-library/react` (component), `playwright` (e2e) — defined in CLAUDE.md | |

The screenshot step is **manual visual verification**, the equivalent of a developer opening the browser themselves to confirm nothing is obviously broken. It is not a substitute for the test suite.

---

## How to run the app yourself (quick reference)

```bash
# From the project root
npm run dev

# App opens at:
http://localhost:3000

# Phase 3 pages:
http://localhost:3000/queues
http://localhost:3000/queues/taj-mahal
http://localhost:3000/traffic
http://localhost:3000/parking

# Dev server logs:
tail -f /tmp/tourism-dev.log
```

---

## How to re-run screenshots yourself

```bash
# Make sure dev server is running first (npm run dev)

node - << 'EOF'
const { chromium } = require('/Users/shafiahmedshaik/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({ width: 1280, height: 800 });
  const routes = ['/', '/discover', '/queues', '/queues/taj-mahal', '/traffic', '/parking'];
  for (const r of routes) {
    await p.goto('http://localhost:3000' + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2000);
    const name = r.replace(/\//g, '-').replace(/^-/, '') || 'home';
    await p.screenshot({ path: `/tmp/${name}.png` });
    console.log('saved:', name);
  }
  await b.close();
})();
EOF
```
