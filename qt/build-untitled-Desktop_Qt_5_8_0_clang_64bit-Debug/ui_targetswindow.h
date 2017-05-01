/********************************************************************************
** Form generated from reading UI file 'targetswindow.ui'
**
** Created by: Qt User Interface Compiler version 5.8.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_TARGETSWINDOW_H
#define UI_TARGETSWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPlainTextEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_TargetsWindow
{
public:
    QWidget *centralWidget;
    QPushButton *pushButton;
    QPushButton *pushButton_2;
    QLabel *label;
    QLabel *label_2;
    QLineEdit *lineEdit;
    QLineEdit *lineEdit_2;
    QLineEdit *lineEdit_3;
    QLabel *label_3;
    QLabel *label_4;
    QLineEdit *lineEdit_5;
    QLabel *label_7;
    QLabel *label_8;
    QLabel *label_9;
    QLabel *label_10;
    QLabel *label_11;
    QCheckBox *checkBox;
    QCheckBox *checkBox_2;
    QCheckBox *checkBox_3;
    QSpinBox *spinBox;
    QPlainTextEdit *plainTextEdit;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *TargetsWindow)
    {
        if (TargetsWindow->objectName().isEmpty())
            TargetsWindow->setObjectName(QStringLiteral("TargetsWindow"));
        TargetsWindow->resize(493, 453);
        centralWidget = new QWidget(TargetsWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        pushButton = new QPushButton(centralWidget);
        pushButton->setObjectName(QStringLiteral("pushButton"));
        pushButton->setGeometry(QRect(370, 360, 115, 32));
        pushButton_2 = new QPushButton(centralWidget);
        pushButton_2->setObjectName(QStringLiteral("pushButton_2"));
        pushButton_2->setGeometry(QRect(250, 360, 115, 32));
        label = new QLabel(centralWidget);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(40, 20, 59, 16));
        label_2 = new QLabel(centralWidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(40, 50, 59, 16));
        lineEdit = new QLineEdit(centralWidget);
        lineEdit->setObjectName(QStringLiteral("lineEdit"));
        lineEdit->setGeometry(QRect(130, 20, 113, 21));
        lineEdit_2 = new QLineEdit(centralWidget);
        lineEdit_2->setObjectName(QStringLiteral("lineEdit_2"));
        lineEdit_2->setGeometry(QRect(130, 50, 113, 21));
        lineEdit_3 = new QLineEdit(centralWidget);
        lineEdit_3->setObjectName(QStringLiteral("lineEdit_3"));
        lineEdit_3->setGeometry(QRect(130, 80, 113, 21));
        label_3 = new QLabel(centralWidget);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setGeometry(QRect(40, 80, 59, 16));
        label_4 = new QLabel(centralWidget);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setGeometry(QRect(40, 110, 59, 16));
        lineEdit_5 = new QLineEdit(centralWidget);
        lineEdit_5->setObjectName(QStringLiteral("lineEdit_5"));
        lineEdit_5->setGeometry(QRect(130, 240, 113, 21));
        label_7 = new QLabel(centralWidget);
        label_7->setObjectName(QStringLiteral("label_7"));
        label_7->setGeometry(QRect(40, 240, 59, 16));
        label_8 = new QLabel(centralWidget);
        label_8->setObjectName(QStringLiteral("label_8"));
        label_8->setGeometry(QRect(40, 270, 59, 16));
        label_9 = new QLabel(centralWidget);
        label_9->setObjectName(QStringLiteral("label_9"));
        label_9->setGeometry(QRect(40, 140, 59, 16));
        label_10 = new QLabel(centralWidget);
        label_10->setObjectName(QStringLiteral("label_10"));
        label_10->setGeometry(QRect(40, 170, 59, 16));
        label_11 = new QLabel(centralWidget);
        label_11->setObjectName(QStringLiteral("label_11"));
        label_11->setGeometry(QRect(40, 200, 59, 16));
        checkBox = new QCheckBox(centralWidget);
        checkBox->setObjectName(QStringLiteral("checkBox"));
        checkBox->setGeometry(QRect(130, 140, 89, 20));
        checkBox_2 = new QCheckBox(centralWidget);
        checkBox_2->setObjectName(QStringLiteral("checkBox_2"));
        checkBox_2->setGeometry(QRect(130, 170, 89, 20));
        checkBox_3 = new QCheckBox(centralWidget);
        checkBox_3->setObjectName(QStringLiteral("checkBox_3"));
        checkBox_3->setGeometry(QRect(130, 200, 89, 20));
        spinBox = new QSpinBox(centralWidget);
        spinBox->setObjectName(QStringLiteral("spinBox"));
        spinBox->setGeometry(QRect(130, 110, 47, 24));
        plainTextEdit = new QPlainTextEdit(centralWidget);
        plainTextEdit->setObjectName(QStringLiteral("plainTextEdit"));
        plainTextEdit->setGeometry(QRect(130, 270, 104, 79));
        TargetsWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(TargetsWindow);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 493, 22));
        TargetsWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(TargetsWindow);
        mainToolBar->setObjectName(QStringLiteral("mainToolBar"));
        TargetsWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(TargetsWindow);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        TargetsWindow->setStatusBar(statusBar);

        retranslateUi(TargetsWindow);

        QMetaObject::connectSlotsByName(TargetsWindow);
    } // setupUi

    void retranslateUi(QMainWindow *TargetsWindow)
    {
        TargetsWindow->setWindowTitle(QApplication::translate("TargetsWindow", "TargetsWindow", Q_NULLPTR));
        pushButton->setText(QApplication::translate("TargetsWindow", "Save", Q_NULLPTR));
        pushButton_2->setText(QApplication::translate("TargetsWindow", "Discard", Q_NULLPTR));
        label->setText(QApplication::translate("TargetsWindow", "Position", Q_NULLPTR));
        label_2->setText(QApplication::translate("TargetsWindow", "Company", Q_NULLPTR));
        label_3->setText(QApplication::translate("TargetsWindow", "Portal", Q_NULLPTR));
        label_4->setText(QApplication::translate("TargetsWindow", "Salary", Q_NULLPTR));
        label_7->setText(QApplication::translate("TargetsWindow", "Address", Q_NULLPTR));
        label_8->setText(QApplication::translate("TargetsWindow", "Notes", Q_NULLPTR));
        label_9->setText(QApplication::translate("TargetsWindow", "Called", Q_NULLPTR));
        label_10->setText(QApplication::translate("TargetsWindow", "Written", Q_NULLPTR));
        label_11->setText(QApplication::translate("TargetsWindow", "Ongoing", Q_NULLPTR));
        checkBox->setText(QApplication::translate("TargetsWindow", "CheckBox", Q_NULLPTR));
        checkBox_2->setText(QApplication::translate("TargetsWindow", "CheckBox", Q_NULLPTR));
        checkBox_3->setText(QApplication::translate("TargetsWindow", "CheckBox", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class TargetsWindow: public Ui_TargetsWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_TARGETSWINDOW_H
