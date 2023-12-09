import { setActiveTab } from './utils.js';
import { renderDeliveryPoints } from './address-tabs.js';

const cityTabs = document.querySelectorAll('input[name="city"]');


document.querySelector('#pick-up-led').checked = true;
let activeTab = 'led';

const onCityTabClick = (evt) => {
  setActiveTab(evt, cityTabs);
  activeTab = evt.target.value.toLowerCase();
  renderDeliveryPoints(activeTab);
};

renderDeliveryPoints(activeTab);

cityTabs.forEach((tab) => tab.addEventListener('click', onCityTabClick));
