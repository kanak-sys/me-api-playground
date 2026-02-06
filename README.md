
# Me-API Playground

A simple full-stack playground that stores and exposes my personal profile, skills, and projects through a REST API with a minimal frontend UI.

---

## 🔧 Tech Stack
- **Backend:** Django 4, Django REST Framework
- **Frontend:** React (Vite)
- **Database:** SQLite (local), PostgreSQL-ready
- **Hosting:** Render (Backend), Netlify (Frontend)

---

## 🌐 Live URLs
- **Frontend:** https://me-api-playground.netlify.app
- **Backend API:** https://me-api-playground.onrender.com
- **Health Check:** `/api/health/`

---

## 📌 Features
- Create / Read / Update profile
- Store skills and projects
- Query projects by skill
- Full-text search
- Health endpoint for liveness
- Minimal, responsive frontend

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/health/` | Health check |
| GET | `/api/profile/1/` | Get profile |
| GET | `/api/projects/` | List projects |
| GET | `/api/projects/?skill=python` | Filter by skill |
| GET | `/api/search/?q=portfolio` | Search |

---

## 🧱 Architecture
- Django REST API exposes structured JSON data
- React frontend consumes API using Axios
- CORS enabled for frontend-backend communication
- Environment-based configuration

---

## ⚙️ Local Setup

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_db
python manage.py runserver


# 📘 Me-API Playground

A full-stack personal API playground that exposes my **profile, skills, and projects** via a REST API and a clean React frontend.
Designed to be **easy to clone, install, run, and understand** by anyone reviewing the project.

---

## 🧱 Tech Stack

### Backend

* Python **3.9+**
* Django **4.2**
* Django REST Framework
* SQLite (local, PostgreSQL-ready)
* Gunicorn (production)

### Frontend

* React **18**
* Vite
* Axios
* Plain CSS (no UI framework)

### Deployment

* Backend → **Render**
* Frontend → **Netlify**

---

## 🌐 Live Links

* **Frontend:** [https://me-api-playground.netlify.app](https://me-api-playground.netlify.app)
* **Backend API:** [https://me-api-playground.onrender.com](https://me-api-playground.onrender.com)
* **Health Check:** `/api/health/`

---

## 📂 Project Structure

```
me-api-playground/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   ├── me_api/
│   └── api/
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── src/
│   └── dist/
│
└── README.md
```

---

## 🚀 How to Run Locally (After Cloning)

### 🔹 Step 1: Clone the repository

```bash
git clone https://github.com/<your-username>/me-api-playground.git
cd me-api-playground
```

---

## ⚙️ Backend Setup (Django)

### 🔹 Prerequisites

* Python **3.9 or higher**
* pip
* Virtual environment support

Check:

```bash
python --version
```

---

### 🔹 Create & activate virtual environment

```bash
cd backend
python -m venv .venv
```

Activate:

**Windows**

```bash
.venv\Scripts\activate
```

**Mac / Linux**

```bash
source .venv/bin/activate
```

---

### 🔹 Install backend dependencies

```bash
pip install -r requirements.txt
```

---

### 🔹 Run database migrations

```bash
python manage.py migrate
```

---

### 🔹 Seed database (IMPORTANT)

```bash
python manage.py seed_db
```

This creates:

* A default **Profile**
* Sample **Skills**
* Sample **Projects**

⚠️ Without this step, `/api/profile/` will return `404`.

---

### 🔹 Start backend server

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

Test:

```
http://127.0.0.1:8000/api/health/
```

Expected:

```json
{ "status": "ok" }
```

---

## 🎨 Frontend Setup (React + Vite)

### 🔹 Prerequisites

* Node.js **18+**
* npm

Check:

```bash
node --version
npm --version
```

---

### 🔹 Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

### 🔹 Environment configuration (VERY IMPORTANT)

Create a file:

```
frontend/.env
```

Add:

```env
VITE_API_BASE=http://127.0.0.1:8000/api
```

📌 **Why this matters**

* Vite does NOT use `process.env`
* Ports may differ (`5173`, `5174`, etc.)
* This avoids hardcoding URLs

---

### 🔹 Start frontend

```bash
npm run dev
```

Vite will auto-select an available port, for example:

```
http://localhost:5173
```

or

```
http://localhost:5174
```

✔ Any port is fine.

---

## 🔗 API Endpoints

| Method | Endpoint                      | Description                      |
| ------ | ----------------------------- | -------------------------------- |
| GET    | `/api/health/`                | Health check                     |
| GET    | `/api/profile/`               | Default profile (no ID required) |
| GET    | `/api/profile/<id>/`          | Profile by ID                    |
| GET    | `/api/projects/`              | List projects                    |
| GET    | `/api/projects/?skill=python` | Filter projects                  |
| GET    | `/api/skills/top/`            | Top skills                       |
| GET    | `/api/search/?q=django`       | Search                           |

---

## 🧪 Sample cURL Commands

```bash
curl http://127.0.0.1:8000/api/health/
curl http://127.0.0.1:8000/api/profile/
curl http://127.0.0.1:8000/api/projects/?skill=python
```

---

## 🧠 Common Issues & Fixes

### ❌ `/api/profile/` returns 404

➡️ You forgot to seed the database.

Fix:

```bash
python manage.py seed_db
```

---

### ❌ Axios import error

```text
Failed to resolve import "axios"
```

Fix:

```bash
cd frontend
npm install axios
npm run dev
```

---

### ❌ CORS error

Ensure backend `settings.py` allows frontend origin:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
]
```

---

## 🧠 Design Decisions (Important)

* Frontend **does not hardcode IDs**
* Backend exposes a **default profile endpoint**
* Environment variables used for API base URL
* Clean separation of backend and frontend
* Minimal UI to focus on API usability

---

## ⚠️ Known Limitations

* No authentication (read-only API)
* No pagination
* SQLite used for simplicity
* Single-profile assumption

---

## 🚀 Future Improvements

* JWT authentication
* Pagination & rate limiting
* PostgreSQL in production
* Dockerized setup
* CI/CD pipeline

---


>>>>>>> Stashed changes
