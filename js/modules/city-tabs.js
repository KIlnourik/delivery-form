import { setActiveTab } from './utils.js';
import { renderDeliveryPoints } from './pick-up-form/address-tabs.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const cityPickUpTabs = pickUpForm.querySelectorAll('input[name="city"]');

const deliveryBlock = document.querySelector('.tabs-block__item-delivery');
const deliveryForm = deliveryBlock.querySelector('form');
const cityDeliveryTabs = deliveryForm.querySelectorAll('input[name="city"]');

let activeTab = 'led';
pickUpForm.querySelector(`#pick-up-${activeTab}`).checked = true;
deliveryForm.querySelector(`#delivery-${activeTab}`).checked = true;

const onCityPickUpTabClick = (evt) => {
  setActiveTab(evt, cityPickUpTabs);
  // setActiveTab(evt, cityDeliveryTabs);
  activeTab = evt.target.value.toLowerCase();
  renderDeliveryPoints(activeTab);
};

renderDeliveryPoints(activeTab);

cityPickUpTabs.forEach((tab) => tab.addEventListener('click', onCityPickUpTabClick));

const onCityDeliveryTabClick = (evt) => {
  setActiveTab(evt, cityDeliveryTabs);
  activeTab = evt.target.value.toLowerCase();
};

cityDeliveryTabs.forEach((tab) => tab.addEventListener('click', onCityDeliveryTabClick));
