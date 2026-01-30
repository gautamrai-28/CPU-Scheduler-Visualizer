#ifndef SCHEDULER_H
#define SCHEDULER_H

#include <vector>
#include <string>
#include "Process.h"

using namespace std;

class Scheduler {
protected:
    vector<Process> processes;
    vector<pair<string,int>> ganttChart;

public:
    Scheduler(vector<Process> p) : processes(p) {}

    virtual void schedule() = 0;

    vector<Process> getProcesses() {
        return processes;
    }

    vector<pair<string,int>> getGanttChart() {
        return ganttChart;
    }

    void calculateMetrics() {
        for (auto &p : processes) {
            p.turnaroundTime = p.completionTime - p.arrivalTime;
            p.waitingTime = p.turnaroundTime - p.burstTime;
        }
    }

    virtual ~Scheduler() {}
};

#endif
