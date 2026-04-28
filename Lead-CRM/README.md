# 🚀 Wanga's CRM (Full Stack Project)

A modern **Customer Relationship Management (CRM)** system built with:

* ⚛️ React (Frontend)
* ⚡ Node.js + Express (Backend)
* 🐘 PostgreSQL (Database)
* 🔐 JWT Authentication
* 🎯 TypeScript (Full Stack)

---

# 📌 Features

## 🔐 Authentication

* User signup & login
* JWT-based authentication
* Protected routes
* Role-based access (admin / agent)

## 👥 Leads Management

* Create leads
* Update lead status (new, contacted, converted, lost)
* Delete leads
* Assign leads to users

## 📝 Notes System

* Add notes to leads
* Track communication history
* Chronological ordering

## 📊 Dashboard (Frontend)

* Lead overview
* Status filtering
* Clean UI with responsive design

---

# 🏗️ Tech Stack

## Frontend

* React + TypeScript + Tailwindcss
* Vite
* Context API / Hooks
* Fetch API

## Backend

* Node.js
* Express
* TypeScript
* JWT Authentication
* bcrypt

## Database

* PostgreSQL
* Relational schema design

---

# 📁 Project Structure

```
Backend-CRM/
│
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── leads.ts
│   ├── utils/
│   │   └── jwt.ts
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
```

---

# ⚙️ Installation

## 1. Clone repository

```bash
git clone https://github.com/030817SOM/FUTURE_FS_02.git
cd Lead-CRM
```

---

## 2. Install backend dependencies

```bash
cd Backend-CRM
npm install
```

---

## 3. Setup environment variables

Create a `.env` file:

```env
PORT=4000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## 4. Run database

Make sure PostgreSQL is running and tables are created:

* users
* leads
* lead_notes

---

## 5. Start backend server

```bash
npm run dev
```

Server runs on:

```
http://localhost:4000
```

---

## 6. Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔗 API Endpoints

## 🔐 Auth

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/auth/signup | Create user      |
| POST   | /api/auth/login  | Login user       |
| GET    | /api/auth/me     | Get current user |
| POST   | /api/auth/logout | Logout user      |

---

## 👥 Leads

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/leads     | Get all leads   |
| POST   | /api/leads     | Create lead     |
| GET    | /api/leads/:id | Get single lead |
| PATCH  | /api/leads/:id | Update lead     |
| DELETE | /api/leads/:id | Delete lead     |

---

## 📝 Notes

| Method | Endpoint                     | Description |
| ------ | ---------------------------- | ----------- |
| POST   | /api/leads/:id/notes         | Add note    |
| DELETE | /api/leads/:id/notes/:noteId | Delete note |

---

# 🔐 Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Token sent in requests:

```
Authorization: Bearer <token>
```

5. Backend validates token on protected routes

---

# 🧠 Role System

* **Admin**: can see all leads
* **Agent**: can only see assigned leads

---

# 🚀 Deployment

## Frontend

* netlify

## Backend

* Render

## Database

* Supabase / Neon PostgreSQL

---

# ⚠️ Common Issues

## CORS Error

Ensure backend has:

```ts
cors({ origin: "http://localhost:5173" })
```

---

## Cannot connect to backend

Check:

* Backend running
* Correct API URL

---

## Token issues

Ensure:

```
Authorization: Bearer <token>
```

---

# 👨‍💻 Author

Built by **Wanga Somhlaba** as a full-stack CRM project.

---

# 📌 License

MIT License
