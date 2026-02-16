class SchedulingSimulator {
  constructor() {
    this.processCounter = 1;
    this.initializeEventListeners();
    this.initializeProcessTable();
    this.updateProcessCount();
  }

  initializeEventListeners() {
    // Algorithm selection
    document.querySelectorAll('input[name="algorithm"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.handleAlgorithmChange(e.target.value);
        const algoEl = document.getElementById("selectedAlgorithm");
        if (algoEl) {
          algoEl.textContent = e.target.value;
        }
      });
    });

    // Time quantum visibility
    this.handleAlgorithmChange("FCFS");

    // Process table controls
    document
      .getElementById("addProcess")
      .addEventListener("click", () => this.addProcess());
    document
      .getElementById("removeProcess")
      .addEventListener("click", () => this.removeProcess());

    // Action buttons
    document
      .getElementById("runScheduler")
      .addEventListener("click", () => this.runScheduler());
    document
      .getElementById("resetForm")
      .addEventListener("click", () => this.resetForm());

    // Update process count on input changes
    document
      .getElementById("processTableBody")
      .addEventListener("input", () => {
        this.updateProcessCount();
      });
  }

  handleAlgorithmChange(algorithm) {
    const timeQuantumContainer = document.getElementById(
      "timeQuantumContainer",
    );
    timeQuantumContainer.classList.toggle("hidden", algorithm !== "RR");
  }

  initializeProcessTable() {
    // Add initial process
    this.addProcess();
  }

  addProcess() {
    const tbody = document.getElementById("processTableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>P${this.processCounter}</td>
            <td><input type="number" min="0" value="0" class="arrival-time" required></td>
            <td><input type="number" min="1" value="1" class="burst-time" required></td>
        `;
    tbody.appendChild(row);
    this.processCounter++;
    this.updateProcessCount();
  }

  removeProcess() {
    const tbody = document.getElementById("processTableBody");
    if (tbody.children.length > 1) {
      tbody.removeChild(tbody.lastChild);
      this.processCounter--;
      this.updateProcessCount();
    }
  }

  updateProcessCount() {
    const count = document.getElementById('processTableBody').children.length;

    const countEl = document.getElementById('processCount');
    if (countEl) {
        countEl.textContent = count;
    }
}

  collectProcessData() {
    const processes = [];
    const rows = document
      .getElementById("processTableBody")
      .querySelectorAll("tr");

    rows.forEach((row, index) => {
      const pid = `P${index + 1}`;
      const arrivalTime =
        parseInt(row.querySelector(".arrival-time").value) || 0;
      const burstTime = parseInt(row.querySelector(".burst-time").value) || 1;

      processes.push({
        pid,
        arrivalTime,
        burstTime,
        priority: 0, // Default priority as per backend
      });
    });

    return processes;
  }

  buildRequestPayload() {
    const algorithm = document.querySelector(
      'input[name="algorithm"]:checked',
    ).value;
    const timeQuantum =
      parseInt(document.getElementById("timeQuantum").value) || 2;
    const processes = this.collectProcessData();

    return {
      algorithm,
      timeQuantum: algorithm === "RR" ? timeQuantum : 0,
      processes,
    };
  }

  async runScheduler() {
    if (!this.validateInputs()) return;

    this.showLoading(true);

    try {
      const payload = this.buildRequestPayload();

      const response = await fetch("https://cpu-scheduler-visualizer-ny42.onrender.com/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      this.renderResults(data);
    } catch (error) {
      console.error(error);
      alert("C++ Backend is not running or returned an error");
    } finally {
      this.showLoading(false);
    }
  }

  validateInputs() {
    const burstInputs = document.querySelectorAll(".burst-time");
    let isValid = true;

    burstInputs.forEach((input) => {
      if (parseInt(input.value) < 1) {
        input.style.borderColor = "#ef4444";
        isValid = false;
      } else {
        input.style.borderColor = "";
      }
    });

    if (!isValid) {
      alert("Please ensure all burst times are at least 1.");
    }

    return isValid;
  }

  showLoading(show) {
    const loading = document.getElementById("loading");
    const noResults = document.getElementById("noResults");
    const results = document.getElementById("results");

    if (show) {
      loading.classList.remove("hidden");
      noResults.classList.add("hidden");
      results.classList.add("hidden");
    } else {
      loading.classList.add("hidden");
    }
  }

  renderResults(data) {
    const noResults = document.getElementById("noResults");
    const results = document.getElementById("results");

    noResults.classList.add("hidden");
    results.classList.remove("hidden");

    // Render Gantt Chart
    this.renderGanttChart(data.ganttChart);

    // Render Process Table
    this.renderProcessTable(data.processTable);

    // Render Metrics
    this.renderMetrics(data);
  }

  renderGanttChart(ganttChart) {
    const container = document.getElementById("ganttChart");
    container.innerHTML = "";

    ganttChart.forEach((block) => {
      const blockEl = document.createElement("div");
      blockEl.className = "gantt-block";
      blockEl.style.backgroundColor = this.getColorForProcess(block.pid);
      blockEl.innerHTML = `
                <div class="process-id">${block.pid}</div>
                <div class="duration">${block.duration} units</div>
            `;
      container.appendChild(blockEl);
    });
  }

  renderProcessTable(processTable) {
    const tbody = document.getElementById("resultsTableBody");
    tbody.innerHTML = "";

    processTable.forEach((process) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${process.pid}</td>
                <td>${process.arrivalTime}</td>
                <td>${process.burstTime}</td>
                <td>${process.completionTime}</td>
                <td>${process.turnaroundTime}</td>
                <td>${process.waitingTime}</td>
            `;
      tbody.appendChild(row);
    });
  }

  renderMetrics(data) {
    const container = document.getElementById("metricsGrid");
    container.innerHTML = "";

    const processes = data.processTable;

    let totalWT = 0;
    let totalTAT = 0;
    let totalTime = 0;

    processes.forEach((p) => {
      totalWT += p.waitingTime;
      totalTAT += p.turnaroundTime;
      totalTime = Math.max(totalTime, p.completionTime);
    });

    const avgWT = (totalWT / processes.length).toFixed(2);
    const avgTAT = (totalTAT / processes.length).toFixed(2);
    const throughput = (processes.length / totalTime).toFixed(3);

    const metrics = [
      { label: "Avg Waiting Time", value: avgWT, unit: "units" },
      { label: "Avg Turnaround Time", value: avgTAT, unit: "units" },
      { label: "Total Time", value: totalTime, unit: "units" },
      { label: "Throughput", value: throughput, unit: "proc/unit" },
    ];

    metrics.forEach((metric) => {
      const card = document.createElement("div");
      card.className = "metric-card";
      card.innerHTML = `
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value">${metric.value}</div>
            <div class="metric-unit">${metric.unit}</div>
        `;
      container.appendChild(card);
    });
  }

  getColorForProcess(pid) {
    // Generate consistent color based on process ID
    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#6366f1",
    ];
    const index = parseInt(pid.substring(1)) - 1;
    return colors[index % colors.length];
  }

  resetForm() {
    // Reset algorithm to FCFS
    document.querySelector('input[value="FCFS"]').checked = true;
    this.handleAlgorithmChange("FCFS");
    const algoEl = document.getElementById("selectedAlgorithm");
    if (algoEl) {
      algoEl.textContent = "FCFS";
    }

    // Reset time quantum
    document.getElementById("timeQuantum").value = 2;

    // Reset process table
    const tbody = document.getElementById("processTableBody");
    tbody.innerHTML = "";
    this.processCounter = 1;
    this.initializeProcessTable();

    // Hide results
    document.getElementById("noResults").classList.remove("hidden");
    document.getElementById("results").classList.add("hidden");

    this.updateProcessCount();
  }
}

// Initialize the simulator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SchedulingSimulator();
});
