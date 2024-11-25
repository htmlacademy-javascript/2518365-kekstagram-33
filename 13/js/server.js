const Urls = {
  GET: 'https://32.javascript.htmlacademy.pro/kekstagram/data/',
  POST: 'https://32.javascript.htmlacademy.pro/kekstagram/',
};

const sendRequest = (onSuccess, onFail, method, body) => {
  fetch(
    Urls[method],
    {
      method,
      body,
    }
  )
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

const getData = (onSuccess, onFail, method = 'GET') => sendRequest(onSuccess, onFail, method);

const sendData = (onSuccess, onFail, method, body) => sendRequest(onSuccess, onFail, method, body);

export { getData, sendData };
