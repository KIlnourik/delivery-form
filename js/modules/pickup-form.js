import { payTabOnclickChange } from './utils.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const payTabsWrapper = pickUpBlock.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');
const submitBtn = pickUpBlock.querySelector('form__submit-btn');
const submitHelper = pickUpBlock.querySelector('form__submit-help');
const cardInputField = pickUpBlock.querySelector('.card');

document.querySelector('#payment-card').checked = true;
payTabs.forEach((tab) => tab.addEventListener('click', (evt) => payTabOnclickChange(evt, cardInputField, payTabs)));


