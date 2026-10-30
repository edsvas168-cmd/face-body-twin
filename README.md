# Face & Body Twin — Hackathon prototype

Live source for the **Face & Body Twin** educational beauty-tech concept. The home page (`/`) introduces the product, while `/studio/` houses an interactive food-and-appearance scenario prototype. All UI copy is currently in English; the home page has an EN/RU switch.

## What works

- Responsive home page and separate Studio, with Face Twin / Body Twin modes.
- Two demonstration models (woman/man) and optional local image preview.
- Multi-item food input, estimated energy, sugar and sodium totals from a small reference catalog.
- Illustrative before/possible scenario comparison, caveats, research references and extreme-input warnings.
- Photo remains in the browser; no YouCam request or upload is performed.
- Demo avatar asset slots for portrait and full-body images; existing artwork/vector fallbacks remain until new files are uploaded.

## Avatar file structure

```
assets/avatars/
  face/
    woman.webp       # optional: upload when ready
    man.webp         # optional: upload when ready
  body/
    woman.webp       # optional: upload when ready
    man.webp         # optional: upload when ready
```

The directories are tracked using `.gitkeep`. Names are **example slots**, not evidence that images are already uploaded. To expand to eight models, add an explicit asset registry and labels for the additional characters; do not overwrite different characters with the same filename. Face assets must be portraits; body assets must be full-body shots. Missing images degrade to the original existing portraits or SVG silhouettes without broken-image icons. No binary photo files have been changed during this update.

> Character assets were created with generative AI tools and used as illustrative visual models.

## Running locally

This is a static project: use a local server such as `python -m http.server 8765` from the repository root and open `http://localhost:8765/studio/`. Deploy on Vercel as a static site (no build required).

## Scientific and privacy limitations

**This is an educational visualization, not a prediction.** Food-based choices for visual effects are illustrative product rules and do not estimate an individual's future face or body. Dietary sodium may be relevant to fluid balance, but there is no medically justified "X grams = Y% swelling" relationship here. Dietary patterns and acne cannot be forecast from one meal. A sodium target is not a swelling or toxicity threshold. Unknown nutrients must never be interpreted as measured zeros. Existing food references should be independently verified against precise servings and local labels before launch.

Uploads are previewed locally using an object URL and **are not sent to YouCam** in this build. Uploaded images display unchanged before and after. The app has no account/database photo retention workflow. Avoid entering identifiable or sensitive images you would not want to use locally in the browser.

## YouCam integration status

**Not connected.** No API keys, confirmed task IDs, serverless routes, or verified Face/Body Reshape outputs exist in this repo. Never put a YouCam key in public HTML/JS. Verify the provider workflow and account eligibility, then implement a consent-gated server-side route, polling/error handling, and deletion policy before advertising live AI features. Face Reshape and Body Reshape need independent technical validation.

## Files

- `index.html`: informational landing page.
- `studio/index.html`: current static Studio, calculations, local preview.
- `CODEX_TASK.md`: implementation priorities and scientific guardrails.
- `REVIEW_RU.md`: current review/status notes.
- `assets/`: original illustrations and reserved avatar folders.

The previous README described modules and tests that were not actually present in the GitHub repository. Those claims have been corrected rather than falsely reporting shipped functionality.

## Обновление дизайна и аватаров — 30.10.2026

Главная страница переработана в тёмно-зелёной и лаймовой палитре по предоставленному HTML-референсу. Studio получила согласованные цвета и выбор четырёх возрастных групп (18–25, 26–40, 41–60, 61–80) для женской и мужской демонстрационной модели. На GitHub находятся 16 загруженных пользователем JPG: 8 портретов в `assets/avatars/face/` и 8 фотографий в полный рост в `assets/avatars/body/`. Имена имеют вид `female-18-25-face.jpg` / `male-18-25-body.jpg` и аналогично для других групп. Ни одно изображение не редактировалось. Интеграция YouCam по-прежнему не активирована.
