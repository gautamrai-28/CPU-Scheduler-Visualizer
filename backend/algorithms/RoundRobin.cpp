#include "../include/RoundRobin.h"
#include <queue>
#include <algorithm>

using namespace std;

void RoundRobin::schedule() {

    queue<int> q;
    int currentTime = 0;
    int completed = 0;
    int n = processes.size();

    vector<bool> visited(n, false);

    q.push(0);
    visited[0] = true;

    while (completed < n) {

        if (q.empty()) {
            currentTime++;
            for (int i = 0; i < n; i++) {
                if (!visited[i] &&
                    processes[i].arrivalTime <= currentTime) {
                    q.push(i);
                    visited[i] = true;
                }
            }
            continue;
        }

        int idx = q.front();
        q.pop();

        int exec = min(timeQuantum, processes[idx].remainingTime);

        ganttChart.push_back({processes[idx].pid, exec});

        processes[idx].remainingTime -= exec;
        currentTime += exec;

        for (int i = 0; i < n; i++) {
            if (!visited[i] &&
                processes[i].arrivalTime <= currentTime) {
                q.push(i);
                visited[i] = true;
            }
        }

        if (processes[idx].remainingTime > 0) {
            q.push(idx);
        } else {
            processes[idx].completionTime = currentTime;
            completed++;
        }
    }

    calculateMetrics();
}
