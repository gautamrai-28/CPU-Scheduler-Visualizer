#include "../include/SJF.h"
#include <climits>
#include <algorithm>

using namespace std;

void SJF::schedule() {

    int n = processes.size();
    int completed = 0;
    int currentTime = 0;

    vector<bool> done(n, false);

    while (completed < n) {

        int idx = -1;
        int minBurst = INT_MAX;

        for (int i = 0; i < n; i++) {
            if (!done[i] &&
                processes[i].arrivalTime <= currentTime &&
                processes[i].burstTime < minBurst) {

                minBurst = processes[i].burstTime;
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
