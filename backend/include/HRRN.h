#ifndef HRRN_H
#define HRRN_H

#include "Scheduler.h"

class HRRN : public Scheduler {
public:
    HRRN(std::vector<Process> p) : Scheduler(p) {}
    void schedule() override;
};

#endif
