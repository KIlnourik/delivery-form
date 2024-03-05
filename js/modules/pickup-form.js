import { payTabOnclickChange, getFullCardNumber } from './utils.js';
import { CARD_INPUT_MAXLENGTH, SUBMIT_HELPER_TIPS, PICK_UP_FORM_DATA } from './const.js';
import { switchFocus, switchFocusByKeyBackpace, validateCardNumber } from './form-validation/card-validation.js';
import { onPhoneInputSetFocus, validatePhoneNumber } from './form-validation/phone-validation.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const payTabsWrapper = pickUpBlock.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');
const cardInputField = pickUpBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = pickUpForm.querySelector('input[type=tel]');
const submitBtn = pickUpBlock.querySelector('.form__submit-btn');
const submitHelper = pickUpBlock.querySelector('.form__submit-help');

document.querySelector('#payment-card').checked = true;
payTabs.forEach((tab) => tab.addEventListener('click', (evt) => payTabOnclickChange(evt, cardInputField, payTabs)));

const emptyFormTabs = [];

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));
cardInputs.forEach((input) => input.addEventListener('keydown', (evt) => switchFocusByKeyBackpace(cardInputs, evt)));
cardInputs.forEach((input) => input.addEventListener('input', (evt) => {
  switchFocus(cardInputs, evt);
  validateCardNumber(cardInputs, cardInputField);
}));

phoneInput.addEventListener('focus', onPhoneInputSetFocus);
phoneInput.addEventListener('click', onPhoneInputSetFocus);
phoneInput.addEventListener('change', validatePhoneNumber);

const getEmptyFormMessage = (emptyForms) => {
  const emptyFormsFragment = document.createDocumentFragment();
  emptyForms.forEach((form) => {
    const emptyFormElement = document.createElement('span');
    emptyFormElement.textContent = form;
    emptyFormsFragment.appendChild(emptyFormElement);
  });
  submitHelper.appendChild(emptyFormsFragment);
};

if (validateCardNumber(cardInputs, cardInputField) && validatePhoneNumber()) {
  submitBtn.disabled = false;
}


pickUpForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (data.get('payment-method') === 'card') {
    const fullCardNumber = getFullCardNumber(cardInputs);
    data.append('card', fullCardNumber);
  }

  console.log(onFormSubmit(data));
});
