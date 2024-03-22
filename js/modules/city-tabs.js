import { setActiveTab } from './utils.js';
import { renderDeliveryPoints } from './pick-up-form/address-tabs.js';

const deliveryTabs = document.querySelectorAll('.tab');
const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const cityPickUpTabs = pickUpForm.querySelectorAll('input[name="city"]');

const deliveryBlock = document.querySelector('.tabs-block__item-delivery');
const deliveryForm = deliveryBlock.querySelector('form');
const cityDeliveryTabs = deliveryForm.querySelectorAll('input[name="city"]');

const DEFAULT_CITY_TAB = 'led';

let activeTab = DEFAULT_CITY_TAB;
pickUpForm.querySelector(`#pick-up-${activeTab}`).checked = true;
deliveryForm.querySelector(`#delivery-${activeTab}`).checked = true;

const onCityPickUpTabClick = (evt) => {
  setActiveTab(evt, cityPickUpTabs);
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

const resetCity = () => {
  deliveryTabs.forEach((tab) => {
    if (tab.classList.contains('active')) {
      document.querySelector(`#${tab.dataset.tab}-${DEFAULT_CITY_TAB}`).checked = true;
    }
  });
};

export { resetCity };
