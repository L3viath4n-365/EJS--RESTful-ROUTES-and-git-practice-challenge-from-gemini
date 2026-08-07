# DevRadar — Local Project Health Dashboard

A clean, RESTful Express & EJS dashboard designed to log, monitor, and track the real-time health scores and build statuses of local developer projects.

---

## 🎯 Overview

**DevRadar** serves as a central monitoring console for active coding projects. It leverages full **RESTful architecture** with HTTP verb spoofing (method-override), dynamic **EJS templating**, and **PostgreSQL** for persistent data storage.

Key features include:

- **Create** new project entries with randomized health scores and statuses
- **View** all projects in a card-based dashboard
- **Search** projects by title with real-time filtering
- **View** detailed information for individual projects
- **Delete** projects with proper RESTful routing

---

## 🛠️ Stack & Dependencies

| Category | Technologies |
| :--- | :--- |
| **Runtime** | Node.js (ES Modules) |
| **Framework** | Express.js |
| **Templating** | EJS |
| **Database** | PostgreSQL |
| **Styling** | Tailwind CSS |
| **Middleware** | helmet, compression, morgan, method-override, dotenv |
| **Utilities** | uuid (v7) — Unique project ID generation |

---

## 📁 Project Layout

```
Root/
├── public/
│   ├── images/
│   └── src/
│       ├── main.css          # Input Tailwind source file
│       └── output.css        # Compiled Tailwind CSS (Ignored by Git)
├── routes/
│   └── api.js                # Express router for application endpoints
├── views/
│   ├── partials/
│   │   ├── footer.ejs        # Shared footer partial (displays errors)
│   │   └── header.ejs        # Shared header partial (includes search bar)
│   ├── projects/
│   │   ├── new.ejs           # Form page to create a new project
│   │   ├── project.ejs       # Index view displaying all project cards
│   │   └── show.ejs          # Detailed view for a single project
│   └── index.ejs             # Root landing page / layout view
├── .env                      # Local environment configurations (Ignored by Git)
├── .env.example              # Template for environment configuration
├── .gitignore                # Specifies intentionally untracked files
├── db.js                     # PostgreSQL connection & pool setup
├── package.json              # Project dependencies & npm scripts
├── README.md                 # Project documentation
└── server.js                 # Primary Express server entry point & middleware
```

---

## 📋 Data Structure

Every project entry stored in the database matches the following schema:

```json
{
  "id": "0191f5a2-7e4b-7d9c-8a3f-2b1e6c9d8a7f",
  "title": "Backend Engineer with Tailwind",
  "tech_stack": "Express, EJS, Tailwind",
  "status": "In Progress",
  "health_score": 87
}
```

- **Status Options:** `"Stable"`, `"In Progress"`, `"Breaking"`
- **Health Score:** Integer ranging from 1 to 100 (auto-generated randomly)

---

## 🚀 RESTful API & Routing Guide

The app strictly adheres to REST principles using method-override via the query string `?_method=VERB`:

| HTTP Verb | Path / Route | Action Description | EJS View |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Root redirect / Homepage | `index.ejs` |
| **GET** | `/projects` | **Index:** Displays all active projects in card layout | `projects/project.ejs` |
| **GET** | `/projects/new` | **New:** Renders form to add a new project log | `projects/new.ejs` |
| **POST** | `/projects` | **Create:** Processes form payload, attaches UUID and redirects to `/projects` | None (Redirects) |
| **GET** | `/projects/filter?title=query` | **Filter:** Searches projects by title (case-insensitive) | `projects/project.ejs` |
| **GET** | `/projects/:id` | **Show:** Displays detailed view for a specific project | `projects/show.ejs` |
| **DELETE** | `/projects/:id` | **Destroy:** Removes project by ID, redirects to `/projects` | None (Redirects) |

---

## 🔍 Search & Filter Feature

DevRadar includes a **live search bar** in the header that allows you to filter projects by title:

1. Enter a search term in the header input field
2. Click the **"Search"** button or press Enter
3. The dashboard updates to show only matching projects
4. If no projects match, a friendly error message appears in the footer

**Technical Implementation:**

```javascript
router.get('/projects/filter', async (req, res, next) => {
    try {
        const { title } = req.query;
        const result = await db.query(
            "SELECT * FROM public.projects WHERE title ILIKE '%' || $1 || '%'",
            [title.trim()]
        );
        const data = result.rows;
        
        if (data.length === 0) {
            return res.render('projects/project', { 
                dataBase: data, 
                error: 'No cards matched this title' 
            });
        }
        res.render('projects/project', { dataBase: data, error: null });
    } catch (err) {
        res.render('projects/project', { dataBase: null, error: err.message });
        next(err);
    }
});
```

---

## 🚦 Getting Started

### 1. Prerequisites

- **Node.js** v20.11+ (utilizes native `import.meta.dirname`)
- **npm**
- **PostgreSQL** database instance

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=devradar
```

### 3. Database Setup

Run the following SQL to create the projects table:

```sql
CREATE TABLE public.projects (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tech_stack TEXT,
    status VARCHAR(50) DEFAULT 'In Progress',
    health_score INTEGER CHECK (health_score >= 1 AND health_score <= 100)
);
```

### 4. Installation & Run

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

---

## 🔗 Deletion Form Hook Example

To execute a clean RESTful deletion from an EJS template (`project.ejs` or `show.ejs`), wrap the button in a POST form with `?_method=DELETE`:

```ejs
<form action="/projects/<%= project.id %>?_method=DELETE" method="POST">
    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded">
        Destroy Project Log
    </button>
</form>
```

---

## 🐞 Error Handling

DevRadar includes comprehensive error handling with **user-friendly error messages** displayed in the footer. Key error scenarios include:

- **Empty search terms** — prompts user to enter a search query
- **No matching results** — displays "No cards matched this title"
- **Database errors** — shows descriptive error messages
- **Missing project IDs** — handles 404 cases gracefully

```ejs
<!-- Footer error display example -->
<footer class="w-full flex justify-center items-center">
    <input type="text" name="error" id="error" 
        placeholder="<%= error || 'THIS IS A TEXT FOOTER THAT DOES NOTHING BUT DISPLAY ERRORS'.toUpperCase() %>"
        class="w-full overflow-hidden outline-none bg-zinc-700 text-lg p-5 text-slate-100 font-bold">
</footer>
```

---

## 📈 Future Enhancements

Potential features for future development:

- [ ] User authentication and project ownership
- [ ] Project status updates via PUT/PATCH routes
- [ ] Real-time health score monitoring with WebSocket
- [ ] Export/import project data as JSON
- [ ] Deployment to cloud platforms (Render, Heroku, etc.)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Built as part of a learning challenge to practice:

- RESTful routing with Express.js
- EJS templating with partials
- PostgreSQL database integration
- Error handling and user feedback
- Git workflow and version control

---
 **Happy Coding! 🚀**