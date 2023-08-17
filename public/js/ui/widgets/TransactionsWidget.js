class TransactionsWidget {
  constructor( element ) {
    if (!element) {
      throw new Error("Элемент не существует");
    }

    this.element = element;
    this.registerEvents();
  }
  registerEvents() {
    const createIncomeBtn = this.element.querySelector('.create-income-button');
    const createExpenseBtn = this.element.querySelector('.create-expense-button');

    createIncomeBtn.addEventListener('click', () => {
      App.getModal('newIncome').open();
    });

    createExpenseBtn.addEventListener('click', () => {
      App.getModal('newExpense').open();
    });
  }

}