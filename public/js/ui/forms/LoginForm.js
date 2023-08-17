
class LoginForm extends AsyncForm {
  onSubmit(data) {
    User.login(data, (err, response) => {
      this.element.reset();
      if (response && response.success) {
        App.setState('user-logged');
        App.getModal('login').close();
      } else {
        alert(response.error);
      }
    });
  }
}