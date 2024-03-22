import { getEmptyFormMessage, validateByRegExp, onInputFormValidate, onFormSubmit } from './utils.js';
import { ADDRESS_REGEXP, PHONE_REGEXP } from './const.js';
import { isDateValid } from './form-fields/date-field.js';
import { setEventListenersToCardField, isValidCardNumber } from './form-fields/card-fields.js';
import { setEventListenersToPhoneField } from './form-fields/phone-field.js';

const deliveryBlock = document.querySelector('.tabs-block__item-delivery');
const deliveryForm = deliveryBlock.querySelector('form');
const addressInput = deliveryBlock.querySelector('#delivery-address');
const addressInputWrapper = addressInput.closest('div');
const dateInput = deliveryBlock.querySelector('#delivery-user-date-delivery');
const dateInputWrapper = dateInput.closest('div');
const cardInputField = deliveryBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = deliveryBlock.querySelector('#phone');
const phoneInputWrapper = phoneInput.closest('div');
const formStateBlock = deliveryBlock.querySelector('.form__submit-state');
const submitHelper = formStateBlock.querySelector('.form__submit-help');
const submitBtn = deliveryBlock.querySelector('.form__submit-btn');
const timeIntervalInput = deliveryBlock.querySelector('#delivery-user-date-delivery');

// deliveryBlock.querySelector('#payment-card').checked = true;
submitBtn.disabled = true;
getEmptyFormMessage(submitHelper, addressInput.name, dateInput.name, phoneInput.name, 'card');

const formInputs = [addressInput, dateInput, phoneInput, timeIntervalInput];

setEventListenersToCardField(cardInputs);
setEventListenersToPhoneField(phoneInput);

deliveryForm.addEventListener('input', () => {
  const formFieldsValidateFunction = new Map([
    [addressInput.name, validateByRegExp(ADDRESS_REGEXP, addressInput.value, addressInputWrapper)],
    [dateInput.name, isDateValid(dateInput, dateInputWrapper)],
    [phoneInput.name, validateByRegExp(PHONE_REGEXP, phoneInput.value, phoneInputWrapper)]
  ]);

  if(deliveryBlock.querySelector('#payment-card').checked) {
    formFieldsValidateFunction.set('card', isValidCardNumber(cardInputs, cardInputField));
  }

  onInputFormValidate(submitBtn, submitHelper, formStateBlock, formFieldsValidateFunction);
});

deliveryForm.addEventListener('submit', (evt) => onFormSubmit(evt, submitBtn, cardInputs, formInputs));
