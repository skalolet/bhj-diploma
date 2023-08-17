
class AsyncForm {

  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error("элемента не существует");
    }
  }

  registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {

    const formData = new FormData(this.element);
    const formDataConversion = {};

    for (const element of formData.entries()) {
      formDataConversion[element[0]] = element[1];
    }

    return formDataConversion;
  }

  onSubmit(options) {}

  submit() {
    this.onSubmit(this.getData());
  }
}