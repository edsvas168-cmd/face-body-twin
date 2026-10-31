# Update: Skin Journey workflow replaces legacy Face Reshape

The new skin-analysis → care-categories → skin-simulation flow lives in **[SKIN_JOURNEY_SETUP_RU.md](SKIN_JOURNEY_SETUP_RU.md)**. Legacy `/api/youcam-start` and `/api/youcam-status` are now **disabled by default** (410) unless `YOUCAM_LEGACY_ENABLED=true`, which is not recommended. This document below describes the earlier technical prototype only; do not follow its old Face Reshape testing instructions for the current product.

# Face & Body Twin — scenario engine and YouCam private test

Status: **code integrated, no API calls performed, no units spent**. The real image effects must still be verified in YouCam Playground / Vercel before being described as live production features.

## Architecture

- `shared/catalog.js`: the single food catalog (21 reference entries), reusable by Studio and server.
- `shared/scenario-engine.js`: deterministic nutrient arithmetic, safe validation, illustrative intensity presets, and payload builder for each supported API.
- `studio/index.html`: preset cards (one tap), optional manual item entry, result explanations, numeric totals for manual entry, and private AI test UI.
- `api/youcam-start.js`: accepts a whitelisted scenario or validated food items, recomputes data **server-side**, builds safe preset payload and calls YouCam only for fixed public demo-avatar URLs.
- `api/youcam-status.js`: polls corresponding Face Reshape / Skin Simulation task.
- `tests/scenario-engine.test.js`: regression tests. Run: `node --test tests/scenario-engine.test.js`.

## Nutrient arithmetic and illustrative formula

For each food, `portionCount = amount * units[unit]`. Known sodium, sugar and calories are summed; **missing values remain flagged as unknown**, rather than silently being treated as zero.

For a *fully known* sodium total:

```js
excessMg = Math.max(0, sodiumMg - 2000);
intensity = Math.min(1, excessMg / 4000);
```

2000 mg refers to WHO's adult sodium intake guidance, **not a swelling threshold**. The 4000 mg ceiling is an editorial visual design parameter, **not a validated dose–response relationship**.

Face Reshape presets (all illustrations):
- none: face width 0
- low: face width +6, left/right reshape +3
- medium: face width +12, left/right reshape +6
- high: face width +18, left/right reshape +9

The one-click **Too much salt** preset uses medium intensity independently of an individual's intake; no numeric intake is invented. Manual input uses the calculated, capped intensity and switches to the nearest tier; unknown sodium disables an exact API mapping. Excessively large inputs disable image processing.

**Balanced eating** uses `skin-simulation` with cosmetic `radiance:0.25, texture:0.20, pores:0.15`. This is an illustrative *skin-enhancement edit*, not a cause-and-effect prediction about food. **Fast food, energy drinks, trans fats, and sun exposure** currently provide educational descriptions only; adverse skin effects are **not** implemented by falsely reversing the beautification API.

## Confirmed API request structures

- Face Reshape: `POST /s2s/v2.0/task/face-reshape`, `{src_file_url,version:'1.0',source:'yco',features:{face_width,face_reshape_left,face_reshape_right}}`. The payload explicitly sets `global:{skin_smooth_strength:0,skin_smooth_color_intensity:0}` to avoid the beautifying skin-smoothing example used in provider docs. This prevents a default smoothing effect being accidentally enabled, but it does **not** guarantee an edema-like appearance. Inspect the request payload in Playground before spending the final free trial.
- Skin Simulation: `POST /s2s/v2.0/task/skin-simulation`, `{src_file_url,radiance,texture,pores}`.
- Poll `GET /s2s/v2.0/task/{kind}/{task_id}` using the task's actual kind.

See official documentation:
- https://docs.perfectcorp.com/reference/ai_face_reshape/section/overview
- https://docs.perfectcorp.com/reference/ai_skin_simulation/v1.0/paths/~1s2s~1v2.0~1task~1skin-simulation/post

## Private test deployment — no API key in GitHub

1. Add `YOUCAM_API_KEY` in Vercel **server-only** environment variables.
2. Create a unique private `YOUCAM_DEMO_ACCESS_CODE` with at least **16 random characters**, stored in Vercel only (not GitHub). This is a private testing password, not the YouCam API key.
3. Keep `YOUCAM_DEMO_ENABLED` unset or `false` until ready. To begin a **private** test, set it to `true` and redeploy.
4. In Studio, choose a public avatar and the salt or balanced preset; accept the disclosure and enter the private test access code. Personal photos are **never uploaded** to YouCam by this implementation.
5. Compare before/after. Inspect actual response shape, billed units and picture quality. Immediately disable `YOUCAM_DEMO_ENABLED` again when finished.

This access code provides only a simple private-test gate, **not public rate limiting**. Before public launch implement persistent per-account/IP limits, usage caps, abuse controls and spending alerts. Serverless local counters are not reliable. Never leave the private test endpoint enabled with widely shared access credentials.

Suggested allocation of the owner's two free test runs: **one Face Reshape salt scenario**, **one Skin Simulation balanced scenario**. Confirm pricing and eligibility before either run; an unsuccessful attempt may still consume units. No tests were sent to YouCam during this development.

## What remains unverified

- Availability and permissions for both API endpoints in the owner's account.
- Output appearance and the exact nested URL in the task-result JSON.
- Whether the selected public demo images pass YouCam's face validation.
- Production Vercel redeploy and browser/mobile QA.
- Image-generation rate limiting, personal-photo upload consent and retention (not implemented).
- This is **not a medical device**; visual effects are educational illustrations, not skin or edema forecasts.
