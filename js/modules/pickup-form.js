import { payTabOnclickChange, getFullCardNumber, getEmptyFormMessage } from './utils.js';
import { CARD_INPUT_MAXLENGTH } from './const.js';
import { switchFocus, switchFocusByKeyBackpace, isValidCardNumber } from './form-validation/card-validation.js';
import { onPhoneInputSetFocus, isValidPhoneNumber } from './form-validation/phone-validation.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const payTabsWrapper = pickUpBlock.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');
const cardInputField = pickUpBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = pickUpForm.querySelector('input[type=tel]');
const formStateBlock = pickUpBlock.querySelector('.form__submit-state');
const submitHelper = formStateBlock.querySelector('.form__submit-help');
const submitBtn = pickUpBlock.querySelector('.form__submit-btn');

document.querySelector('#payment-card').checked = true;
getEmptyFormMessage(submitHelper, phoneInput.name, 'card');

payTabs.forEach((tab) => tab.addEventListener('click', (evt) => payTabOnclickChange(evt, cardInputField, payTabs)));

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));
cardInputs.forEach((input) => input.addEventListener('keydown', (evt) => switchFocusByKeyBackpace(cardInputs, evt)));
cardInputs.forEach((input) => input.addEventListener('input', () => switchFocus(cardInputs)));

phoneInput.addEventListener('focus', onPhoneInputSetFocus);
phoneInput.addEventListener('click', onPhoneInputSetFocus);

const getInvalidInputs = () => {
  const invalidInputs = [];
  if (!isValidPhoneNumber(phoneInput.value)) {invalidInputs.push(phoneInput.name);}
  if (!isValidCardNumber(cardInputs, cardInputField)) {invalidInputs.push('card');}
  return invalidInputs;
};

pickUpForm.addEventListener('change', () => {
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

pickUpForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (data.get('payment-method') === 'card') {
    const fullCardNumber = getFullCardNumber(cardInputs);
    data.append('card', fullCardNumber);
  }
});
