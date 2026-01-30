#include "../include/SRTF.h"
#include <climits>

using namespace std;

void SRTF::schedule() {

    int n = processes.size();
    int completed = 0;
    int currentTime = 0;
    int prev = -1;

    while (completed < n) {

        int idx = -1;
        int minRemaining = INT_MAX;

        for (int i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime &&
                processes[i].remainingTime > 0 &&
                processes[i].remainingTime < minRemaining) {

                minRemaining = processes[i].remainingTime;
                idx = i;
            }
        }

        if (idx == -1) {
            currentTime++;
            continue;
        }

        if (processes[idx].startTime == -1)
            processes[idx].startTime = currentTime;

        if (prev != idx)
            ganttChart.push_back({processes[idx].pid, 1});
        else
            ganttChart.back().second++;

        processes[idx].remainingTime--;
        currentTime++;
        prev = idx;

        if (processes[idx].remainingTime == 0) {
            processes[idx].completionTime = currentTime;
            completed++;
        }
    }

    calculateMetrics();
}
