# Codex instructions — Face & Body Twin

Project: `https://github.com/edsvas168-cmd/face-body-twin`

You are developing a functioning hackathon MVP using the existing `index.html` prototype, **not** rewriting the concept. Site copy must stay English; explanations to the project owner can be in Russian. Protect existing design and all current flows. Prefer free or minimal-cost infrastructure (static frontend + Vercel serverless API). Do not touch the separate `hijabmatch` repository.

## Product requirements (agreed)

1. A user can use our provided illustrated female/male demo models or upload their photo.
2. They can choose either **Face Twin** or **Body Twin**. For Body Twin, require an appropriate full-body photo if using a personal picture.
3. They can enter one or multiple foods, including amount in meaningful units and a hypothetical or actual consumption mode. Assume a one-day selection without an explicit date picker.
4. Normalize source-based nutrient data (energy, sodium, total sugars), distinguish salt from sodium, preserve nulls and source links, and show incomplete totals honestly. Brand name, market, portions, date of verification and USDA FDC record IDs are useful.
5. Automatically determine *which illustrative scenario category* to show. The program may use explicitly named and carefully tested design presets, but must not present effects as scientific predictions or measured average human response.
6. Display *Original vs. Possible Scenario*, practical and safe recommendations, conditional timing notes, scientific sources and a clear illustration disclaimer. Avoid dramatic transformations and no immediate sugar→acne guarantee.
7. Validate extreme potentially dangerous inputs before generating any image. An actual ingestion report of a potentially dangerous quantity should get urgent-help guidance, never just a transformation.
8. No compensation suggestions involving excessive hydration, fasting or excessive exercise.
9. User-uploaded photos must have consent, sensible retention/deletion and no unnecessary logging. Secrets must never reach frontend or public GitHub.

## Immediate technical work (priority order)

A. Check current official YouCam API docs and actual account features/credits. Do **not** assume it can simulate physiological facial swelling. Documentation: https://d3anovxlgi5hpq.cloudfront.net/document/index.html
B. Implement Vercel serverless endpoint for the supported AI **Face Reshape** task flow (server-only `YOUCAM_API_KEY`, image validation, task create, status polling, timeout/error/credit handling, safe upload strategy). Use exact official V2 requests and verify with available account/Playground tests; no hard-coded credentials. Use an accessible public demo image only with valid licensing and permissions; a personal upload may need a secure provider-supported upload.
C. Keep client-only illustration when API is unavailable, with accurate 'demo' labeling, not a fake AI success.
D. After Face Reshape works, verify **Body Reshape** separately (full-body source image requirements, endpoint, presets, credits) before enabling real body processing.
E. Expand product catalog only with provenance. No invented values for fast-food combos or other products.
F. Add tests for multi-item calculations, missing sodium, extreme quantities, consent, input validation, and API errors. Test on mobile.

## Suggested acceptance cases

- One Coca-Cola KZ 330 ml: sugar=35g, kcal=139. Ten cans: sugar=350g, kcal=1390. Sodium remains unknown/incomplete.
- 1 tsp table salt (illustrative estimate 6g): sodium approx 2400mg, 0kcal. Do not claim exactly how many percentage points it changes the face.
- Two tbsp table salt (estimated 36g): block visualization; urgent-help guidance for actual intake.
- Two tbsp granulated sugar (estimated 24g): calculate sugar≈24g and energy≈92.88kcal; do not automatically draw immediate acne.
- A cheeseburger and fries use only their specific reference serving values, never generic undefined 'fast food' numbers.
- User-uploaded portrait/whole-body images: validate photo type, dimensions, orientation and consent; do not expose or retain raw photos unnecessarily.

## Honesty requirements

- The present `index.html` is a working **client-side demonstration**. Its photo scenario uses a simple local filter and its built-in model scenes are SVG illustrations.
- If there is no YouCam connection or quota, display this limitation, never silently pass off CSS effects as YouCam.
- Face/Body visual intensity has **no validated physiological coefficient**. Do not invent sodium-to-swelling, sugar-to-acne, calorie-to-body-fat, or single-day waist-change formulas.
- Medical claims should be bounded to what reputable research actually supports. Link sources in the result.

## Delivery

Make small reviewable changes, test locally, prepare a commit/PR for the `face-body-twin` repo. Report changes and missing API access, credits or provider capabilities explicitly in Russian. Provide straightforward preview/deployment instructions. Do not promise a working AI render before testing it.
