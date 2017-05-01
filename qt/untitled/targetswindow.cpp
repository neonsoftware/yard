#include "targetswindow.h"
#include "ui_targetswindow.h"

TargetsWindow::TargetsWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::TargetsWindow)
{
    ui->setupUi(this);
}

TargetsWindow::~TargetsWindow()
{
    delete ui;
}
