#include "../include/HRRN.h"
#include <climits>

using namespace std;

void HRRN::schedule() {

    int n = processes.size();
    int completed = 0;
    int currentTime = 0;

    vector<bool> done(n, false);

    while (completed < n) {

        int idx = -1;
        double maxRatio = -1.0;

        for (int i = 0; i < n; i++) {
            if (!done[i] && processes[i].arrivalTime <= currentTime) {

                int waitingTime = currentTime - processes[i].arrivalTime;
                double responseRatio =
                    (waitingTime + processes[i].burstTime) /
                    (double)processes[i].burstTime;

                if (responseRatio > maxRatio) {
                    maxRatio = responseRatio;
                    idx = i;
                }
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
