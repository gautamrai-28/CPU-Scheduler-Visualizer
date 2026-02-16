CPU Scheduler Visualizer 🖥️📊

A full-stack CPU Scheduling Algorithm Visualizer built using C++ (core engine), Node.js + Express (bridge server), and HTML/CSS/JavaScript (frontend).

The scheduling logic runs in C++ for performance and accuracy, while the Node.js server connects it to an interactive web interface.

🚀 Features
🔹 Implemented Algorithms (C++)

FCFS (First Come First Serve)

SJF (Shortest Job First)

SRTF (Shortest Remaining Time First)

LJF (Longest Job First)

LRTF (Longest Remaining Time First)

Round Robin

HRRN

🔹 Frontend Features

Interactive process input table

Dynamic algorithm selection

Automatic metrics calculation

Gantt Chart visualization

Detailed process results table

🔹 Performance Metrics

Average Waiting Time

Average Turnaround Time

Total Completion Time

Throughput

🛠️ Tech Stack

Core Engine: C++

Backend Bridge: Node.js + Express

Frontend: HTML, CSS, JavaScript

Data Exchange: JSON

Deployment: Render

📁 Project Structure
CPU-Scheduler-Visualizer/
│
├── backend/        # C++ scheduling logic
├── bridge/         # Express server (C++ bridge)
├── frontend/       # UI (HTML, CSS, JS)
├── scheduler       # Compiled C++ executable
└── README.md

⚙️ How It Works

User enters process data in the browser

Frontend sends JSON request to Express server

Node.js writes input JSON

C++ scheduler executable processes the data

Output JSON is generated

Server sends result back to frontend

Gantt chart and metrics are rendered

▶️ Run Locally
1️⃣ Compile C++ Scheduler
g++ scheduler.cpp -o scheduler


(Windows)

g++ scheduler.cpp -o scheduler.exe

2️⃣ Start Bridge Server
cd bridge
npm install
node server.js

3️⃣ Open in Browser

Visit:

http://localhost:8080

🌐 Live Deployment

Deployed on Render.
https://cpu-scheduler-visualizer-ny42.onrender.com/
