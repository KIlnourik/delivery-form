import { payTabOnclickChange } from './utils.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpPayTabs = pickUpBlock.querySelectorAll('input[name="payment-method"]');
const pickCardInputField = pickUpBlock.querySelector('.card');
const deliveryBlock = document.querySelector('.tabs-block__item-delivery');
const deliveryPayTabs = deliveryBlock.querySelectorAll('input[name="payment-method"]');
const deliveryCardInputField = deliveryBlock.querySelector('.card');

pickUpPayTabs.forEach((tab) => tab.addEventListener('click', (evt) => payTabOnclickChange(evt, pickCardInputField, pickUpPayTabs)));


deliveryPayTabs.forEach((tab) => tab.addEventListener('click', () => console.log(tab)));

// deliveryPayTabs.forEach((tab) => tab.addEventListener('click', (evt) => {
//   console.log(evt.target);
//   console.log(tab);
//   payTabOnclickChange(evt, deliveryCardInputField, deliveryPayTabs);
// }));
