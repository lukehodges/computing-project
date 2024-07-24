import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QCalendarWidget, QLabel, QPushButton, QMessageBox
from PyQt5.QtCore import QDate

class DateDifferenceCalculator(QWidget):
    def __init__(self):
        super().__init__()
        
        self.initUI()
        
    def initUI(self):
        layout = QVBoxLayout()
        
        self.calendar1 = QCalendarWidget()
        self.calendar2 = QCalendarWidget()
        
        self.calendar1.setMinimumDate(QDate.currentDate())
        self.calendar2.setMinimumDate(QDate.currentDate())
        
        self.calendar1.selectionChanged.connect(self.update_calendar2_minimum_date)
        self.calendar2.selectionChanged.connect(self.update_calendar1_maximum_date)
        
        self.label = QLabel("Select two dates to calculate the number of days between them.")
        
        self.button = QPushButton("Calculate Days")
        self.button.clicked.connect(self.calculate_days)
        
        layout.addWidget(self.calendar1)
        layout.addWidget(self.calendar2)
        layout.addWidget(self.label)
        layout.addWidget(self.button)
        
        self.setLayout(layout)
        self.setWindowTitle('Date Difference Calculator')
        self.show()
        
    def update_calendar2_minimum_date(self):
        selected_date = self.calendar1.selectedDate()
        self.calendar2.setMinimumDate(selected_date)
        
    def update_calendar1_maximum_date(self):
        selected_date = self.calendar2.selectedDate()
        self.calendar1.setMaximumDate(selected_date)
        
    def calculate_days(self):
        date1 = self.calendar1.selectedDate()
        date2 = self.calendar2.selectedDate()
        
        if date1 < QDate.currentDate() or date2 < QDate.currentDate():
            QMessageBox.warning(self, "Invalid Date", "Selected dates cannot be before today's date.")
            return
        
        days_difference = abs(date1.daysTo(date2))
        
        self.label.setText(f"The number of days between the selected dates is: {days_difference} days.")
        
if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = DateDifferenceCalculator()
    sys.exit(app.exec_())
