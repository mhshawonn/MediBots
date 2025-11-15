# MediBots

Gemini-powered medical support assistant that provides concise, evidence-based responses while directing users to seek professional care when needed. The project ships with a FastAPI backend, a React + Vite front-end, and a lightweight research workspace for prompt experiments.

---

## Highlights
- Conversational UI tuned for medical guidance with clear safety disclaimers.
- FastAPI service that proxies requests to Google Gemini with configurable model parameters.
- React front-end with optimistic UI updates and resilient error handling.
- Research notebook and curated reference material to refine prompts and responses.

---

## Repository Map
```
.
├── app.py                 # FastAPI application exposing the chat endpoint
├── frontend/              # React + Vite single-page app
├── requirements.txt       # Python backend dependencies
├── src/                   # Scaffold for helper utilities and prompts
├── research/              # Experiments, notebooks, and medical references
├── template.py            # Utility script for bootstrapping project files
└── README.md
```

---

## Prerequisites
- Python 3.10+ (recommended 3.11)
- Node.js 18+ and npm 9+
- Google Gemini API access (`GEMINI_API_KEY`)

Optional: Conda, uv, or another virtual environment manager.

---

## Backend Quickstart

1. **Create a virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate           # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **Configure environment variables**  
   Create a `.env` file in the repository root:
   ```bash
   GEMINI_API_KEY=your_api_key                 # Required
   GEMINI_MODEL=gemini-2.5-flash               # Optional override
   GEMINI_TEMPERATURE=0.4                      # Optional override
   GEMINI_TOP_P=0.95                           # Optional override
   FRONTEND_ORIGIN=http://localhost:5173       # Comma-separated list for CORS
   ```

4. **Run the API server**
   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Verify health**
   ```bash
   curl http://localhost:8000/health
   # {"status":"ok"}
   ```

---

## Frontend Quickstart

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API base (optional)**  
   The app defaults to the browser origin. To point to a different backend, create `frontend/.env`:
   ```bash
   VITE_API_BASE=http://localhost:8000
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the UI**  
   Visit the printed localhost URL (default `http://localhost:5173`) and start chatting.

---

## API Reference

- `GET /health` – Simple readiness probe.

- `POST /api/chat`
  - **Request body**
    ```json
    {
      "messages": [
        {"role": "system", "content": "Optional system instruction"},
        {"role": "user", "content": "Describe your symptoms"}
      ]
    }
    ```
  - **Response**
    ```json
    {
      "reply": "Gemini generated answer"
    }
    ```
  - The server enforces: at least one user message and the final message must come from the user. Errors are returned with standard HTTP codes when validation fails or Gemini is unreachable.

---

## Development Notes
- `src/helper.py` and `src/prompt.py` are intentionally empty placeholders; add shared utilities or prompt templates there as the project evolves.
- Update `FRONTEND_ORIGIN` if you expose the API publicly or run the front-end from another hostname.
- Logging defaults to `INFO`. Adjust `logging.basicConfig` in `app.py` for more insight during debugging.

---

## Research Workspace
- `research/trials.ipynb` – Sandbox notebook for experimenting with prompts or response grading.
- `research/data/*` – Reference PDFs, such as the *Gale Encyclopedia of Medicine*, that can inform prompt tuning or retrieval strategies.

---

## Troubleshooting
- **`Gemini API key is not configured`**: Ensure `.env` is in the backend root and the process has read access.
- **CORS errors in the browser**: Confirm `FRONTEND_ORIGIN` includes the exact origin (protocol + host + port) of your front-end.
- **Empty replies**: Gemini may return empty text for certain prompts; check the backend logs and consider adjusting temperature or top-p settings.

---

## Next Steps
- Improve prompt engineering in `src/prompt.py` based on research findings.
- Add persistence (e.g., vector search) if you plan to ground answers in custom medical datasets.
- Harden the UI with authentication and user session storage for production deployments.
