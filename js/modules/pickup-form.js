import { setActiveTab } from './utils.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const payTabsWrapper = pickUpBlock.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');

const cardInputField = document.querySelector('.card');

document.querySelector('#payment-card').checked = true;

const cardFieldDisable = (value) => {
  switch (value) {
    case 'cash':
      cardInputField.querySelectorAll('input').forEach((input) => input.setAttribute('disabled', 'disabled'));
      break;
    case 'card':
      cardInputField.querySelectorAll('input').forEach((input) => input.removeAttribute('disabled', 'disabled'));
      break;
  }
};

const payTabOnclickChange = (evt) => {
  setActiveTab(evt, payTabs);
  cardFieldDisable(evt.target.value);
};

payTabs.forEach((tab) => tab.addEventListener('click', payTabOnclickChange));


