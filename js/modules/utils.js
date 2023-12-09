import { ALERT_SHOW_TIME } from './const.js';

const showAlert = (message) => {
  const alertContainer = document.createElement('p');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '1000px';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '40px 20px';
  alertContainer.style.fontSize = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.verticalAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.border = '2px black solid';
  alertContainer.style.boxShadow = '2px 3px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const cityDataAdapter = (oneCity) => {
  const {
    id,
    city,
    'city-id': cityId,
    'delivery-points': deliveryPoints,
  } = oneCity;

  return {
    id,
    city,
    cityId,
    deliveryPoints,
  };
};

const adoptCitiesData = (cities) => cities.slice().map((city) => cityDataAdapter(city));

const setActiveTab = (evt, tabs) => {
  tabs.forEach((tab) => {
    if (tab.checked === true) {
      tab.checked = false;
    }
  });
  evt.target.checked = true;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getCityCoordinates = (tab) => tab.dataset.coordinates.split(',');

export {
  showAlert,
  cityDataAdapter,
  setActiveTab,
  adoptCitiesData,
  debounce,
  getCityCoordinates,
};
