# Job Fit AI

Job Fit AI helps candidates prepare for interviews by comparing their profile with a target job description. It generates a match score, potential interview questions, skill-gap insights, and a preparation plan. It can also generate a resume PDF tailored to a saved report.

> **Important:** AI-generated scores and guidance are estimates, not hiring decisions or professional advice. Review all generated content before relying on or sharing it.

## Contents

- [Features](#features)
- [How it works](#how-it-works)
- [Technology](#technology)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [API overview](#api-overview)
- [Trade-offs and current limitations](#trade-offs-and-current-limitations)
- [Development checks](#development-checks)

## Features

- Account registration and login using an HTTP-only JWT cookie.
- Interview report generation from candidate information and a job description.
- A match score, technical and behavioral questions, skill gaps, and a preparation plan.
- Saved reports and a recent-report list.
- AI-generated resume PDF downloads based on a saved report.

## How it works

1. A user signs in and enters a job description and candidate information.
2. The backend extracts text from an uploaded PDF resume and sends the candidate and job information to Google Gemini.
3. The generated report is stored in MongoDB and returned to the frontend.
4. The user can revisit saved reports or request a generated resume PDF.

The match score is prompted to consider required technical skills, experience/projects, qualifications, preferred skills, and evidence of practical ability. It is an AI estimate, not a validated assessment.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, SCSS |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Authentication | JWT, HTTP-only cookies, bcrypt |
| AI and documents | Google Gemini, Zod, `pdf-parse`, Puppeteer |

## Project structure

```text
Job-Fit-AI/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── Config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
└── Frontend/
    ├── package.json
    └── src/
        ├── features/
        │   ├── auth/
        │   └── interview/
        ├── app.routes.jsx
        └── main.jsx
```

## Getting started

### Prerequisites

- Node.js and npm
- A MongoDB connection string
- A Google Gemini API key

The repository does not declare a Node.js engine range. Use a Node.js version compatible with the installed dependencies.

### 1. Configure the backend

Create `Backend/.env` with the variables listed below.

### 2. Install dependencies

In one terminal:

```bash
cd Backend
npm install
```

In a second terminal:

```bash
cd Frontend
npm install
```

### 3. Start the application

Start the backend:

```bash
cd Backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd Frontend
npm run dev
```

Open the Vite development URL shown in the frontend terminal. The current frontend API client uses `http://localhost:3000`, and the backend allows credentialed requests from `http://localhost:5173`.

## Environment variables

Set these in `Backend/.env`:

```dotenv
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

Keep `.env` files and API keys out of source control. The backend does not currently provide configurable frontend-origin or API-base-URL settings, so deployment to other hosts requires updating the corresponding configuration in the application.

## API overview

All routes are served by the backend. The authenticated routes use the `token` cookie.

| Method | Endpoint | Purpose | Access |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user | Public |
| `POST` | `/api/auth/login` | Log in | Public |
| `GET` | `/api/auth/logout` | Log out and blacklist the token | Cookie-based |
| `GET` | `/api/auth/get-me` | Get the current user | Authenticated |
| `POST` | `/api/interview/` | Generate and save an interview report | Authenticated |
| `GET` | `/api/interview/` | List the current user's reports | Authenticated |
| `GET` | `/api/interview/report/:interviewId` | Fetch a report | Authenticated |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate a resume PDF | Authenticated |

Interview report generation accepts multipart form data, including `jobDescription`, `selfDescription`, and a `resume` upload. The current backend parses the uploaded resume as a PDF.

## Trade-offs and current limitations

- **AI quality versus predictability:** Gemini makes it practical to generate tailored reports without maintaining a large question bank. However, output quality can vary, may contain inaccuracies, and depends on an external API, its availability, and its limits.
-
- **Privacy versus personalization:** The backend stores extracted resume text, self-description, and job description with reports. Resume and job information is also sent to Google Gemini for analysis. Avoid submitting information you do not want processed this way, and review relevant provider terms and retention settings.
-
- **PDF support versus broader file support:** The upload middleware keeps files in memory and limits them to 3 MB. The backend uses PDF text extraction; DOCX is not supported by this pipeline. The frontend currently advertises PDF or DOCX and a 5 MB limit, so its upload guidance does not match backend behavior.
-
- **Resume-less input is not currently reliable:** The interface says a self-description can be used without a resume, but the report controller unconditionally parses an uploaded file. In the current implementation, provide a PDF resume to avoid this mismatch.
-
- **Simple local development configuration:** The frontend API URL and backend CORS origin are hard-coded for local development. A production deployment needs suitable origin and API configuration, plus secure hosting and secret management.
-
- **PDF generation adds runtime cost:** Puppeteer renders the generated resume HTML into a PDF. This offers flexible formatting but uses more memory and runtime resources than a lightweight static document template.
-
- **Cookie-based sessions need deployment care:** The app uses an HTTP-only cookie and a JWT with a one-day expiry. The backend also maintains a token blacklist. Production deployments should review cookie, CORS, and CSRF protections for their specific hosting setup.
-
- **Test coverage is limited:** The backend `test` script is currently a placeholder, so it does not run an automated test suite.

## Development checks

Frontend build:

```bash
cd Frontend
npm run build
```

Frontend lint:

```bash
cd Frontend
npm run lint
```

The backend package currently does not define a functional test command.
