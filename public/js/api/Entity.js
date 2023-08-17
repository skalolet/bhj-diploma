class Entity {
  static URL = "";

  static createRequestAndCallback(method, data, callback) {
    createRequest({
      method,
      data,
      url: this.URL,
      callback,
    });
  }

  static list(data, callback) {
    this.createRequestAndCallback("GET", data, callback);
  }

  static patch(data, callback) {
    this.createRequestAndCallback("PATCH", data, callback);
  }

  static create(data, callback) {
    this.createRequestAndCallback("PUT", data, callback);
  }

  static remove(data, callback) {
    this.createRequestAndCallback("DELETE", data, callback);
  }
}
