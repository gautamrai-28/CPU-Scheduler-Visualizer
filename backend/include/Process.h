#ifndef PROCESS_H
#define PROCESS_H

#include <string>

using namespace std;

struct Process {
    string pid;

    int arrivalTime;
    int burstTime;
    int priority = 0;

    // REQUIRED FOR PREEMPTIVE ALGOS
    int remainingTime;

    // Timing metrics
    int startTime = -1;
    int completionTime = 0;
    int waitingTime = 0;
    int turnaroundTime = 0;
};

#endif
