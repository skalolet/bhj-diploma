class TransactionsPage {
    constructor(element) {
        if (!element) {
            throw new Error("Элемент не существует");
        }

        this.element = element;
        this.registerEvents();
    }

    update() {
        this.render(this.lastOptions);
    }

    registerEvents() {
        this.element.addEventListener("click", (e) => {
            e.preventDefault();

            const removeAccountBtn = e.target.closest(".remove-account");
            const transactionRemoveBtn = e.target.closest(".transaction__remove");

            if (removeAccountBtn) {
                return this.removeAccount();
            }

            if (transactionRemoveBtn) {
                this.removeTransaction(transactionRemoveBtn.dataset.id);
            }
        });
    }

    removeAccount() {
        if (!this.lastOptions) {
            return;
        }

        const id = this.lastOptions.account_id;

        if (confirm("Вы действительно хотите удалить счёт?")) {
            Account.remove({id}, (err, response) => {
                if (response && response.success) {
                    App.updateWidgets();
                    App.updateForms();
                }
            });

            this.clear();
        }
    }

    removeTransaction(id) {
        if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
            Transaction.remove({id}, (err, response) => {
                if (response && response.success) {
                    App.update();
                }
            });
        }
    }

    render(options) {
        if (!options) {
            return;
        }

        this.lastOptions = options;

        Account.get(options.account_id, (err, response) => {
            if (response && response.success) {
                this.renderTitle(response.data.name);
            }
        });

        Transaction.list(options, (err, response) => {
            if (response && response.success) {
                this.renderTransactions(response.data);
            }
        });
    }

    clear() {
        this.renderTransactions([]);
        this.renderTitle("Название счёта");
        this.lastOptions = undefined;
    }

    renderTitle(name) {
        this.element.querySelector(".content-title").textContent = name;
    }

    formatDate(date) {
        let currentDate = new Date(date);

        const day = currentDate.toLocaleString("ru", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const time = currentDate.toLocaleString("ru", {
            hour: "numeric",
            minute: "numeric",
        });

        return `${day} в ${time}`;
    }

    getTransactionHTML(item) {
        return `<div class="transaction transaction_${item.type} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                  <h4 class="transaction__title">${item.name}</h4>
                  <div class="transaction__date">${this.formatDate(
            item.created_at
        )}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                  ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                <button class="btn btn-danger transaction__remove" data-id="${
            item.id
        }">
                  <i class="fa fa-trash"></i>  
                </button>
              </div>
            </div>`;
    }

    renderTransactions(data) {
        const content = this.element.querySelector(".content");
        content.innerHTML = "";

        data.forEach((item) => {
            content.innerHTML += this.getTransactionHTML(item);
        });
    }
}