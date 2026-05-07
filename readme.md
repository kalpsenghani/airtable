# Airtable Project

A full-stack Airtable integration project built using Angular frontend and Node.js backend.

## Features

- Connect with Airtable API
- Fetch Airtable bases and tables
- Display records in AG Grid
- Modern Angular standalone components
- Node.js Express backend
- Environment variable support using `.env`

---

## Tech Stack

### Frontend
- Angular
- TypeScript
- AG Grid

### Backend
- Node.js
- Express.js
- Airtable API

---

## Project Structure

```bash
airtable-project/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
AIRTABLE_TOKEN=your_token
AIRTABLE_BASE_ID=your_base_id
```

Start backend server:

```bash
node index.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs on:

```bash
http://localhost:4200
```

---

## API Integration

This project uses Airtable REST API for:
- Fetching Bases
- Fetching Tables
- Fetching Records

---

## Author

Shubham Sharma