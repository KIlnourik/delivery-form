import { ALERT_SHOW_TIME, CARD_NUMBER_LENGTH, CARD_INPUT_MAXLENGTH, INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS, SUBMIT_HELPER_TIPS } from './const.js';

const showAlert = (message, backgroundColor = 'tomato') => {
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
  alertContainer.style.backgroundColor = backgroundColor;
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
  for (let i = 0; i < cardInputs.length; i++) {
    if (cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
      fullCardNumber.push(cardInputs[i].value);
    }
  }
  const completeCardNumber = fullCardNumber.join('');
  return (completeCardNumber.length === CARD_NUMBER_LENGTH) ? completeCardNumber : null;
};

const setErrorClassToContainer = (container, validationResult) => {
  if (!validationResult) {
    container.classList.add(INPUT_ERR0R_CLASS);
  } else {
    container.classList.remove(INPUT_ERR0R_CLASS);
    container.classList.add(INPUT_SUCCESS_CLASS);
  }
};

const getEqualInObj = (value, obj) => {
  for (const i in obj) {
    if (i === value) {
      return obj[i];
    }
  }
};

const getAddressFromMap = (coordinates) => {
  const { lat, lng } = coordinates;
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

const getEmptyFormMessage = (helper, ...emptyForms) => {
  if (helper.textContent !== '' && helper.hasChildNodes()) {
    helper.querySelectorAll('span').forEach((item) => item.remove());
    helper.textContent = '';
  }
  const emptyFormsFragment = document.createDocumentFragment();

  for (let i = 0; i < emptyForms.length; i++) {
    const emptyFormElementSpan = document.createElement('span');
    emptyFormElementSpan.textContent = getEqualInObj(emptyForms[i], SUBMIT_HELPER_TIPS);
    if (i > 0) {
      emptyFormsFragment.append(' и ', emptyFormElementSpan);
    }
    emptyFormsFragment.append(emptyFormElementSpan);
  }
  helper.appendChild(emptyFormsFragment);
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
  payTabOnclickChange,
  getEmptyFormMessage
};
