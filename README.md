# Job-Fit-AI — AI-Powered Job Interview Preparation

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini%20AI-2.5%20Flash-orange.svg)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/React-Vite-blue.svg)](https://react.dev/)

> An AI-powered, full-stack application that analyzes resumes against job descriptions, calculates job match scores, identifies skill gaps, generates interview preparation plans, and creates ATS-friendly PDF resumes.

---

## 📋 Table of Contents

- [Job-Fit-AI — AI-Powered Job Interview Preparation](#job-fit-ai--ai-powered-job-interview-preparation)
  - [📋 Table of Contents](#-table-of-contents)
  - [💡 Overview](#-overview)
    - [What You Can Do](#what-you-can-do)
  - [✨ Key Features](#-key-features)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [📁 Project Structure](#-project-structure)

---

## 💡 Overview

Job-Fit-AI helps candidates prepare for job interviews by analyzing their resumes against target job descriptions using Google Gemini AI.

The application identifies skill gaps, generates interview questions, provides a personalized preparation plan, and helps candidates create ATS-friendly resumes.

### What You Can Do

- **Job Match Score:** Understand how well your resume matches a job description with a score out of 100.
- **Interview Questions:** Practice technical and behavioral interview questions.
- **Skill Gap Analysis:** Identify missing skills and areas for improvement.
- **Preparation Plan:** Follow a structured plan to prepare for interviews.
- **ATS-Friendly Resume:** Generate a professionally formatted resume in PDF format.

---

## ✨ Key Features

- 🔐 **User Authentication:** Secure registration, login, and session management.
- 📄 **Resume Upload:** Upload PDF resumes for text extraction and analysis.
- 🤖 **AI-Powered Analysis:** Analyze resumes against job descriptions using Google Gemini.
- 📊 **Job Match Score:** Evaluate resume alignment with job requirements.
- 🧠 **Skill Gap Analysis:** Identify skills that need improvement.
- 💬 **Interview Preparation:** Generate technical and behavioral questions with answer guidance.
- 📅 **Preparation Plan:** Get a structured interview preparation roadmap.
- 📥 **PDF Resume Generation:** Generate and download ATS-friendly resumes.
- 📚 **Report History:** Access previously generated interview reports.

---

## 🛠️ Tech Stack

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — Backend framework
- **MongoDB Atlas** — Database
- **Mongoose** — Database modeling
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **Multer** — File uploads
- **pdf-parse** — PDF text extraction
- **Google Gemini API** — AI-powered analysis
- **Zod** — Data validation and structured AI output
- **Puppeteer** — PDF generation

### Frontend

- **React** — User interface
- **Vite** — Development server and build tool
- **SCSS** — Styling
- **Axios** — API requests

---

## 📁 Project Structure

```text
Job-Fit-AI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── hooks/
│   └── package.json
│
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT_STATUS.md
│   ├── API_DOCUMENTATION.md
│   └── DATABASE_SCHEMA.md
│
├── .gitignore
└── README.md