import { showAlert } from './utils.js';

const GET_URL = 'https://mock.htmlacademy.pro/delivery/db';

const SEND_URL = 'https://mock.htmlacademy.pro/delivery/requests';

const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return (response.json());
      }
      throw new Error(`
      ${response.status}
      ${response.statusText}
      `);
    })
    .then((data) => {
      onSuccess(data.cities);
    })
    .catch((err) => {
      showAlert(`Ошибка! ${err.message}`);
    });
};

const sendData = (onSuccess, onFail, data) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
