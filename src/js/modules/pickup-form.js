import { getEmptyFormMessage, onFormSubmit, setEventListenerOnPayTabs, validateForm } from './utils.js';
import { setEventListenersToPhoneField } from './form-fields/phone-field.js';
import { setEventListenersToCardField} from './form-fields/card-fields.js';
import { DeliveryType } from './const.js';

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
getEmptyFormMessage(submitHelper, phoneInput.name, 'card');

const formInputs = [phoneInput];

setEventListenerOnPayTabs(payTabs);
setEventListenersToCardField(cardInputs);
setEventListenersToPhoneField(phoneInput);

pickUpForm.addEventListener('input', () => validateForm(DeliveryType.pickUp));

pickUpForm.addEventListener('submit', (evt) => onFormSubmit(evt, submitBtn, cardInputs, formInputs));
