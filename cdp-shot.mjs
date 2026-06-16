// Screenshot + computed-style inspection of the home page via CDP.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const TARGET_URL = process.env.PROBE_URL || "http://localhost:3000/";
const OUT = process.env.SHOT_OUT || "C:\\Users\\ayeml\\OneDrive\\Desktop\\leclercqjet\\leclercqjet\\shot.png";
const PORT = 9225;
const userDir = mkdtempSync(join(tmpdir(), "edge-shot-"));

const edge = spawn(EDGE, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${userDir}`,
  "--window-size=1366,900", "--hide-scrollbars", "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json`);
      const tabs = await res.json();
      const page = tabs.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(300);
  }
  throw new Error("No CDP page target found");
}
const ws = new WebSocket(await getWsUrl());
let nextId = 1;
const pending = new Map();
const failed = [];
function send(method, params = {}) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve) => pending.set(id, resolve));
}
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); return; }
  if (msg.method === "Network.loadingFailed") failed.push({ url: msg.params.requestId, error: msg.params.errorText, type: msg.params.type });
});
await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });
await send("Page.enable");
await send("Network.enable");
await send("Page.navigate", { url: TARGET_URL });
await sleep(6000);

const inspect = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const header = document.querySelector('header');
    const logo = document.querySelector('header a span');
    const cs = (el) => el ? getComputedStyle(el) : null;
    const h = cs(header), l = cs(logo);
    const links = [...document.querySelectorAll('link[rel="stylesheet"]')].map(x => x.href);
    return {
      sheetCount: document.styleSheets.length,
      cssLinks: links,
      headerBg: h && h.backgroundColor,
      headerBackdrop: h && (h.backdropFilter || h.webkitBackdropFilter),
      logoText: logo && logo.textContent,
      logoColor: l && l.color,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      goldProbe: (() => { const d=document.createElement('div'); d.className='text-gold'; document.body.appendChild(d); const c=getComputedStyle(d).color; d.remove(); return c; })(),
      glassDarkExists: [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.selectorText && r.selectorText.includes('glass-dark')); } catch { return false; } }),
    };
  })()`,
});

const shot = await send("Page.captureScreenshot", { format: "png" });
if (shot && shot.data) writeFileSync(OUT, Buffer.from(shot.data, "base64"));

console.log(JSON.stringify({ inspect: inspect.result.value, failedResources: failed.slice(0, 10), screenshot: OUT }, null, 2));
edge.kill();
ws.close();
process.exit(0);
