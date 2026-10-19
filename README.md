Markdown
# 🏥 HealthConnect Platform

A modern, full-stack healthcare platform designed to streamline medical consultations, doctor finding, and health management. Built with a robust **NestJS** backend and a responsive **Next.js** frontend.

---

## 🌟 Key Features

* **Doctor Finder & Booking:** Browse doctors, filter by specialties, and manage appointments seamlessly.
* **AI Health Assistant:** Integrated **Google Gemini API** for smart health consultations and triage guidance.
* **Authentication & Authorization:** Secure JWT-based user authentication and role-based access.
* **Database & ORM:** Relational database management using **PostgreSQL (Supabase)** and **TypeORM**.
* **Modern UI:** Built with **Next.js**, **React**, and **Material-UI** for an intuitive user experience.

---

## 🏗️ Tech Stack

### **Backend**
* **Framework:** NestJS (Node.js v22)
* **Database:** PostgreSQL (Hosted on Supabase)
* **ORM:** TypeORM
* **AI Integration:** Google Gemini API (`@google/genai`)
* **Auth:** JWT (`jsonwebtoken`, `bcrypt`)
* **Deployment:** Railway

### **Frontend**
* **Framework:** Next.js (React)
* **Styling:** Material-UI (MUI), CSS Modules
* **State Management & Routing:** Next.js App / Page Router

---

## 📁 Repository Structure

```text
Healthcare-Project/
├── Backend/
│   └── healthconnect-api/     # NestJS Backend API
├── Frontend/
│   └── my-app/                # Next.js Frontend Application
├── pnpm-workspace.yaml        # Monorepo Workspace Config
└── README.md
⚙️ Environment Variables Setup
1. Backend (Backend/healthconnect-api/.env)
Create a .env file inside Backend/healthconnect-api/:

Code snippet
# Server Config
PORT=3000

# Database Connection (Supabase PostgreSQL)
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/postgres

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# AI Integration
GEMINI_API_KEY=your_gemini_api_key
2. Frontend (Frontend/my-app/.env)
Create a .env file inside Frontend/my-app/:

Code snippet
# Live Railway Backend URL
NEXT_PUBLIC_API_URL=[https://healthcare-project-production-cace.up.railway.app](https://healthcare-project-production-cace.up.railway.app)
🚀 Getting Started (Local Development)
Prerequisites
Node.js: >= 22.0.0

Package Manager: npm or pnpm

Git

Installation
Clone the repository:

Bash
git clone [https://github.com/nimra13045/Healthcare-Project.git](https://github.com/nimra13045/Healthcare-Project.git)
cd Healthcare-Project
Run Backend:

Bash
cd Backend/healthconnect-api
npm install
npm run start:dev
Backend will run on: http://localhost:3000

Run Frontend:

Bash
cd ../../Frontend/my-app
npm install
npm run dev
Frontend will run on: http://localhost:3000 (or http://localhost:3001)

🌐 Deployment Details
Backend Live Base URL: https://healthcare-project-production-cace.up.railway.app

Hosted on: Railway (Nixpacks / Node.js 22 Environment)

Database: Supabase Cloud PostgreSQL

🤝 Contributors
Nimra Nazir – Full Stack Developer (Government College University Faisalabad)

