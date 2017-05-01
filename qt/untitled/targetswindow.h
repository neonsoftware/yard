#ifndef TARGETSWINDOW_H
#define TARGETSWINDOW_H

#include <QMainWindow>

namespace Ui {
class TargetsWindow;
}

class TargetsWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit TargetsWindow(QWidget *parent = 0);
    ~TargetsWindow();

private:
    Ui::TargetsWindow *ui;
};

#endif // TARGETSWINDOW_H
