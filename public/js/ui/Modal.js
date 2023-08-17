class Modal {
  constructor(element) {
    if (!element) {
      throw new Error("Element does not exist!");
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    for (let btn of this.element.querySelectorAll('[data-dismiss="modal"]')) {
      btn.addEventListener("click", (e) => {
        this.onClose(e);
      });
    }
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = "block";
  }

  close() {
    this.element.style.display = "none";
  }
}