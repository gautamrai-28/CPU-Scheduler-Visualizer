#ifndef ROUNDROBIN_H
#define ROUNDROBIN_H

#include <vector>
#include "Scheduler.h"

class RoundRobin : public Scheduler {
private:
    int timeQuantum;

public:
    RoundRobin(std::vector<Process> p, int tq)
        : Scheduler(p), timeQuantum(tq) {}

    void schedule() override;
};

#endif
