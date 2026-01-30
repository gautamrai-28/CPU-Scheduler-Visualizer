#include "../include/LJF.h"
#include <climits>

using namespace std;

void LJF::schedule() {

    int n = processes.size();
    int completed = 0;
    int currentTime = 0;

    vector<bool> done(n, false);

    while (completed < n) {

        int idx = -1;
        int maxBurst = INT_MIN;

        for (int i = 0; i < n; i++) {
            if (!done[i] &&
                processes[i].arrivalTime <= currentTime &&
                processes[i].burstTime > maxBurst) {

                maxBurst = processes[i].burstTime;
                idx = i;
            }
        }

        if (idx == -1) {
            currentTime++;
            continue;
        }

        processes[idx].startTime = currentTime;
        currentTime += processes[idx].burstTime;
        processes[idx].completionTime = currentTime;

        ganttChart.push_back({
            processes[idx].pid,
            processes[idx].burstTime
        });

        done[idx] = true;
        completed++;
    }

    calculateMetrics();
}
