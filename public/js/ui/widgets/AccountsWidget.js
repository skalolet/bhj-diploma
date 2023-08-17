class AccountsWidget {
    constructor(element) {
        if (!element) {
            throw new Error("Элемент не существует");
        }

        this.element = element;
        this.registerEvents();
        this.update();
    }

    registerEvents() {
        this.element.addEventListener("click", (e) => {
            e.preventDefault();

            const createAccountBtn = e.target.closest(".create-account");
            const accountBtn = e.target.closest(".account");

            if (createAccountBtn) {
                return App.getModal("createAccount").open();
            }

            if (accountBtn) {
                this.onSelectAccount(accountBtn);
            }
        });
    }

    update() {
        const currentUser = User.current();
        if (!currentUser) {
            return;
        }

        Account.list(currentUser, (err, response) => {
            if (response && response.success) {
                this.clear();
                this.renderItem(response.data);
            }
        });
    }

    clear() {
        const accounts = this.element.querySelectorAll(".account");

        for (const element of accounts) {
            element.remove();
        }
    }

    onSelectAccount(element) {
        const accounts = this.element.querySelectorAll(".active");

        for (const element of accounts) {
            element.classList.remove("active");
        }

        element.classList.add("active");
        App.showPage("transactions", {account_id: element.dataset.id});
    }

    getAccountHTML(item) {
        return `<li class="account" data-id="${item.id}">
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum} ₽</span>
              </a>
            </li>`;
    }

    renderItem(data) {
        data.forEach((item) => {
            this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(item));
        });
    }
}