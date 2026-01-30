#ifndef SRTF_H
#define SRTF_H

#include <vector>
#include "Scheduler.h"

class SRTF : public Scheduler {
public:
    SRTF(std::vector<Process> p) : Scheduler(p) {}
    void schedule() override;
};

#endif
    