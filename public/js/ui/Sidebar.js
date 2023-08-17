class Sidebar {
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    static initToggleButton() {
        const sidebarMini = document.querySelector('.sidebar-mini');
        document.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
            e.preventDefault();
            sidebarMini.classList.toggle('sidebar-open');
            sidebarMini.classList.toggle('sidebar-collapse');
        });
    }

    static initAuthLinks() {
        document.querySelector('.menu-item_register a').addEventListener('click', () => {
            App.getModal('register').open();
        });

        document.querySelector('.menu-item_login a').addEventListener('click', () => {
            App.getModal('login').open();
        });

        document.querySelector('.menu-item_logout a').addEventListener('click', () => {
            User.logout((err, response) => {
                if (response && response.success) {
                    App.setState('init');
                }
            });
        });
    }
}