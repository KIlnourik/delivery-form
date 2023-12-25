import { ALERT_SHOW_TIME, CARD_NUMBER_LENGTH, CARD_INPUT_MAXLENGTH, INPUT_ERR0R_CLASS } from './const.js';

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
  alertContainer.style.backgroundColor = 'tomato';
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

const getFullCardNumber = (cardInputs) => {
  const fullCardNumber = [];
  for (let i = 0; i <= cardInputs.length - 1; i++) {
    if (cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
      fullCardNumber.push(cardInputs[i].value);
    }
  }
  const completeCardNumber = fullCardNumber.join('');
  if (completeCardNumber.length === CARD_NUMBER_LENGTH) {
    return completeCardNumber;
  } else {
    return null;
  }
};

const setErrorClassToContainer = (contaier, validationResult) =>
  (!validationResult) ? contaier.classList.add(INPUT_ERR0R_CLASS) : contaier.classList.remove(INPUT_ERR0R_CLASS);

const getEqualInObj = (value, obj) => {
  for (const i in obj) {
    if (i === value) {
      return obj[i];
    }
  }
};

const getAddressFromMap = (coordinates) => {
  const {lat, lng} = coordinates;
  return `${lat.toFixed(6)},${lng.toFixed(6)}`;
};

const cardFieldDisable = (value, cardFieldWrapper) => {
  switch (value) {
    case 'cash':
      cardFieldWrapper.querySelectorAll('input').forEach((input) => input.setAttribute('disabled', 'disabled'));
      cardFieldWrapper.classList.add('input-wrapper--hidden');
      break;
    case 'card':
      cardFieldWrapper.querySelectorAll('input').forEach((input) => input.removeAttribute('disabled', 'disabled'));
      cardFieldWrapper.classList.remove('input-wrapper--hidden');
      break;
  }
};

const payTabOnclickChange = (evt, cardFieldWrapper, payTabs) => {
  setActiveTab(evt, payTabs);
  cardFieldDisable(evt.target.value, cardFieldWrapper);
};

export {
  showAlert,
  cityDataAdapter,
  setActiveTab,
  adoptCitiesData,
  debounce,
  getCityCoordinates,
  getFullCardNumber,
  setErrorClassToContainer,
  getEqualInObj,
  getAddressFromMap,
  payTabOnclickChange
};
