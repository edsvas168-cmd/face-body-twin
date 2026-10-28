# Face & Body Twin — professional multi-page prototype (v0.2)

**Two separate pages**:
- `/` = presentation-only homepage: purpose, value, how it works, research and FAQ
- `/studio/` = interactive Face Twin / Body Twin prototype, food calculator, examples, uploaded photo preview and results

The homepage no longer contains the simulator. The links work on Vercel static deployment because `studio/index.html` is served from a directory.

## Install on GitHub / Vercel

Upload these files and folders to the root of `edsvas168-cmd/face-body-twin` **without flattening the directories**:

```
index.html
studio/index.html
assets/editorial-duo.webp
assets/woman-portrait.webp
assets/man-portrait.webp
README.md
CODEX_TASK.md
```

The repo can be deployed with Vercel Preset `Other`, no build command. Existing Vercel deployment will update after GitHub commits.

## What is implemented

- Professional informational homepage with portrait photography and research links
- Separate full Studio page retaining the prototype's food input, calculated totals, validation, safety warnings, and general guidance
- Face / Body tabs, demo woman / man, optional local photo upload
- Face demo now displays photographic models. Demo after-images only receive a small CSS treatment, **not** YouCam output or physiologic modeling; Body mode still uses original vector silhouette illustrations.

## Scientific constraints

- Label all changes as visual illustrations, not clinical predictions.
- Never map arbitrary salt or sugar quantities to a verified face-shape percentage without actual validated data.
- Extreme input pauses the illustration.
- Unknown nutrient data must remain incomplete/unknown; never silently treated as measured zero.
- Uploaded photo remains local in the browser in this version. If YouCam integration is added, implement explicit consent, privacy notice, and server-only API keys before uploading any image to external services.
