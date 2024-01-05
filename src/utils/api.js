import authToken from "./storage";

const BASE_URL = "https://hey.mahdisharifi.dev/api";

const API = {
    auth: {
        register: `${BASE_URL}/auth/register`,
        login: `${BASE_URL}/auth/login`,
        me: `${BASE_URL}/auth/me`,
    },
    tweet: {
        list: `${BASE_URL}/tweets`,
        popular: `${BASE_URL}/tweets/popular`,
        create: `${BASE_URL}/tweets`,
        single: (id) => `${BASE_URL}/tweets/${id}`,
        delete: (id) => `${BASE_URL}/tweets/${id}`,
        update: (id) => `${BASE_URL}/tweets/${id}`,
        categories: `${BASE_URL}/tweets/categories`,
        like: (id) => `${BASE_URL}/tweets/like/${id}`,
        dislike: (id) => `${BASE_URL}/tweets/dislike/${id}`,
    },
};

function responseValidator(status) {
    return status >= 200 && status <= 299;
}

function get(url, callback) {
    let status;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken.get()}`,
        },
    })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((data) => {
            callback(data, status);
        });
}

function post(url, body, callback) {
    let status;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken.get()}`,
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((data) => {
            callback(data, status);
        })
        .catch((errors) => {
            callback(errors, status);
        });
}

function patch(url, body, callback) {
    let status;
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken.get()}`,
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((data) => {
            callback(data, status);
        })
        .catch((errors) => {
            callback(errors, status);
        });
}

function del(url, callback) {
    let status;
    fetch(url, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken.get()}`,
        },
    })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((data) => {
            callback(data, status);
        });
}

export { get, post, del, patch, responseValidator };
export default API;
