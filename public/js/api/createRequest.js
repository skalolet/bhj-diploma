const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    const { url, data, method, callback } = options;

    const formData = new FormData();

    if (method === "GET") {
        const params = new URLSearchParams(data);
        const queryString = params.toString();
        const fullUrl = `${url}?${queryString}`;
        xhr.open(method, fullUrl);
    } else {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                formData.append(key, data[key]);
            }
        }
        xhr.open(method, url);
    }

    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            callback(xhr.response.error, xhr.response);
        }
    });

    xhr.addEventListener("error", (error) => {
        callback(error);
    });

    xhr.send(formData);
};
