import { showAlert, cityDataAdapter } from './utils.js';

const GET_URL = 'https://mock.pages.academy/delivery/db';

const SEND_URL = 'https://mock.pages.academy/delivery/requests';

const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`
      ${response.status}
      ${response.statusText}
      `);
    })
    .then((data) => {
      const { cities } = data;
      const adoptedCities = [...cities].map((city) => cityDataAdapter(city));

      onSuccess(adoptedCities);
    })
    .catch((err) => {
      showAlert(`Ошибка! ${err.message}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
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
