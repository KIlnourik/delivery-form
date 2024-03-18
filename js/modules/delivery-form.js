import { payTabOnclickChange, getFullCardNumber, getEmptyFormMessage, showSuccessPopup, showFailPopup, validateByRegExp, onPhoneInputSetFocus } from './utils.js';
import { CARD_INPUT_MAXLENGTH, ADDRESS_REGEXP, PHONE_REGEXP } from './const.js';
import { isDateValid } from './form-validation/date-validation.js';
import { switchFocus, switchFocusByKeyBackpace, isValidCardNumber } from './form-validation/card-validation.js';
import { sendData } from './api.js';

const deliveryBlock = document.querySelector('.tabs-block__item-delivery');
const deliveryForm = deliveryBlock.querySelector('form');
const addressInput = deliveryBlock.querySelector('#delivery-address');
const addressInputWrapper = addressInput.closest('div');
const dateInput = deliveryBlock.querySelector('#delivery-user-date-delivery');
const dateInputWrapper = dateInput.closest('div');
const payTabsWrapper = deliveryBlock.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');
const cardInputField = deliveryBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = deliveryBlock.querySelector('#phone');
const phoneInputWrapper = phoneInput.closest('div');
const formStateBlock = deliveryBlock.querySelector('.form__submit-state');
const submitHelper = formStateBlock.querySelector('.form__submit-help');
const submitBtn = deliveryBlock.querySelector('.form__submit-btn');

deliveryBlock.querySelector('#payment-card').checked = true;
submitBtn.disabled = true;
getEmptyFormMessage(submitHelper, addressInput.name, phoneInput.name, 'card');

const getInvalidInputs = () => {
  const invalidInputs = [];
  if (!validateByRegExp(ADDRESS_REGEXP, addressInput.value, addressInputWrapper)) { invalidInputs.push(addressInput.name); }
  if (!isDateValid(dateInput, dateInputWrapper)) { invalidInputs.push(dateInput.name); }
  if (!validateByRegExp(PHONE_REGEXP, phoneInput.value, phoneInputWrapper)) { invalidInputs.push(phoneInput.name); }
  if (!isValidCardNumber(cardInputs, cardInputField)) { invalidInputs.push('card'); }
  return invalidInputs;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (data.get('payment-method') === 'card') {
    const fullCardNumber = getFullCardNumber(cardInputs);
    data.append('card', fullCardNumber);
  }

  sendData(showSuccessPopup, showFailPopup, data);
};

payTabs.forEach((tab) => tab.addEventListener('click', (evt) => payTabOnclickChange(evt, cardInputField, payTabs)));

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));
cardInputs.forEach((input) => input.addEventListener('keydown', (evt) => switchFocusByKeyBackpace(cardInputs, evt)));
cardInputs.forEach((input) => input.addEventListener('input', () => switchFocus(cardInputs)));

phoneInput.addEventListener('focus', () => onPhoneInputSetFocus(phoneInput));
phoneInput.addEventListener('click', () => onPhoneInputSetFocus(phoneInput));

deliveryForm.addEventListener('input', () => {
  const invalidInputs = getInvalidInputs();
  if (invalidInputs.length) {
    formStateBlock.classList.remove('hidden');
    getEmptyFormMessage(submitHelper, ...invalidInputs);
    submitBtn.disabled = true;
  } else {
    formStateBlock.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

deliveryForm.addEventListener('submit', onFormSubmit);
