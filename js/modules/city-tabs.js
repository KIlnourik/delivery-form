import { getData } from './api.js';
import { setActiveTab } from './utils.js';

const cityTabs = document.querySelectorAll('input[name="city"]');

const getPickUpPoints = (evt, cities) => {

};


const getActiveCityTab = (evt) => {
  setActiveTab(evt, cityTabs);
  return evt.target.value;
};

cityTabs.forEach((tab) => tab.addEventListener('click', getActiveCityTab));
