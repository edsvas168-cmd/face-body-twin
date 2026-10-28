# Next Codex task: integrate actual AI while preserving the two-page architecture

Repository: `edsvas168-cmd/face-body-twin`

Please inspect the live project first, then work in small changes. Explain to the nontechnical project owner in Russian.

## Product requirements

1. **Keep the homepage `/` informational only.** About, benefits, how it works, research and FAQ stay on homepage. Never move the form or results back to the homepage.
2. **Keep the simulator isolated at `/studio/`.** Face Twin / Body Twin and woman / man / optional uploaded photo must all work from this location.
3. The core formula calculates food nutrients from source values and portions. Preserve handling for unknown sodium/sugar and distinguish sodium from salt. Do not invent percentages of facial swelling or skin change.
4. Research and recommendations follow the scenario, with honest description of timing and uncertainty. No misleading claims of specific future appearance after one meal.
5. Visually, use real editorial photographs, coherent premium green-and-ivory typography, responsive design, accessible contrast, crisp mobile alignment. No cartoon illustrations on the homepage.
6. Prototype graphics must clearly say 'illustrative' until AI is actually working. Face demos currently only use a CSS display treatment; body demos still use vector silhouettes.
7. Investigate current YouCam Face Reshape and Body Reshape docs, actual endpoint availability in project account, required credits/units and permitted input images. Do not pretend that an endpoint predicts the physiological effect of diet.
8. Add serverless API routes if supported. Keep the API token in Vercel Environment Variables, never in frontend or logs. Never request secrets to be pasted into chat or committed to GitHub.
9. Prioritize actual Face AI integration. Treat Body as separate phase. Protect consent and image deletion/retention before external uploads.
10. Validate the existing functionality (models, food entry, safety warnings, results), mobile layout and broken links. Make minimal safe changes and explain deployment steps.
