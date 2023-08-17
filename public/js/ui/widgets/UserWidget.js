class UserWidget {
  constructor(element){
    if (!element) {
      throw new Error("Элемент не существует");
    }
    this.element = element;
  }
  update(){
    const currentUser = User.current();
    if (!currentUser) {
      return;
    }
    this.element.querySelector('.user-name').textContent = currentUser.name;
  }
}