# CPU Scheduler Visualizer 🖥️📊

A full-stack CPU Scheduling Algorithm Visualizer built using **C++ (backend)**, **Node.js (bridge server)**, and **HTML/CSS/JavaScript (frontend)**.

This project simulates and visualizes classical CPU scheduling algorithms with accurate computations performed in C++ for performance and correctness.


## 🚀 Features

- Implements CPU Scheduling Algorithms in **C++**
  - FCFS (First Come First Serve)
  - SJF (Shortest Job First)
  - SRTF (Shortest Remaining Time First)
  - Round Robin
  - HRRN
  - LRTF
- Interactive frontend for process input
- Gantt Chart visualization
- Process table with:
  - Arrival Time
  - Burst Time
  - Completion Time
  - Turnaround Time
  - Waiting Time
- Performance metrics:
  - Average Waiting Time
  - Average Turnaround Time
  - Throughput
- Clean separation of frontend, backend, and bridge


## 🛠️ Tech Stack

- **Backend:** C++ (core scheduling logic)
- **Bridge Server:** Node.js + Express
- **Frontend:** HTML, CSS, JavaScript
- **Data Exchange:** JSON


## 📁 Project Structure

CPU-Scheduler-Visualizer/
├── backend/ # C++ scheduling algorithms
├── bridge/ # Node.js server (connects frontend & C++)
├── frontend/ # UI (HTML/CSS/JS)
├── .gitignore
└── README.md

## ▶️ How It Works

1. User enters process data in the frontend
2. Frontend sends JSON request to Node.js server
3. Node.js invokes the C++ scheduler executable
4. C++ processes scheduling and writes output JSON
5. Node.js sends result back to frontend
6. Frontend renders Gantt chart & metrics


## 📌 How to Run Locally

### 1️⃣ Backend (C++)
- Compile scheduler using g++
- Ensure `scheduler.exe` is accessible to Node.js

### 2️⃣ Bridge Server
```bash
cd bridge
npm install
node server.js

3️⃣ Frontend

Open frontend/index.html in browser


