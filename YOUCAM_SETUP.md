# YouCam Skin Simulation: secure demo integration

The app now contains two Vercel serverless handlers: `/api/youcam-start` and `/api/youcam-status`.

## Enable deliberately

1. Obtain an API key at https://yce.makeupar.com/api-console/en/api-keys/.
2. In Vercel, set the server-only environment variable `YOUCAM_API_KEY`. NEVER add it to GitHub or client JavaScript.
3. Leave `YOUCAM_DEMO_ENABLED` unset (default disabled) until credits, budget caps and rate limiting are configured. When ready, set `YOUCAM_DEMO_ENABLED=true`.
4. Redeploy. Use only provided public demo avatars for now: uploaded personal photos are **not** transmitted to YouCam.
5. Test actual returned result JSON and adjust `youcam-status.js` if its image URL is nested differently.

## Safety and technical scope

This integration uses documented `/s2s/v2.0/task/skin-simulation` API with a conservative **cosmetic enhancement** preset `radiance:0.25, texture:0.2`. The feature does **not** simulate medical or dietary effects. It is separate from food scenarios. API quota may be charged for successful tasks.

Start endpoint builds its own fixed hosted demo image URL and explicitly requires a demo-avatar selection and consent; the client cannot submit an arbitrary third-party image URL. Public calls can still consume credits. **Before enabling public access, install actual per-user/IP rate limiting, authentication or a robust anti-abuse gate and spending alerts.** The current implementation has no rate limiter.

Official documentation:
- https://docs.perfectcorp.com/develop/quick_start_guide
- https://docs.perfectcorp.com/reference/ai_skin_simulation/v1.0/paths/~1s2s~1v2.0~1task~1skin-simulation/post

Deployment and a live API call have not been performed in this change.
