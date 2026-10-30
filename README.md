# ResumeAI

A responsive React + Vite resume builder. Resume editing, local autosave, live previews, template switching, print/PDF export, and the ATS content analysis run in the browser. Resume data is stored in this browser's `localStorage`; no database or account service is included.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## AI endpoint setup

AI writing actions call the URL in `VITE_AI_ENDPOINT`. The browser does **not** call an AI provider directly and must never contain a provider API key. Add the endpoint to a local `.env` file:

```env
VITE_AI_ENDPOINT=https://your-domain.example/api/resume-ai
```

Implement that route on a trusted server or serverless function. It should:

1. Accept a JSON `POST` body containing `action`, `text`, `role`, and `resume`.
2. Validate and limit the request size, authorize/rate-limit requests as appropriate, and call your AI provider using a secret stored only in the server environment.
3. Return JSON in the shape `{ "content": "Generated resume text" }`.
4. Handle CORS and errors for your deployment, and avoid logging personal resume details unnecessarily.

Supported `action` values are `generate_summary`, `improve_writing`, `career_objective`, `ats_rewrite`, `rewrite_experience`, `generate_project`, and `suggest_skills`. Without a configured endpoint, AI buttons show a setup message; all non-AI builder features remain available.

## Notes

- Resume content and the appearance preference persist in local browser storage. Clearing browser storage removes the saved resume.
- The ATS checker uses transparent, deterministic checks for contact details, summary length, experience, skills, role-related keywords, measurable achievements, and education/projects. Its score is an estimate, not a guarantee of employer ATS results.
- PDF download uses `html2pdf.js`; browser print is also available.
