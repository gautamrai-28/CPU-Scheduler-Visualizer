#ifndef FCFS_H
#define FCFS_H

#include "Scheduler.h"

class FCFS : public Scheduler {
public:
    FCFS(std::vector<Process> p) : Scheduler(p) {}
    void schedule() override;
};

#endif
