const express = require("express");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Absolute project root
const ROOT_DIR = path.resolve(__dirname, "..");

// Input/output paths
const INPUT_PATH = path.join(ROOT_DIR, "bridge", "input", "processes.json");
const OUTPUT_PATH = path.join(ROOT_DIR, "bridge", "output", "result.json");

// Windows + Linux compatible binary
const SCHEDULER_PATH = path.join(
  ROOT_DIR,
  process.platform === "win32" ? "scheduler.exe" : "scheduler"
);

app.post("/schedule", (req, res) => {
  try {
    // 1️⃣ Write input JSON
    fs.writeFileSync(INPUT_PATH, JSON.stringify(req.body, null, 2));

    // 2️⃣ Execute C++ binary directory
    execFile(
      SCHEDULER_PATH,
      { cwd: ROOT_DIR },  
      (error, stdout, stderr) => {

        if (error) {
          console.error("C++ execution error:", error);
          console.error("STDERR:", stderr);
          return res.status(500).json({
            error: "C++ backend execution failed"
          });
        }

        try {
          // 3️⃣ Read output JSON safely
          const result = JSON.parse(
            fs.readFileSync(OUTPUT_PATH, "utf-8")
          );

          res.json(result);

        } catch (readError) {
          console.error("Output read error:", readError);
          return res.status(500).json({
            error: "Failed to read scheduler output"
          });
        }
      }
    );

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server crashed" });
  }
});

// Render auto assigns PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Bridge running on port ${PORT}`);
});
