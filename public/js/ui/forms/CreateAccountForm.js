
class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (err, response) => {
      this.element.reset();

      if (response && response.success) {
        App.getModal('createAccount').close();
        App.update();
      } else {
        alert(response.error);
      }
    });
  }
}