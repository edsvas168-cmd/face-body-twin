# Face & Body Twin — current product and engineering direction (31 October 2026)

## Positioning
**Food & appearance trends: facts, not myths.** Do not promise predictive facial changes or medical outcomes.

## MVP
- **Face Twin only**. No Body Twin mode or body comparison on the homepage and no body controls in Studio.
- User flow: pick a food-related claim or manually enter a food → inspect available reference-based nutrients → see an **illustrative** face comparison → read science-aware context and non-medical suggestions.
- Privacy: user-uploaded photos remain a local unchanged preview in the prototype; live AI tests use pre-generated public face avatars only.
- Maintain English, Russian, Spanish and Simplified Chinese translations.

## Engineering
- Shared food data: `shared/catalog.js`.
- Shared scenario/rule engine: `shared/scenario-engine.js`.
- Private YouCam code: `api/youcam-start.js`, `api/youcam-status.js`. They are disabled by default and untested with actual provider requests.
- Do not expose provider secrets in frontend code or GitHub. A private access code is **not** a substitute for production rate limiting.
- Validate supported input parameters and photo processing; report true failure states and never mark generated output successful if it is only a CSS filter.
- Preserve exact character-attribution sentence and do not alter existing generated photos unless explicitly requested.

## Science and display
- WHO reference sodium guidance is not a facial-swelling threshold; the preset mapping is editorial.
- Food-label and reference nutrient arithmetic is separate from image manipulation.
- No proof that single food intake deterministically produces acne, wrinkles or other visible outcomes.
- Unsupported adverse-skin effects should not fabricate API results.
- Keep medically relevant notices clear.

## Devpost
Use `DEVPOST_DESCRIPTION.md` for submission copy. Roadmap phrasing: **Face-focused MVP; body visualization — roadmap.**
