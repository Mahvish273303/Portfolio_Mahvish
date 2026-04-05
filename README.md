# Mahvish Portfolio — MERN Stack

A clean, dynamic, admin-controlled portfolio built with the MERN stack.

## Project Structure

```
Portfolio_Mahvish/
├── backend/          # Node.js + Express API
└── frontend/         # React (Vite) + Tailwind CSS
```

---

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio
PORT=5000
ADMIN_EMAIL=mahvish@admin.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to `http://localhost:5000`.

---

## Features

### Public (Users)
- View Projects, Certificates, Tech Stack, Achievements
- Send messages via Contact form

### Admin
- Login at `/admin`
- Add / Delete Projects and Certificates
- Dashboard at `/admin/dashboard`

---

## API Endpoints

| Method | Endpoint               | Access |
|--------|------------------------|--------|
| GET    | /api/projects          | Public |
| POST   | /api/projects          | Admin  |
| DELETE | /api/projects/:id      | Admin  |
| GET    | /api/certificates      | Public |
| POST   | /api/certificates      | Admin  |
| DELETE | /api/certificates/:id  | Admin  |
| POST   | /api/contact           | Public |
| POST   | /api/auth/login        | Public |

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
