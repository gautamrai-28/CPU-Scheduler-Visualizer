#ifndef LJF_H
#define LJF_H

#include "Scheduler.h"

class LJF : public Scheduler {
public:
    LJF(std::vector<Process> p) : Scheduler(p) {}
    void schedule() override;
};

#endif
