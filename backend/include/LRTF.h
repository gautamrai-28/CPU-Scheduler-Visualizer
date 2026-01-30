#ifndef LRTF_H
#define LRTF_H

#include "Scheduler.h"

class LRTF : public Scheduler {
public:
    LRTF(std::vector<Process> p) : Scheduler(p) {}
    void schedule() override;
};

#endif
