
class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const accountsSelect = this.element.querySelector(".accounts-select");

    Account.list(User.current(), (err, response) => {
      accountsSelect.innerHTML = "";

      if (response && response.success) {
        response.data.forEach(({ id, name }) => {
          accountsSelect.innerHTML += `<option value="${id}">${name}</option>`;
        });
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      this.element.reset();

      if (response && response.success) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      } else {
        alert(response.error);
      }
    });
  }
}
