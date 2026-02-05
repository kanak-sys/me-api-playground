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
