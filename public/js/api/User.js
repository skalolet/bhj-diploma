class User {
  static URL = "/user";

  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  static current() {
    return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined;
  }

  static handleResponse(response, callback, successCallback) {
    if (response && response.user) {
      this.setCurrent(response.user);
      if (successCallback) {
        successCallback(response);
      }
    } else {
      this.unsetCurrent();
    }
    callback(response.err, response);
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + "/current",
      method: "GET",
      callback: (err, response) => {
        this.handleResponse(response, callback);
      },
    });
  }

  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      data,
      callback: (err, response) => {
        this.handleResponse(response, callback);
      },
    });
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + "/register",
      data,
      method: "POST",
      callback: (err, response) => {
        this.handleResponse(response, callback);
      },
    });
  }

  static logout(callback) {
    createRequest({
      url: this.URL + "/logout",
      method: "POST",
      callback: (err, response) => {
        this.handleResponse(response, callback, () => {
          if (response && response.success) {
            this.unsetCurrent();
          }
        });
      },
    });
  }
}
