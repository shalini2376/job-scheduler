### 📌 Job Scheduler & Automation System

A full-stack Job Scheduler & Automation System built using Node.js, Express, SQLite, and React, designed to simulate job execution workflows with status tracking and webhook notifications.

### 🚀 Project Overview

- This application allows users to:
- Create scheduled jobs
- View jobs in a dashboard
- Filter jobs by status and priority
- Run jobs and track lifecycle transitions
- View job details
- Trigger a webhook automatically when a job completes

The project focuses on backend logic, API design, and state handling, with a clean and functional frontend built using React and Tailwind CSS.

## 🌐 Live Deployment

### Backend
- Platform: Render
- Base URL: https://job-scheduler-en2d.onrender.com

### Frontend
- Platform: Netlify
- URL: https://jobscheduler26.netlify.app

### Notes
- Environment variables are used for configuration.
- SQLite is used for persistence; data may reset on redeploy in free hosting.

### 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- SQLite
- Axios (for webhook calls)

## Frontend

- React (Vite)
- React Router
- Tailwind CSS

### ✨ Features

## Backend Features

- Create jobs with default status (pending)
- List all jobs with optional filters:

    - status
    - priority

- View individual job details
- Simulate job execution:
    ```bash
    - pending → running → completed
    ```
- Trigger webhook automatically on job completion
- Persistent storage using SQLite

## Frontend Features

- Dashboard to view all jobs
- Filter jobs by status and priority
- Create job form
- Run job button
- Job details page
- Clean, responsive UI using Tailwind CSS

### 🔄 Job Lifecycle

1. Job is created with status pending

2. On clicking Run Job:

    - Status changes to running
    - After simulation delay, status becomes completed

3. On completion:

    - Webhook is triggered with job payload

### 📁 Project Structure

```bash
job-scheduler/
│
├── backend/
│   ├── db/
│   │   └── database.sqlite
│   ├── routes/
│   ├── controllers/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

### ⚙️ API Endpoints

1. Create Job
```
POST /jobs
```

2. Get All Jobs (with filters)
```
GET /jobs?status=pending&priority=high
``` 

3. Get Job by ID
```
GET /jobs/:id
```

4. Run Job
```
POST /jobs/run/:id
```

### Example Job Object 
```
{
  "id": 1,
  "name": "Send Daily Report",
  "priority": "high",
  "status": "completed",
  "createdAt": "2025-01-05T10:30:00Z"
}
```

### 🖥️ Local Setup Instructions

1️⃣ Clone Repository
```
git clone <repository-url>
cd job-scheduler
```

2️⃣ Backend Setup
```
cd backend
npm install
npm start
``` 

Backend runs on:

```http://localhost:5000 ```
 
3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```

Frontend runs on:

``` http://localhost:5173 ```

### 🎨 UI Note

The UI is intentionally kept simple and clean to focus on:

- Functionality
- State management
- API integration

Further UI enhancements can be added iteratively.

### 🧠 Key Learnings

- REST API design with filtering
- Job lifecycle simulation
- Webhook integration
- Handling async job execution
- React Router navigation
- Tailwind CSS integration with Vite

### 📌 Future Improvements

- Cron-based scheduling
- Authentication & role management
- Job retry logic
- Logs & execution history
- Advanced UI animations