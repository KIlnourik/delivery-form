import { ALERT_SHOW_TIME, CARD_NUMBER_LENGTH, CARD_INPUT_MAXLENGTH, INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS, SUBMIT_HELPER_TIPS, SUCCESS_UPLOAD_COLOR, SUCCESS_UPLOAD_MESSAGE, FAIL_UPLOAD_MESSAGE } from './const.js';
import { sendData } from './api.js';
import { resetSlider } from './delivery-form/time-slider.js';

const showAlert = (message, backgroundColor = 'tomato') => {
  const alertContainer = document.createElement('p');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '60vw';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '40px 20px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.lineHeight = '1.2';
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

const setStatusClassToContainer = (container, validationResult) => {
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

const onSuccess = () => {

};

const onFail = () => {

};

const validateByRegExp = (regexp, value, wrapper) => {
  if (!value.length) {
    wrapper.classList.remove(INPUT_ERR0R_CLASS);
    wrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  setStatusClassToContainer(wrapper, regexp.test(value));
  return regexp.test(value);
};

const getInvalidInputs = (formFieldsValidateFunction) => {
  const invalidInputs = [];
  for (const [key, value] of formFieldsValidateFunction) {
    if (!value) { invalidInputs.push(key); }
  }
  return invalidInputs;
};

const onInputFormValidate = (submitBtn, submitHelper, formStateBlock, formFieldsValidateFunction) => {
  const invalidInputs = getInvalidInputs(formFieldsValidateFunction);
  if (invalidInputs.length) {
    formStateBlock.classList.remove('hidden');
    getEmptyFormMessage(submitHelper, ...invalidInputs);
    submitBtn.disabled = true;
  } else {
    formStateBlock.classList.add('hidden');
    submitBtn.disabled = false;
  }
};

const resetCardInput = (cardInputs) => cardInputs.forEach((input) => {
  input.value = '';
  input.closest('div').classList.remove(INPUT_SUCCESS_CLASS);
});

const formReset = (cardInputs, formInputs) => {
  for (const input of formInputs) {
    if (input.name === 'time-interval') { input.value = '10:00-12:00'; }
    input.value = '';
    input.closest('div').classList.remove(INPUT_SUCCESS_CLASS);
  }
  resetCardInput(cardInputs);
};

const onFormSubmit = (evt, submitBtn, cardInputs, formInputs) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (data.get('payment-method') === 'card') {
    const fullCardNumber = getFullCardNumber(cardInputs);
    data.append('card', fullCardNumber);
  }
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';
  sendData(
    () => {
      formReset(cardInputs, formInputs);
      resetSlider();
      showAlert(SUCCESS_UPLOAD_MESSAGE, SUCCESS_UPLOAD_COLOR);
      submitBtn.textContent = 'Заказать';
    },
    () => {
      showAlert(FAIL_UPLOAD_MESSAGE);
      submitBtn.textContent = 'Заказать';
      submitBtn.disabled = false;
    },
    data);
};

export {
  showAlert,
  cityDataAdapter,
  setActiveTab,
  adoptCitiesData,
  debounce,
  getCityCoordinates,
  getFullCardNumber,
  setStatusClassToContainer,
  getEqualInObj,
  getAddressFromMap,
  payTabOnclickChange,
  getEmptyFormMessage,
  onSuccess,
  onFail,
  validateByRegExp,
  getInvalidInputs,
  onInputFormValidate,
  onFormSubmit
};
