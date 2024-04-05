import { onFormSubmit, validateForm } from './form-validation.js';
import { setCardFieldEventListeners } from './form-fields/card-fields.js';
import { setPhoneFieldEventListeners } from './form-fields/phone-field.js';
import { setPayTabsEventListener } from './tabs/pay-tabs.js';
import { getEmptyFormMessage } from './utils/utils.js';
import { DeliveryType, PayType } from './const.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const payTabs = pickUpForm.querySelector('.input-wrapper--payment-method').querySelectorAll('input');
const cardInputField = pickUpBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = pickUpForm.querySelector('#phone');
const formStateBlock = pickUpBlock.querySelector('.form__submit-state');
const submitHelper = formStateBlock.querySelector('.form__submit-help');
const submitBtn = pickUpBlock.querySelector('.form__submit-btn');

pickUpForm.querySelector('#pick-up-payment-card').checked = true;
getEmptyFormMessage(submitHelper, phoneInput.name, PayType.card);

const formInputs = [phoneInput];

setPayTabsEventListener(payTabs);
setCardFieldEventListeners(cardInputs);
setPhoneFieldEventListeners(phoneInput);

pickUpForm.addEventListener('input', () => validateForm(DeliveryType.pickUp));

pickUpForm.addEventListener('submit', (evt) => onFormSubmit(evt, submitBtn, cardInputs, formInputs));
