# Face & Body Twin — version 0.3

This update uses the warm editorial look approved for the project: ivory/beige canvas, forest-green highlights, large readable typography, and **two original AI-generated illustrative Before/Possible Scenario comparisons** for Face Twin and Body Twin.

The website has **two separate pages**:

- `/` (`index.html`) — informational landing page, purpose/benefits, how it works, research, FAQ; English default with RU translation toggle.
- `/studio/` (`studio/index.html`) — existing interactive nutrition & scenario prototype, preserved and visually harmonized with the new homepage. Studio interface remains in English.

## Install on GitHub and deploy automatically to Vercel

**Keep the folders.** Upload the contents of this archive to the root of `edsvas168-cmd/face-body-twin` on branch `main`:

```
index.html
studio/index.html
assets/face-comparison.webp
assets/body-comparison.webp
assets/food-balanced.webp
assets/food-fastfood.webp
assets/food-soda.webp
assets/food-sugar.webp
assets/woman-portrait.webp
assets/man-portrait.webp
assets/editorial-duo.webp
README.md
CODEX_TASK.md
```

The repo can be deployed by Vercel preset `Other` with no build step. `studio/index.html` is automatically served at `/studio/`.

**Important GitHub tip:** dragging a folder can sometimes flatten it. Check the displayed paths *before* committing. If it shows `face-comparison.webp` in the root instead of `assets/face-comparison.webp`, cancel and enter the existing `assets` folder, then upload images from within that folder. Replace root `index.html` separately and `studio/index.html` from within the `studio` folder.

This update contains no API keys and does not alter the nutrition calculation JavaScript. Existing YouCam integration is **not** included. The Studio uses demonstration imagery and local effects rather than true AI face/body processing. The source illustrations on the homepage were generated for this project; they do not depict validated physiological predictions.

## Helpful next steps

1. Visually inspect mobile and desktop after Vercel deploy.
2. Verify all `/assets/...` images load (no 404), and `/studio/` works.
3. Verify food calculations with the existing test examples in `CODEX_TASK.md`.
4. Connect YouCam only after confirming supported parameters, secure server-side key handling, image consent, and provider data retention.
