import { getEmptyFormMessage } from './utils.js';

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

const makeEmptyFormMessage = (tabData) => {
  switch (tabData) {
    case 'pick-up':
      if (pickUpForm.querySelector('#pick-up-payment-card').checked) {
        return getEmptyFormMessage(
          pickUpForm.querySelector('.form__submit-help'),
          pickUpForm.querySelector('#phone').name,
          'card'
        );
      }
      return getEmptyFormMessage(
        pickUpForm.querySelector('.form__submit-help'),
        pickUpForm.querySelector('#phone').name
      );
    case 'delivery':
      if (deliveryForm.querySelector('#delivery-payment-card').checked) {
        return getEmptyFormMessage(
          deliveryForm.querySelector('.form__submit-help'),
          deliveryForm.querySelector('#delivery-address').name,
          deliveryForm.querySelector('#delivery-user-date-delivery').name,
          deliveryForm.querySelector('#phone').name,
          'card'
        );
      }
      return getEmptyFormMessage(
        deliveryForm.querySelector('.form__submit-help'),
        deliveryForm.querySelector('#delivery-address').name,
        deliveryForm.querySelector('#delivery-user-date-delivery').name,
        deliveryForm.querySelector('#phone').name,
      );
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
      makeEmptyFormMessage(targetTab.dataset.tab);
    }
  });
};

deliveryTabs.forEach((tab) => {
  tab.addEventListener('click', tabsSwitch);
});
