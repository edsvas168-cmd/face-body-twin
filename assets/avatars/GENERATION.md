# Avatar assets

Character assets were created with generative AI tools and used as illustrative visual models.

Place portrait images in `face/` and full-length character images in `body/`. The current Studio resolves these optional slots:

| Model | Portrait | Full length |
|---|---|---|
| Woman | `face/woman.webp` | `body/woman.webp` |
| Man | `face/man.webp` | `body/man.webp` |

Convert image files to WebP and keep realistic dimensions suitable for the UI. Ensure that each portrait and full-body view shows the same intended character. For additional characters (the planned set of eight), the registry in `studio/index.html` must be expanded with unique IDs and UI choices; adding files alone will not make them selectable.

Do not upload private user photos into the public repository. Generated illustrations are not evidence-based predictions or medical outcomes.

The asset folders intentionally contain `.gitkeep` placeholders until images are supplied.
