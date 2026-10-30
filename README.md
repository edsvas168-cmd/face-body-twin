# Face & Body Twin — Face-focused hackathon MVP

**Positioning:** Explore food and appearance trends with numbers, sources and context — **facts, not myths**.

**Current focus:** Face Twin only. **Body visualization is roadmap, not part of the MVP**.

## Working experience

- Main page: four-language EN/RU/ES/简体中文 introduction, illustrated face comparison, nutrition/education benefits, For Business and FAQ.
- Studio: Face-only demo, female/male portrait choices in four age groups, local own-photo preview, one-tap food scenarios and expandable manual food entry.
- Built-in reference food catalog and calculations of sugar, sodium and calories; unknown values are flagged, not quietly reported as zero.
- Nutrition and visual rules run through shared modules: `shared/catalog.js` and `shared/scenario-engine.js`.
- Sourced explanations, basic general advice, optional skincare categories and educational disclaimers.
- Generated reference portraits stored in `assets/avatars/face/`; additional old full-length assets are archived in the repo but not part of the UI. The existing generated assets have not been edited.

## Technical implementation

`api/youcam-start.js` and `api/youcam-status.js` implement a private access-gated Vercel serverless workflow to prepare and poll YouCam Face Reshape / Skin Simulation tasks for **public demo avatars only**.

These APIs have **not been verified with real requests**. They are disabled by default and must not be described as a tested live feature. The secret API key belongs only in Vercel environment variables. See [YOUCAM_SETUP.md](YOUCAM_SETUP.md) for test instructions and gating.

The demo illustrates visual concepts; it **does not predict skin changes from food**, perform medical diagnoses or show proven personal outcomes. A sodium-based appearance preset is an editorial mapping, not a validated physiological formula.

## Files

- `index.html`: multilingual homepage
- `studio/index.html`: Face Twin interface and client-side orchestration
- `shared/catalog.js`: reference nutrition catalog
- `shared/scenario-engine.js`: validated nutrient totals, scenarios, example effect payloads
- `api/`: private YouCam server endpoints, disabled by default
- `tests/scenario-engine.test.js`: deterministic regression suite
- `DEVPOST_DESCRIPTION.md`: copy-ready Face-focused Devpost submission text (not automatically published)

## Local test

Use `python -m http.server 8765` from the repository root, then visit `http://localhost:8765/studio/`.
Run JavaScript regression tests using `node --test tests/scenario-engine.test.js`.

## Attribution

Character assets were created with generative AI tools and used as illustrative visual models.
