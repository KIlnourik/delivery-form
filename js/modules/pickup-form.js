import {  getEmptyFormMessage, validateByRegExp, onInputFormValidate, onFormSubmit, setEventListenerOnPayTabs } from './utils.js';
import { PHONE_REGEXP } from './const.js';
import { setEventListenersToPhoneField } from './form-fields/phone-field.js';
import { setEventListenersToCardField, isValidCardNumber } from './form-fields/card-fields.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const payTabsWrapper = pickUpForm.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');
const cardInputField = pickUpBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = pickUpForm.querySelector('#phone');
const phoneInputWrapper = phoneInput.closest('div');
const formStateBlock = pickUpBlock.querySelector('.form__submit-state');
const submitHelper = formStateBlock.querySelector('.form__submit-help');
const submitBtn = pickUpBlock.querySelector('.form__submit-btn');

pickUpForm.querySelector('#pick-up-payment-card').checked = true;
getEmptyFormMessage(submitHelper, phoneInput.name, 'card');

const formInputs = [phoneInput];

setEventListenerOnPayTabs(payTabs, cardInputField);
setEventListenersToCardField(cardInputs);
setEventListenersToPhoneField(phoneInput);

pickUpForm.addEventListener('input', () => {
  const formFieldsValidateFunction = new Map([
    [phoneInput.name, validateByRegExp(PHONE_REGEXP, phoneInput.value, phoneInputWrapper)],
  ]);

  if(pickUpForm.querySelector('#pick-up-payment-card').checked) {
    formFieldsValidateFunction.set('card', isValidCardNumber(cardInputs, cardInputField));
  }
  onInputFormValidate(submitBtn, submitHelper, formStateBlock, formFieldsValidateFunction);
});

pickUpForm.addEventListener('submit', (evt) => onFormSubmit(evt, submitBtn, cardInputs, formInputs));
