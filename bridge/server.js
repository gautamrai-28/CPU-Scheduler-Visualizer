const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const INPUT_PATH = path.join(__dirname, "input", "processes.json");
const OUTPUT_PATH = path.join(__dirname, "output", "result.json");
const EXE_PATH = path.join(__dirname, "scheduler.exe");

app.post("/schedule", (req, res) => {
    try {
        //  Write input JSON for C++ backend
        fs.writeFileSync(INPUT_PATH, JSON.stringify(req.body, null, 2));

        //  Run C++ scheduler
        exec(EXE_PATH, (error, stdout, stderr) => {
            if (error) {
                console.error("C++ Error:", stderr);
                return res.status(500).json({
                    error: "C++ backend execution failed"
                });
            }

            //  Read output JSON
            const result = JSON.parse(
                fs.readFileSync(OUTPUT_PATH, "utf-8")
            );

            //  Send result to frontend
            res.json(result);
        });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server crashed" });
    }
});

app.listen(8080, () => {
    console.log("Bridge running on port 8080");
});
