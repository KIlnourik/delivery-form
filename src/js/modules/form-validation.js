import {
  INPUT_SUCCESS_CLASS,
  DEFAULT_TIME_INTERVAL,
  DIV_HTML_TAG,
  SUCCESS_UPLOAD_COLOR,
  SUCCESS_UPLOAD_MESSAGE,
  FAIL_UPLOAD_MESSAGE,
  PHONE_REGEXP,
  PayType,
  DeliveryType,
  SubmitButtonText,
} from './const.js';
import { resetCardInput, getFullCardNumber, isValidCardNumber } from './form-fields/card-fields';
import { getEmptyFormMessage, validateByRegExp, showAlert, } from './utils/utils.js';
import { resetPayTab } from './tabs/pay-tabs.js';
import { sendData } from './utils/api.js';
import { resetCity } from './tabs/city-tabs.js';
import { resetSlider } from './utils/time-slider.js';
import { isDateValid } from './form-fields/date-field.js';

const isEmptyFormField = (input, wrapper) => {
  if (!input.value.length) {
    wrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  wrapper.classList.add(INPUT_SUCCESS_CLASS);
  return true;
};

// Функция, возращающая массив из имен незаполненных полей формы
const getInvalidInputs = (formFieldsValidateFunction) => {
  const invalidInputs = [];
  for (const [key, value] of formFieldsValidateFunction) {
    if (!value) { invalidInputs.push(key); }
  }
  return invalidInputs;
};

// Функция, очищающая поля формы
const formReset = (cardInputs, formInputs) => {
  for (const input of formInputs) {
    if (input.name === 'time-interval') { input.value = DEFAULT_TIME_INTERVAL; }
    input.value = '';
    input.closest(DIV_HTML_TAG).classList.remove(INPUT_SUCCESS_CLASS);
  }
  resetCardInput(cardInputs);
};

// Функция, валидирующая форму в момент заполнения ее полей
const unlockSubmitBtn = (submitBtn, submitHelper, formStateBlock, formFieldsValidateFunction) => {
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

// Функция, отправки формы
const onFormSubmit = (evt, submitBtn, cardInputs, formInputs) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (data.get('payment-method') === PayType.card) {
    const fullCardNumber = getFullCardNumber(cardInputs);
    data.append(PayType.card, fullCardNumber);
  }
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.send;
  sendData(
    () => {
      resetCity();
      formReset(cardInputs, formInputs);
      resetSlider();
      resetPayTab();
      showAlert(SUCCESS_UPLOAD_MESSAGE, SUCCESS_UPLOAD_COLOR);
      submitBtn.textContent = SubmitButtonText.load;
    },
    () => {
      showAlert(FAIL_UPLOAD_MESSAGE);
      submitBtn.textContent = SubmitButtonText.load;
      submitBtn.disabled = false;
    },
    data);
};

const setPickUpFormValidationFuncs = (block, fieldsValidateFunction) => {
  const phoneInput = block.querySelector('#phone');
  fieldsValidateFunction.set(phoneInput.name, validateByRegExp(PHONE_REGEXP, phoneInput.value, phoneInput.closest(DIV_HTML_TAG)));
};

const setDeliveryFormValidationFuncs = (block, fieldsValidateFunction) => {
  const addressInput = block.querySelector('#delivery-address');
  const dateInput = block.querySelector('#delivery-user-date-delivery');
  const phoneInput = block.querySelector('#phone');
  fieldsValidateFunction.set(addressInput.name, isEmptyFormField(addressInput, addressInput.closest(DIV_HTML_TAG)));
  fieldsValidateFunction.set(dateInput.name, isDateValid(dateInput, dateInput.closest(DIV_HTML_TAG)));
  fieldsValidateFunction.set(phoneInput.name, validateByRegExp(PHONE_REGEXP, phoneInput.value, phoneInput.closest(DIV_HTML_TAG)));
};

const validateForm = (tabData) => {
  const block = document.querySelector(`.tabs-block__${tabData}`);
  const formStateBlock = block.querySelector('.form__submit-state');
  const submitHelper = formStateBlock.querySelector('.form__submit-help');
  const submitBtn = block.querySelector('.form__submit-btn');
  const cardInputField = block.querySelector('.card');
  const cardInputs = cardInputField.querySelectorAll('input');

  const fieldsValidateFunction = new Map();

  if (tabData === DeliveryType.pickUp) {
    setPickUpFormValidationFuncs(block, fieldsValidateFunction);
  } else {
    setDeliveryFormValidationFuncs(block, fieldsValidateFunction);
  }

  if (document.querySelector(`.tabs-block__${tabData}`)
    .querySelector(`#${tabData}-payment-card`).checked) {
    fieldsValidateFunction.set(PayType.card, isValidCardNumber(cardInputs, cardInputField));
  }

  unlockSubmitBtn(submitBtn, submitHelper, formStateBlock, fieldsValidateFunction);
};

export { onFormSubmit, validateForm };
