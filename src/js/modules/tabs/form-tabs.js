import { validateForm } from '../form-validation.js';
import { DeliveryType } from '../const.js';

const deliveryForm = document.querySelector('.tabs-block__delivery');
const pickUpForm = document.querySelector('.tabs-block__pick-up');
const deliveryTabs = document.querySelectorAll('.tab');

deliveryForm.classList.add('hidden');

const formDisabler = (tabData) => {
  switch (tabData) {
    case DeliveryType.pickUp:
      deliveryForm.classList.add('hidden');
      pickUpForm.classList.remove('hidden');
      break;
    case DeliveryType.delivery:
      pickUpForm.classList.add('hidden');
      deliveryForm.classList.remove('hidden');
      break;
  }
};

const cardInputsValue = (tabData) => {
  const pickUpCardInputs = pickUpForm.querySelector('.card').querySelectorAll('input');
  const deliveryCardInputs = deliveryForm.querySelector('.card').querySelectorAll('input');
  switch (tabData) {
    case DeliveryType.pickUp:
      for (let i = 0; i < pickUpCardInputs.length; i++) {
        pickUpCardInputs[i].value = deliveryCardInputs[i].value;
      }
      break;
    case DeliveryType.delivery:
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
    case DeliveryType.pickUp:
      pickUpPhoneInput.value = deliveryPhoneInput.value;
      break;
    case DeliveryType.delivery:
      deliveryPhoneInput.value = pickUpPhoneInput.value;
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
