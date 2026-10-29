# Codex instructions — Face & Body Twin v0.3

## Repository
`edsvas168-cmd/face-body-twin`

## Product direction
Keep the warm beige/ivory and forest-green editorial design. The homepage is **informational only**; all interactive food input and face/body scenario visualization stays at `/studio/`. Never merge the full Studio UI back into the homepage.

On the homepage, two original AI-generated illustrations demonstrate the *concept* of before/possible scenario: `/assets/face-comparison.webp` and `/assets/body-comparison.webp`. Do not claim these are medically predicted consequences of food or genuine YouCam API outputs.

## What is working
- Main and Studio routes, dedicated `/assets` directory
- EN/RU language toggle on homepage (default English)
- Studio Face / Body tabs and female / male demo models, optional own image preview
- Food selection, amounts and nutrient calculations, scenario explanations, warnings, and research links

## Next implementation priorities
1. Verify latest YouCam Face Reshape endpoint, task workflow, photo upload, parameter schema, unit billing, and hackathon eligibility in the user's account.
2. Replace only the existing fake/demo appearance effect with genuine API image output if YouCam supports the intended *illustrative* transformation. The automatic mapping from nutrients to any chosen visual preset is a product rule, **not** a validated physiological model; disclose it.
3. Keep all secrets server-side in Vercel environment variables, never in client HTML, public GitHub files or logs.
4. Document photo consent, external processor, retention and deletion, and handle API errors/timeouts/low units without suggesting AI succeeded when it did not.
5. Verify Body Reshape separately. Do not pretend Body mode is real AI until a body-photo workflow is tested.
6. Keep extreme-input safety stops and avoid treating missing nutrient data as zero.
7. Preserve homepage visuals, mobile responsiveness, research sources, Studio controls and calculations while changing APIs.

## Scientific constraints
- Nutrient totals are calculations from verified nutrient data and actual portion definitions, not guessed appearance changes.
- Sodium is not salt: `salt_g ≈ sodium_mg * 2.5 / 1000` if estimating conversion.
- The WHO sodium target is not a swelling threshold. No universal "grams salt -> % face edema" or "sugar -> acne tomorrow" formula.
- For high-glycemic eating patterns and acne, communicate uncertainty and timing appropriately. Informational guidance, not a diagnosis or guarantee.
- Current Studio is a prototype. Do not silently replace error handling with fake generated result.
