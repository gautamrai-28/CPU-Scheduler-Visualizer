#include "../include/LRTF.h"
#include <climits>

using namespace std;

void LRTF::schedule() {

    int n = processes.size();
    int completed = 0;
    int currentTime = 0;
    int prev = -1;

    while (completed < n) {

        int idx = -1;
        int maxRemaining = INT_MIN;

        for (int i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime &&
                processes[i].remainingTime > 0 &&
                processes[i].remainingTime > maxRemaining) {

                maxRemaining = processes[i].remainingTime;
                idx = i;
            }
        }

        if (idx == -1) {
            currentTime++;
            continue;
        }

        if (processes[idx].startTime == -1)
            processes[idx].startTime = currentTime;

        // Gantt chart handling
        if (prev != idx)
            ganttChart.push_back({ processes[idx].pid, 1 });
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
