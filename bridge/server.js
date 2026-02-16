const express = require("express");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Absolute project root (repo root)
const ROOT_DIR = path.resolve(__dirname, "..");

// ===== FRONTEND STATIC SERVING =====
app.use(express.static(path.join(ROOT_DIR, "frontend")));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "frontend", "index.html"));
});

// ===== FILE PATHS =====
const INPUT_PATH = path.join(ROOT_DIR, "bridge", "input", "processes.json");
const OUTPUT_PATH = path.join(ROOT_DIR, "bridge", "output", "result.json");

// Scheduler binary path
const SCHEDULER_PATH = path.join(
  ROOT_DIR,
  process.platform === "win32" ? "scheduler.exe" : "scheduler"
);

// ===== API ROUTE =====
app.post("/schedule", (req, res) => {
  try {
    console.log("\n===============================");
    console.log("=== SCHEDULE ROUTE HIT ===");
    console.log("===============================");

    console.log("ROOT_DIR:", ROOT_DIR);
    console.log("Scheduler path:", SCHEDULER_PATH);
    console.log("Scheduler exists:", fs.existsSync(SCHEDULER_PATH));

    console.log("Input folder exists:",
      fs.existsSync(path.join(ROOT_DIR, "bridge", "input"))
    );

    console.log("Output folder exists:",
      fs.existsSync(path.join(ROOT_DIR, "bridge", "output"))
    );

    console.log("Writing input JSON...");
    fs.writeFileSync(INPUT_PATH, JSON.stringify(req.body, null, 2));
    console.log("Input written successfully!");

    console.log("Executing C++ scheduler...");

    execFile(
      SCHEDULER_PATH,
      { cwd: ROOT_DIR, timeout: 5000 },
      (error, stdout, stderr) => {

        console.log("\n=== EXEC CALLBACK TRIGGERED ===");
        console.log("STDOUT:", stdout);
        console.log("STDERR:", stderr);

        if (error) {
          console.error("Execution error object:", error);
          return res.status(500).json({
            error: "C++ backend execution failed",
            details: stderr || stdout || error.message
          });
        }

        try {
          console.log("Reading output JSON...");
          const result = JSON.parse(
            fs.readFileSync(OUTPUT_PATH, "utf-8")
          );

          console.log("Output successfully read!");
          res.json(result);

        } catch (readError) {
          console.error("Output read error:", readError);
          return res.status(500).json({
            error: "Failed to read scheduler output",
            details: readError.message
          });
        }
      }
    );

  } catch (err) {
    console.error("Server crash:", err);
    res.status(500).json({
      error: "Server crashed",
      details: err.message
    });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Bridge running on port ${PORT}`);
});
