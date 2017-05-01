#ifndef YARD_H
#define YARD_H

#define WL 20

void writeTarget(target_t *t);

int readTargets(target_t *buf, size_t buf_len);

typedef struct {
    char position   [WL];
    char company    [WL];
    char portal     [WL];
    unsigned int written;
    unsigned int called;
    unsigned int interviewed;
    unsigned int next;
} target_t;

#endif // YARD_H
