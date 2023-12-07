import { getData } from './api.js';
import { setActiveTab, adoptCitiesData } from './utils.js';

const cityTabs = document.querySelectorAll('input[name="city"]');
const addressTemplate = document.querySelector('#address-template');
const addressTabs = document.querySelector('#address-tabs');
let activeTab = 'led';

getData(console.log);

const showPickUpAddress = (city) => {
  const {deliveryPoints} = city;
  const deliveryPointsFragment = document.createDocumentFragment();

  deliveryPoints.forEach(({address}, index) => {
    const addressElement = addressTemplate.cloneNode(true);
    addressElement.querySelector('input[name="address"]').value = address;
    addressElement.querySelector('input[name="address"]').setAttribute('id', `pick-up-address-${index + 1}`);
    addressElement.querySelector('address-label').textContent = address;
    addressElement.querySelector('address-label').setAttribute('for', `pick-up-address-${index + 1}`);
    deliveryPointsFragment.appendChild(addressElement);
  });
  addressTabs.appendChild(deliveryPointsFragment);
};

const getDeliveryPoints = () => getData((cities) => {
  cities.slice();
  const adaptedCities = adoptCitiesData(cities).filter((city) => city.cityId === activeTab);
  adaptedCities.forEach((city) => showPickUpAddress(city));
});

cityTabs.forEach((tab) => tab.addEventListener('click', (evt) => {
  setActiveTab(evt, cityTabs);
  activeTab = evt.target.value.toLowerCase();
  getDeliveryPoints();
}));
