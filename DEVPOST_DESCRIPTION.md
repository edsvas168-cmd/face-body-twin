# Devpost submission — Face & Body Twin

> This is the replacement copy for the Devpost project description. **Publishing it to the existing Devpost submission must be done in Devpost itself.**

## Tagline

**Food & appearance trends — facts, not myths.**

## Inspiration

Food and skincare trends travel fast, and short videos often make dramatic claims about what a meal, an energy drink or salty food will do to someone's face. We built Face & Body Twin to help people examine those claims through reference-based nutrition numbers, plain-language evidence and transparent visual examples rather than guesses.

## What it does

Our **Face Twin** prototype lets users explore food-related trends, including high-sodium meals, frequent fast food, energy drinks, trans fats and balanced eating. They can choose a one-tap educational scenario or enter specific products and quantities. The app displays available sugar, sodium and calorie information, flags missing data, provides context and sources, and presents clearly labeled illustrative face comparisons.

The app also offers general, non-medical advice and unsponsored skincare-category suggestions. User-uploaded photographs are previewed locally in the current demo.

**Important:** Visual edits demonstrate possibilities; they do not predict personal skin changes, diagnose conditions or establish that a particular food causes a specific appearance.

## How we built it

We built a responsive four-language web interface using HTML, CSS and JavaScript, deployed via GitHub and Vercel. A reusable nutrition catalog and scenario engine keep calculations separate from illustrative image parameters. Server-side YouCam AI Face Reshape and AI Skin Simulation integration code is prepared for access-controlled testing with public demo avatars only. The actual effects, provider access and result rendering still require live validation; we do not present an untested private integration as a publicly available AI feature.

## What makes it different

- **Facts before filters:** Reference-based nutrient arithmetic is visible and missing values are marked.
- **Science-aware scenarios:** Each claim has explanations, limitations and sources.
- **Transparent visualization:** Previews are educational illustrations, not medical forecasts.
- **Privacy-conscious prototype:** Personal photo previews remain in the browser.
- **Business potential:** Brand collaborations, educational campaigns and future white-label or embedded experiences.

## Challenges and lessons

A food-label calculation and an image edit measure different things. We deliberately avoid presenting an editorial visual preset as a medical model. The project also requires testing YouCam's actual supported effect directions, photo requirements, task responses and unit usage before extending AI output to more scenarios.

## What's next

**Face-focused MVP; body visualization — roadmap.**

We are prioritizing reliable Face Twin image generation, clearer evidence labels, live API testing and safer private photo processing. We also plan to validate brand partnerships and accessible multilingual education.

---

**Character assets were created with generative AI tools and used as illustrative visual models.**
