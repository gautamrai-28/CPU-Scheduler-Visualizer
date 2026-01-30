#include "../include/FCFS.h"
#include <algorithm>

using namespace std;

void FCFS::schedule() {

    sort(processes.begin(), processes.end(),
         [](Process &a, Process &b) {
             return a.arrivalTime < b.arrivalTime;
         });

    int currentTime = 0;

    for (auto &p : processes) {

        if (currentTime < p.arrivalTime)
            currentTime = p.arrivalTime;

        p.startTime = currentTime;
        currentTime += p.burstTime;
        p.completionTime = currentTime;

        ganttChart.push_back({p.pid, p.burstTime});
    }

    calculateMetrics();
}
