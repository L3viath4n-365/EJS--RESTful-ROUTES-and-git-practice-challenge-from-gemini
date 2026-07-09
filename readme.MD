# DevRadar Dashboard — Practice Project

Here is your blueprint for a perfect practice project. It builds directly on your custom boilerplate, stretches your understanding of RESTful routing structures, and reinforces your VS Code Source Control GUI habits.

---

## 🎯 The Project: **"DevRadar" – A Local Project Health Dashboard**

You are building a central console where a developer can log the status of their active coding projects. Instead of basic generic text, you will build a structural monitoring dashboard.

### 📋 The Data Structure (Your Object Shape)

Each project log entry in your array should be an object with these exact keys:

* `id` (Generated using your freshly added `uuidv4()`)
* `title` (e.g., "DevRadar Dashboard")
* `techStack` (e.g., "Express, EJS, Tailwind")
* `status` (Must choose between: `"Stable"`, `"In Progress"`, or `"Breaking"`)
* `healthScore` (A number from 1 to 100)

---

## 🚀 Step-by-Step Execution Guide

### Phase 1: Setup & Git Initialization (GUI-First)

1. Run your master installation script in an empty project folder.
2. Run `git init` to wake up Git.
3. Open your `.gitignore` file and add your standard node files along with your Tailwind output destination:

```text
node_modules
.env
public/src/output.css

```

1. Open the **VS Code Source Control Tab**, click the **`+` (plus sign)** on the "Changes" header to stage everything, type `"Initial repository setup"`, and hit **Commit**.

### Phase 2: Build the RESTful Architecture

Open your workspace and run your `appinit` snippet to lay down your foundation. Your objective is to build out a **perfect REST routing design** for your projects resource. You must use `method-override` to hook your forms up to clean HTTP actions.

Implement these paths exactly:

| HTTP Method | Route / Path | Action Description | EJS View File |
| --- | --- | --- | --- |
| **GET** | `/projects` | **Index:** Displays all active logged projects in an eye-catching card array template. | `index.ejs` |
| **GET** | `/projects/new` | **New:** Renders a clean form layout to fill out a project entry. | `new.ejs` |
| **POST** | `/projects` | **Create:** Processes the form body, attaches a `uuidv4()` identifier, injects it into your local array, then redirects back to `/projects`. | *None (Redirects)* |
| **GET** | `/projects/:id` | **Show:** Target an explicit item using `req.params.id` to show its isolated details. | `show.ejs` |
| **DELETE** | `/projects/:id` | **Destroy:** Target an item using its explicit parameter ID, splice it out of your local array, then redirect. | *None (Redirects)* |

### Phase 3: Unleash Your Form Hooks

To make your forms hit those specialized REST paths cleanly, use your new `method-override` middleware query parameter inside your HTML templates.

* Your deletion button inside `show.ejs` or `index.ejs` must be wrapped in a specific form:

```html
<form action="/projects/<%= project.id %>?_method=DELETE" method="POST">
    <button type="submit">Destroy Project Logs</button>
</form>

```

---

## 🏁 The Verification & Sync Workflow

Once your features are running beautifully on your machine using your `npm run dev` script:

1. Stop your development server.
2. Open your **VS Code Source Control Tab**.
3. Look closely at the list of changed files. Ensure that **`output.css` is completely invisible** to Git, while your views, routes, and JSON layouts are perfectly tracked.
4. Stage your changes using the GUI `+` button.
5. Write your structural commit message: `"Feat: complete restful routing system for projects with layout hooks"`.
6. Click **Commit**, then hit **Publish Branch** to upload your work smoothly to GitHub.

Drop your code or architecture layout questions here once you start piecing the routes together!
