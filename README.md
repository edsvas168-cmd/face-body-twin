# Face & Body Twin — working front-end prototype

A responsive, English-language educational appearance scenario explorer for the YouCam API hackathon.

## Start

- Open `index.html` in Chrome or Edge; the app is a single static file, no build step or backend needed.
- On GitHub, create or upload `index.html` in the root of `edsvas168-cmd/face-body-twin`, then import that repository into a **new** Vercel project. Do not overwrite HijabMatch.
- No secrets or API keys belong in `index.html` or in a public repository.

## Implemented now

- Face Twin and full-body Body Twin, using original illustrated **woman and man** demo models.
- Optional photo picker (JPG/PNG/WebP, 8 MB max), with local-only browser preview. This does **not** send the photo to YouCam.
- Hypothetical and actual-meal flows, multi-item food basket, portions/grams/estimated spoons.
- Product-based calculation of total sugar, sodium and energy, with links to sources.
- Automated scenario selection and a conservative visual illustration when sodium in the selected foods triggers an app-design level; no medical dose-response claims.
- Educational explanation, suggestions and timing caveats.
- Extreme-input safety block (cautious product rules, **not** medical toxicity thresholds).
- Responsive mobile/desktop styling.

## Important limits

**This is not an integrated YouCam demo yet.** The original vector faces and bodies are altered by an in-browser illustration preset. User-uploaded photos are previewed with a *basic local visual filter*, not face-aware/body-aware reshaping. Accurate photo processing requires a **separate, tested server-side YouCam integration**. The UI labels these states clearly.

The software does not claim that eating a given amount of salt causes a particular facial percentage, that an isolated sugary food causes same-day acne, or that a single meal changes body composition. Weights of a teaspoon/tablespoon are approximations, not lab measurements. Missing nutrient measurements remain unknown; the sodium subtotal can be incomplete.

Catalog entry notes:
- Coca-Cola Original Kazakhstan 330 ml: 35 g sugar, 139 kcal (official source). Sodium is not asserted from that FAQ.
- Table salt: 1 g salt ≈ 400 mg sodium. Salt contributes 0 kcal.
- Granulated sugar: approximation of 3.87 kcal per g; spoon weights are estimated.
- Fast-food cheeseburger: USDA FNDDS example, normalized to 100 g, not an actual local brand's nutritional label.
- French fries: USDA FNDDS example, normalized to a 60 g cup, not an actual local brand's nutritional label.

## Next development step for Codex

Read `CODEX_TASK.md` and the uploaded revised technical specification. Implement one tested vertical slice of the official YouCam API, with the server-side secret protected. Do not invent an API endpoint or parameter: use and test the official v2 task flow on the account first. Body Reshape is separately available in the official documentation but must be tested for eligibility and unit costs.

## Sources

- WHO sodium: https://www.who.int/news-room/fact-sheets/detail/sodium-reduction
- AAD acne and diet: https://www.aad.org/public/diseases/acne/causes/diet
- Coca-Cola KZ: https://www.coca-cola.com/kz/ru/about-us/faq/how-much-sugar-is-contained-in-the-coca-cola-can
- USDA: https://fdc.nal.usda.gov/
- USDA example cheeseburger: https://getfoodfacts.com/food/cheeseburger-from-fast-food-1-medium-patty-2706897
- USDA example fries: https://getfoodfacts.com/food/potato-french-fries-nfs-2709456
- YouCam docs: https://d3anovxlgi5hpq.cloudfront.net/document/index.html

## Privacy

Local demo photos are held in a browser object URL and are not sent over the network by app code. Hosted pages still request Google Fonts as part of their styling. Do **not** deploy a real photo-upload/API flow until the consent text, provider handling, retention/deletion and privacy policy match the actual processing.
