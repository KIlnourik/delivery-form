import { ALERT_SHOW_TIME, CARD_NUMBER_LENGTH, CARD_INPUT_MAXLENGTH, INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS, SUBMIT_HELPER_TIPS, SUCCESS_UPLOAD_COLOR, SUCCESS_UPLOAD_MESSAGE, FAIL_UPLOAD_MESSAGE } from './const.js';
import { sendData } from './api.js';
import { resetSlider } from './delivery-form/time-slider.js';
import { resetCity } from './city-tabs.js';

// Функция, показывающая попап, с переданным сообщением
const showAlert = (message, backgroundColor = 'tomato') => {
  const alertContainer = document.createElement('p');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50vh';
  alertContainer.style.width = '60vw';
  alertContainer.style.transform = 'translate(-50%, 0)';
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

// Функция-адаптер для информации с сервера
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

// Функция применяющая адаптер для каждого из городов
const adoptCitiesData = (cities) => cities.slice().map((city) => cityDataAdapter(city));

const setActiveTab = (evt, tabs) => {
  tabs.forEach((tab) => {
    if (tab.checked === true) {
      tab.checked = false;
    }
  });
  evt.target.checked = true;
};

// Функция дебаунс
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функиця получающая координаты ПВЗ
const getCityCoordinates = (tab) => tab.dataset.coordinates.split(',');

// Функция, формирующая полный номер карты
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

// Функция, устанавливающая определенный статус для блока контейнера
const setStatusClassToContainer = (container, validationResult) => {
  if (!validationResult) {
    container.classList.add(INPUT_ERR0R_CLASS);
  } else {
    container.classList.remove(INPUT_ERR0R_CLASS);
    container.classList.add(INPUT_SUCCESS_CLASS);
  }
};

// Функция, возвращающая значение из объекта, соответствующее переданному значению
const getEqualInObj = (value, obj) => {
  for (const i in obj) {
    if (i === value) {
      return obj[i];
    }
  }
};

// Функция, получающая адрес с карты
const getAddressFromMap = (coordinates) => {
  const { lat, lng } = coordinates;
  return `${lat.toFixed(6)},${lng.toFixed(6)}`;
};

// Функция, отключающая инпуты
const cardFieldDisable = (value, cardInputWrapper) => {
  switch (value) {
    case 'cash':
      cardInputWrapper.querySelectorAll('input').forEach((input) => {
        input.value = '';
        input.disabled = true;
      });
      break;
    case 'card':
      cardInputWrapper.querySelectorAll('input').forEach((input) => { input.disabled = false; });
      break;
  }
};

// Функция, которая переключает способ оплаты
const payTabOnclickChange = (evt) => {
  const deliveryTypeTabs = document.querySelectorAll('.tab');
  const activeTab = evt.target.value;

  deliveryTypeTabs.forEach((tab) => {
    const payTabs = document.querySelector(`.tabs-block__${tab.dataset.tab}`)
      .querySelector('.input-wrapper--payment-method').querySelectorAll('input');
    setActiveTab(evt, payTabs);
    document.querySelector(`#${tab.dataset.tab}-payment-${activeTab}`).checked = true;
    cardFieldDisable(activeTab, document.querySelector(`.tabs-block__${tab.dataset.tab}`)
      .querySelector('.card'));
  });
};

// Функция, вещающая слушателей событий на табы способов оплаты
const setEventListenerOnPayTabs = (payTabs) => payTabs.forEach((tab) =>
  tab.addEventListener('click', payTabOnclickChange));

// Функция, формирующая сообщение о незаполненных полях формы
const getEmptyFormMessage = (helper, ...emptyForms) => {
  if (helper.textContent !== '' && helper.hasChildNodes()) {
    helper.querySelectorAll('span').forEach((item) => item.remove());
    helper.textContent = '';
  }
  const emptyFormsFragment = document.createDocumentFragment();

  for (let i = 0; i < emptyForms.length; i++) {
    const emptyFormElementSpan = document.createElement('span');
    emptyFormElementSpan.textContent = getEqualInObj(emptyForms[i], SUBMIT_HELPER_TIPS);
    if (i > 0 && i !== emptyForms.length - 1) {
      emptyFormsFragment.append(', ', emptyFormElementSpan);
    } else if (i > 0 && i === emptyForms.length - 1) {
      emptyFormsFragment.append(' и ', emptyFormElementSpan);
    }
    emptyFormsFragment.append(emptyFormElementSpan);
  }
  helper.appendChild(emptyFormsFragment);
};

// Функция, проводящая валидацию по переданному регулярному выражению
const validateByRegExp = (regexp, value, wrapper) => {
  if (!value.length) {
    wrapper.classList.remove(INPUT_ERR0R_CLASS);
    wrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  setStatusClassToContainer(wrapper, regexp.test(value));
  return regexp.test(value);
};

// Функция, возращающая массив из имен незаполненных полей формы
const getInvalidInputs = (formFieldsValidateFunction) => {
  const invalidInputs = [];
  for (const [key, value] of formFieldsValidateFunction) {
    if (!value) { invalidInputs.push(key); }
  }
  return invalidInputs;
};

// Функция, валидирующая форму в момент заполнения ее полей
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

// Функция, очищающая поля номера карты
const resetCardInput = (cardInputs) => cardInputs.forEach((input) => {
  input.value = '';
  input.closest('div').classList.remove(INPUT_SUCCESS_CLASS);
});

// Функция, очищающая поля формы
const formReset = (cardInputs, formInputs) => {
  for (const input of formInputs) {
    if (input.name === 'time-interval') { input.value = '10:00-12:00'; }
    input.value = '';
    input.closest('div').classList.remove(INPUT_SUCCESS_CLASS);
  }
  resetCardInput(cardInputs);
};

// Функция, отправки формы
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
      resetCity();
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
  validateByRegExp,
  getInvalidInputs,
  onInputFormValidate,
  onFormSubmit,
  setEventListenerOnPayTabs
};
