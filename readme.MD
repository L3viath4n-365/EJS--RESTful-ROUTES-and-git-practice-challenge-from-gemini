# DevRadar — Local Project Health Dashboard
> A clean, RESTful Express & EJS dashboard designed to log, monitor, and track the real-time health scores and build statuses of local developer projects.
> 
## 🎯 Overview
**DevRadar** serves as a central monitoring console for active coding projects. It leverages full **RESTful architecture** with HTTP verb spoofing (method-override), dynamic **EJS templating**, and in-memory object storage tagged with unique uuid identifiers.
## 🛠️ Stack & Dependencies
 * **Runtime:** Node.js (ES Modules)
 * **Framework:** Express.js
 * **Templating:** EJS
 * **Security & Utility Middleware:**
   * helmet — Sets security HTTP headers (CSP disabled for local asset rendering)
   * compression — Gzip response compressor
   * morgan — Development HTTP request logger
   * method-override — Enables DELETE and PUT/PATCH verbs from HTML forms
   * dotenv — Environment variable management
   * uuid (v4) — Unique project ID generation
## 📁 Project Layout
```text
DevRadar/
├── public/
│   ├── src/
│   │   └── output.css       # Ignored by Git (Tailwind build output)
│   └── css/
├── views/
│   ├── index.ejs            # Root landing page / redirection hook
│   └── projects/
│       ├── project.ejs      # Index: Displays all project cards
│       ├── new.ejs          # New: Form to create a project
│       └── show.ejs         # Show: Displays details for a single project
├── .env                     # Environment variables (PORT, NODE_ENV)
├── .env.example
├── .gitignore
├── index.js                 # Primary Express server application
├── package.json
└── README.md

```
## 📋 Data Structure
Every project entry stored in the dashboard array matches the following schema:
```json
{
  "id": "c9b8a7f6-e5d4-4c3b-b2a1-0f9e8d7c6b5a",
  "title": "DevRadar Dashboard",
  "techStack": "Express, EJS, Tailwind",
  "status": "In Progress",
  "healthScore": 87
}

```
 * **Status Options:** "Stable", "In Progress", "Breaking"
 * **Health Score:** Integer ranging from 1 to 100
## 🚀 RESTful API & Routing Guide
The app strictly adheres to REST principles using method-override via the query string ?_method=VERB:
| HTTP Verb | Path / Route | Action Description | EJS View |
|---|---|---|---|
| **GET** | / | Root redirect / Homepage | index.ejs |
| **GET** | /projects | **Index**: Displays card array of all active projects | projects/project.ejs |
| **GET** | /projects/new | **New**: Renders form to add a new project log | projects/new.ejs |
| **POST** | /projects | **Create**: Processes form payload, attaches uuidv4(), redirects to /projects | *None (Redirects)* |
| **GET** | /projects/:id | **Show**: Displays isolated details for a target project | projects/show.ejs |
| **DELETE** | /projects/:id | **Destroy**: Removes project by ID from database, redirects to /projects | *None (Redirects)* |
## 🚦 Getting Started
### 1. Prerequisites
 * **Node.js** v20.11+ (utilizes native import.meta.dirname)
 * **npm**
### 2. Environment Setup
Create a .env file in the root directory:
```env
PORT=3000
NODE_ENV=development

```
### 3. Installation & Run
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start

```
## 🔗 Deletion Form Hook Example
To execute a clean RESTful deletion from an EJS template (project.ejs or show.ejs), wrap the button in a POST form with _method=DELETE:
```html
<form action="/projects/<%= project.id %>?_method=DELETE" method="POST">
  <button type="submit">Destroy Project Log</button>
</form>

```
