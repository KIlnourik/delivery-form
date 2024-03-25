import { onFormSubmit, setEventListenerOnPayTabs, validateForm } from './utils.js';
import { setEventListenersToCardField } from './form-fields/card-fields.js';
import { setEventListenersToPhoneField } from './form-fields/phone-field.js';
import { DeliveryType } from './const.js';

const deliveryBlock = document.querySelector('.tabs-block__delivery');
const deliveryForm = deliveryBlock.querySelector('form');
const addressInput = deliveryBlock.querySelector('#delivery-address');
const dateInput = deliveryBlock.querySelector('#delivery-user-date-delivery');
const payTabs = deliveryForm.querySelector('.input-wrapper--payment-method').querySelectorAll('input');
const cardInputField = deliveryBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const phoneInput = deliveryBlock.querySelector('#phone');
const submitBtn = deliveryBlock.querySelector('.form__submit-btn');
const timeIntervalInput = deliveryBlock.querySelector('#delivery-user-date-delivery');

deliveryBlock.querySelector('#delivery-payment-card').checked = true;
submitBtn.disabled = true;

const formInputs = [addressInput, dateInput, phoneInput, timeIntervalInput];

setEventListenerOnPayTabs(payTabs);
setEventListenersToCardField(cardInputs);
setEventListenersToPhoneField(phoneInput);

deliveryForm.addEventListener('input', () => validateForm(DeliveryType.delivery));

deliveryForm.addEventListener('submit', (evt) => onFormSubmit(evt, submitBtn, cardInputs, formInputs));
