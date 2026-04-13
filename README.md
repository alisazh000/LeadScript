# LeadScript (Publish-Ready MVP)

LeadScript is a scriptwriter assistant with built-in `AliceAI` for chats, script generation, QA checks, and scene budget estimation.

## Implemented pre-launch upgrades (10/10)

1. Auth + server/cloud storage
- Register/login with signed auth token.
- Data is stored server-side in SQLite (ready for cloud hosting migration).

2. Real AI backend
- `AliceAI` uses OpenAI API when `OPENAI_API_KEY` exists.
- Safe deterministic fallback if API key is missing.

3. Security
- Rate limiting by IP.
- Security headers (CSP, X-Frame-Options, etc.).
- Password hashing and protected endpoints.

4. Project system
- Projects in left sidebar.
- Open/delete projects.
- Chat history per project.

5. Platform profiles QA
- Compliance checks for Netflix, YouTube, TikTok, Kion, Start.
- Score, missing requirements, recommendations.

6. Budget estimator v2
- Scene-by-scene breakdown.
- Category split (lighting/cast/equipment/post).
- Region multipliers + contingency.

7. UX improvements
- Onboarding panel.
- Autosave behavior and recent activity in sidebar.
- Cleaner chat-style split layout.

8. Full i18n switch RU/EN
- Interface language toggles from one button.

9. Tests
- API integration test: `tests/test_api.py`.
- Browser E2E test: `e2e_ui_test.js`.

10. Deployment readiness
- Dockerfile.
- `render.yaml` for Render deploy.
- PWA (`manifest.json` + service worker) for install on desktop/mobile.

## Run locally

```bash
cd C:/coder/LeadScript_v2
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
python app.py
```

Open: `http://127.0.0.1:5050`

## Tests

API tests:
```bash
pytest -q
```

UI E2E:
```bash
node e2e_ui_test.js
```

## Deploy to public internet

### Option A: Render
1. Push folder to GitHub.
2. Create new Render Web Service.
3. Render detects `render.yaml`.
4. Set `OPENAI_API_KEY` in environment variables.
5. Deploy.

### Option B: Docker
```bash
docker build -t leadscript .
docker run -p 5050:5050 --env-file .env.example leadscript
```

## Production notes
- Replace SQLite with Postgres for multi-user production.
- Use real file exporters for strict PDF/DOCX workflow if needed.
- Add privacy policy and terms page before public launch.
