import { validateByRegExp, validateForm } from './utils.js';
import { PHONE_REGEXP } from './const.js';

const deliveryForm = document.querySelector('.tabs-block__delivery');
const pickUpForm = document.querySelector('.tabs-block__pick-up');
const deliveryTabs = document.querySelectorAll('.tab');

deliveryForm.classList.add('hidden');

const formDisabler = (tabData) => {
  switch (tabData) {
    case 'pick-up':
      deliveryForm.classList.add('hidden');
      pickUpForm.classList.remove('hidden');
      break;
    case 'delivery':
      pickUpForm.classList.add('hidden');
      deliveryForm.classList.remove('hidden');
      break;
  }
};

const cardInputsValue = (tabData) => {
  const pickUpCardInputs = pickUpForm.querySelector('.card').querySelectorAll('input');
  const deliveryCardInputs = deliveryForm.querySelector('.card').querySelectorAll('input');
  switch (tabData) {
    case 'pick-up':
      for (let i = 0; i < pickUpCardInputs.length; i++) {
        pickUpCardInputs[i].value = deliveryCardInputs[i].value;
      }
      break;
    case 'delivery':
      for (let i = 0; i < pickUpCardInputs.length; i++) {
        deliveryCardInputs[i].value = pickUpCardInputs[i].value;
      }
      break;
  }
};

const phoneInputValue = (tabData) => {
  const pickUpPhoneInput = pickUpForm.querySelector('#phone');
  const deliveryPhoneInput = deliveryForm.querySelector('#phone');
  switch (tabData) {
    case 'pick-up':
      pickUpPhoneInput.value = deliveryPhoneInput.value;
      validateByRegExp(PHONE_REGEXP, pickUpPhoneInput.value, pickUpPhoneInput.closest('div'));
      break;
    case 'delivery':
      deliveryPhoneInput.value = pickUpPhoneInput.value;
      validateByRegExp(PHONE_REGEXP, deliveryPhoneInput.value, deliveryPhoneInput.closest('div'));
      break;
  }
};

const tabsSwitch = (evt) => {
  evt.preventDefault();
  const targetTab = evt.target.closest('.tab');
  deliveryTabs.forEach((tab) => {
    if (!targetTab.classList.contains('active')) {
      targetTab.classList.add('active');
      if (tab.classList.contains('active')) {
        tab.classList.remove('active');
      }
      formDisabler(targetTab.dataset.tab);
      cardInputsValue(targetTab.dataset.tab);
      phoneInputValue(targetTab.dataset.tab);
      validateForm(targetTab.dataset.tab);
    }
  });
};

deliveryTabs.forEach((tab) => {
  tab.addEventListener('click', tabsSwitch);
});
