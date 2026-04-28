📊 Wanga’s CRM

Live demo: https://leads-crms.netlify.app/

A simple Customer Relationship Management (CRM) system designed to manage client leads generated from website contact forms. This full-stack application demonstrates how to build, connect, and manage a modern web system using React, Node.js, and PostgreSQL.

🚀 Project Overview

Wanga’s CRM helps businesses track and manage potential clients (leads) in one place. It allows users to view, update, and organize leads while keeping notes for follow-ups and conversions.

🛠️ Tech Stack
Frontend
HTML
CSS (TailwindCSS recommended)
JavaScript (React.js)

Backend
Node.js
Express.js
Database
PostgreSQL

✨ Key Features
📋 Lead Management
Store and display leads (name, email, source)

🔄 Status Tracking
Update lead status:
New
Contacted
Converted

📝 Notes & Follow-ups
Add notes to each lead
Track communication history

🔐 Secure Admin Access (Optional)
Authentication system (JWT recommended)
Protected routes for admin users

🧠 Skills Demonstrated
CRUD operations with PostgreSQL
RESTful API design
Frontend–backend integration
SQL database design & queries
Authentication & authorization
Business workflow logic

📂 Project Structure
Wangas-CRM/
│
├── frontend/        # React application
│   ├── src/
│   └── public/
│
└── README.md
⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/FUTURE_FS_02.git
cd task2

3. Install dependencies
Backend
cd backend
npm install
Frontend
cd frontend
npm install

4. Configure Environment Variables

Create a .env file in the backend folder:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/wangas_crm
JWT_SECRET=your_secret_key

4. Database Setup (PostgreSQL)

Create a database:

CREATE DATABASE wangas_crm;

Example leads table:

CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    source VARCHAR(100),
    status VARCHAR(20) DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5. Run the application
Start backend
npm run dev
Start frontend
npm start

📡 API Endpoints (Example)
Method	Endpoint	Description
GET	/api/leads	Get all leads
POST	/api/leads	Create a new lead
PUT	/api/leads/:id	Update lead status
DELETE	/api/leads/:id	Delete a lead

📌 Future Improvements
📊 Analytics dashboard
🔍 Search & filtering
📧 Email follow-ups
👥 Role-based access control
📱 Fully responsive UI
📦 Deployment
Frontend: Netlify / Vercel
Backend: Render / Railway
Database: PostgreSQL (Supabase / Neon / Railway)
👤 Author

Wanga Somhlaba

📧 Somhlabawanga03@gmail.com
🎓 University of Fort Hare (BSc Computer Science & Mathematics)
🌍 South Africa

📄 License

This project is for educational purposes.
