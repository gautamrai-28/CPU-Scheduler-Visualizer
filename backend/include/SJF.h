#ifndef SJF_H
#define SJF_H

#include <vector>
#include "Scheduler.h"

class SJF : public Scheduler {
public:
    SJF(std::vector<Process> p) : Scheduler(p) {}
    void schedule() override;
};

#endif
