#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>

#include "external/json.hpp"
#include "include/Process.h"
#include "include/Scheduler.h"
#include "include/LJF.h"
#include "include/SJF.h"
#include "include/SRTF.h"
#include "include/LRTF.h"
#include "include/FCFS.h"
#include "include/RoundRobin.h"
#include "include/HRRN.h"

using json = nlohmann::json;
using namespace std;

#define OUTPUT_PATH "bridge/output/result.json"

int main() {

    // ---------- READ INPUT JSON ----------
    ifstream in("bridge/input/processes.json");
    if (!in.is_open()) {
        cout << "Failed to open input JSON\n";
        return 1;
    }

    json input;
    in >> input;

    string algorithm = input["algorithm"];
    algorithm.erase(remove_if(algorithm.begin(),
                              algorithm.end(),
                              ::isspace),
                    algorithm.end());

    int timeQuantum = input.value("timeQuantum", 0);

    vector<Process> processes;

    for (auto &p : input["processes"]) {
        Process pr;
        pr.pid = p["pid"];
        pr.arrivalTime = p["arrivalTime"];
        pr.burstTime = p["burstTime"];
        pr.remainingTime = pr.burstTime;
        pr.priority = p.value("priority", 0);
        processes.push_back(pr);
    }

    Scheduler* scheduler = nullptr;

    if (algorithm == "SJF")
        scheduler = new SJF(processes);
    else if (algorithm == "SRTF")
        scheduler = new SRTF(processes);
    else if (algorithm == "RR")
        scheduler = new RoundRobin(processes, timeQuantum);
    else if (algorithm == "FCFS")
        scheduler = new FCFS(processes);
    else if (algorithm == "LJF")
        scheduler = new LJF(processes);
    else if (algorithm == "LRTF")
        scheduler = new LRTF(processes);
    else if (algorithm == "HRRN")
        scheduler = new HRRN(processes);
    else {
        cout << "Algorithm not implemented\n";
        return 1;
    }

    scheduler->schedule();

    json output;
    output["algorithm"] = algorithm;

    for (auto &g : scheduler->getGanttChart()) {
        output["ganttChart"].push_back({
            {"pid", g.first},
            {"duration", g.second}
        });
    }

    for (auto &p : scheduler->getProcesses()) {
        output["processTable"].push_back({
            {"pid", p.pid},
            {"arrivalTime", p.arrivalTime},
            {"burstTime", p.burstTime},
            {"completionTime", p.completionTime},
            {"waitingTime", p.waitingTime},
            {"turnaroundTime", p.turnaroundTime}
        });
    }

    ofstream out(OUTPUT_PATH);
    out << output.dump(4);
    out.close();

    cout << "Result written successfully\n";

    delete scheduler;
    return 0;
}
