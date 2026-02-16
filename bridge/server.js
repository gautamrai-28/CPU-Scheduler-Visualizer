const express = require("express");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const ROOT_DIR = path.resolve(__dirname, "..");

// Serve frontend
app.use(express.static(path.join(ROOT_DIR, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "frontend", "index.html"));
});

const INPUT_PATH = path.join(ROOT_DIR, "bridge", "input", "processes.json");
const OUTPUT_PATH = path.join(ROOT_DIR, "bridge", "output", "result.json");

const SCHEDULER_PATH = path.join(
  ROOT_DIR,
  process.platform === "win32" ? "scheduler.exe" : "scheduler"
);

// API route
app.post("/schedule", (req, res) => {
  try {
    // Write input JSON for C++ scheduler
    fs.writeFileSync(INPUT_PATH, JSON.stringify(req.body, null, 2));

    // Execute scheduler binary
    execFile(
      SCHEDULER_PATH,
      { cwd: ROOT_DIR, timeout: 5000 },
      (error) => {
        if (error) {
          return res.status(500).json({
            error: "Scheduler execution failed",
          });
        }

        try {
          const result = JSON.parse(
            fs.readFileSync(OUTPUT_PATH, "utf-8")
          );
          res.json(result);
        } catch {
          res.status(500).json({
            error: "Failed to read scheduler output",
          });
        }
      }
    );

  } catch {
    res.status(500).json({
      error: "Server error",
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
