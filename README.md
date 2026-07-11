# 🔄 CPU Scheduler Visualizer

An interactive web-based simulator engineered to demonstrate, analyze, and visualize operating system CPU scheduling algorithms in real-time. Designed to bridge theoretical Operating System concepts with modern web technologies, this project provides an intuitive environment for understanding, evaluating, and comparing classical CPU scheduling strategies through interactive visualizations and performance analytics.

---

## 🌐 Live Deployment

| Resource | Link |
|----------|------|
| **GitHub Repository** | https://github.com/gautamrai-28/CPU-Scheduler-Visualizer 
| **Live Demo** | https://cpu-scheduler-visualizer-ny42.onrender.com/ 

---

# 📖 Overview

CPU scheduling is one of the most fundamental concepts in Operating Systems. Understanding how different scheduling algorithms behave under varying workloads is essential for analyzing process execution efficiency and system performance.

**CPU Scheduler Visualizer** provides an interactive environment where users can:

- Simulate multiple CPU scheduling algorithms
- Visualize execution using animated Gantt Charts
- Compare scheduling strategies
- Observe process execution in real time
- Analyze important scheduling metrics instantly

The project combines a **high-performance C++ scheduling engine** with a **responsive web interface**, resulting in a production-ready educational visualization platform.

---

# ✨ Core Simulation Features

## 📊 Interactive Gantt Chart Visualization

Visualize process execution through an animated Gantt Chart that clearly illustrates:

- Process execution order
- Context switching
- Idle CPU intervals
- Execution timeline
- Scheduling progression in real time

This graphical representation makes algorithm behavior significantly easier to understand than traditional textual outputs.

---

## ⚙️ Comprehensive Algorithm Suite

The simulator supports a broad collection of classical CPU scheduling algorithms:

| Algorithm | Type |
|-----------|------|
| First-Come, First-Served (FCFS) | Non-Preemptive |
| Shortest Job First (SJF) | Non-Preemptive |
| Shortest Job First (SJF) | Preemptive |
| Priority Scheduling | Non-Preemptive / Preemptive |
| Round Robin (RR) | Time-Sliced |

Each scheduling algorithm is executed independently while preserving algorithmic correctness and execution efficiency.

---

## 📈 Real-Time Metrics & Evaluation

The simulator dynamically computes essential scheduling performance indicators, including:

- Turnaround Time (TAT)
- Waiting Time (WT)
- Response Time (RT)
- CPU Utilization
- Average Waiting Time
- Average Turnaround Time
- Average Response Time

These metrics allow users to objectively compare scheduling policies under identical workloads.

---

## 🧩 Custom Workload Configuration

Users can create fully customized scheduling scenarios by configuring:

- Process IDs
- Arrival Time
- Burst Time
- Priority
- Time Quantum (Round Robin)

This enables experimentation with diverse workloads and facilitates comparative scheduling analysis.

---

# 🏗️ Architecture & Tech Stack

The project follows a modular architecture separating the scheduling engine from the visualization layer.

## Core Logic & Scheduling Engine

- **Language:** C++
- Efficient implementation of classical scheduling algorithms
- Optimized simulation logic
- Deterministic scheduling computation
- High algorithmic accuracy

---

## Graphical User Interface

- HTML5
- CSS3
- JavaScript

Features include:

- Responsive layout
- Interactive controls
- Dynamic timeline rendering
- Smooth visualization updates
- Real-time scheduling feedback

---

## Production Deployment

The application is deployed on **Render**, providing a production-ready environment for seamless access and demonstration.

---

# 🧠 Scheduling Algorithms Implemented

- ✅ First-Come, First-Served (FCFS)
- ✅ Shortest Job First (Non-Preemptive)
- ✅ Shortest Job First (Preemptive)
- ✅ Priority Scheduling
- ✅ Round Robin Scheduling

Each implementation follows standard Operating System scheduling semantics and computes corresponding execution statistics.

---

# 📁 Repository Structure

```text
CPU-Scheduler-Visualizer/
├── backend/            # C++ scheduling engine logic and algorithm implementations
├── frontend/           # JavaScript visualizer, UI logic, and style assets
└── README.md           # Project documentation
```

---

# 🚀 Local Setup

## Prerequisites

- C++ Compiler (GCC / G++)
- Modern Web Browser
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/gautamrai-28/CPU-Scheduler-Visualizer.git

cd CPU-Scheduler-Visualizer
```

---

## 2. Compile the C++ Backend

Navigate to the backend directory.

```bash
cd backend
```

Compile the scheduling engine using G++.

```bash
g++ *.cpp -o scheduler
```

Run the executable.

```bash
./scheduler
```

**Windows**

```bash
scheduler.exe
```

---

## 3. Run the Frontend

Navigate to the frontend directory.

```bash
cd ../frontend
```

Open the application using any of the following methods:

- Open `index.html` directly in your browser

or

Serve the directory using a lightweight local server.

Python:

```bash
python -m http.server
```

Then visit:

```
http://localhost:8000
```

The frontend interfaces with the scheduling engine to provide an interactive visualization sandbox for experimenting with CPU scheduling algorithms.

---

# 🎨 Design & Visual Aesthetics

The interface follows a clean, corporate, and minimalist design philosophy focused on clarity and usability.

Key design characteristics include:

- Responsive layout
- High readability
- Structured information hierarchy
- Interactive scheduling controls
- Modern visualization components
- Comparative scheduling graphs
- Clean typography
- Intuitive workflow
- Minimal visual clutter

The UI is specifically optimized for educational demonstrations, technical presentations, and recruiter-friendly project showcases.

---

# 🎯 Learning Objectives

This project demonstrates practical implementation of:

- Operating System Scheduling
- Process Management
- CPU Scheduling Policies
- Algorithm Visualization
- Data Visualization
- Full-Stack Integration
- Interactive UI Development
- C++ Algorithm Engineering
- Web-Based Simulation Systems

---

# 💡 Applications

This simulator is useful for:

- Operating System coursework
- Academic demonstrations
- Interview preparation
- DSA and OS revision
- Classroom visualization
- Algorithm comparison
- Self-paced learning
- Technical portfolio showcases

---

# 🔮 Future Enhancements

- Multi-Level Queue Scheduling
- Multi-Level Feedback Queue (MLFQ)
- Highest Response Ratio Next (HRRN)
- Shortest Remaining Time First (SRTF)
- Process Import via CSV
- Execution Speed Controls
- Interactive Timeline Zoom
- Dark Mode
- Performance Comparison Dashboard
- Exportable Simulation Reports

---

# 🤝 Contributing

Contributions, feature suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is intended for educational and portfolio purposes. Feel free to explore, learn from, and extend the implementation.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub. Your support helps increase the visibility of the project and encourages future improvements.
