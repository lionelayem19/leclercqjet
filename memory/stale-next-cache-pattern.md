---
name: stale-next-cache-pattern
description: User reports homepage/site features as "missing" or "lost" but they are already present and correct in the source — cause is a stale .next build cache
metadata:
  type: feedback
---

Twice (2026-06-14) the user reported features as lost/missing and asked to restore/add them — the hero title + destinations marquee + search form (HeroSection.tsx), and the "Fuseaux horaires" WorldClocks section on the Météo page — but both were already fully implemented and correct in the source. `tsc --noEmit` and `npm run build` both passed clean.

**Why:** The user is viewing a stale Next.js `.next` build cache (or a dev server serving an old version), so the rendered page lags behind the source.

**How to apply:** When this user reports a feature is missing/broken, FIRST read the relevant source file to check whether it already exists before assuming a regression. If the source is correct, don't fabricate edits — clear the cache (`Remove-Item -Recurse -Force .next`) and rebuild/restart dev. Confirm with `npm run build`.
