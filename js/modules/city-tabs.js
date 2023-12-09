import { getData } from './api.js';
import { setActiveTab, adoptCitiesData, debounce } from './utils.js';
import { createСurrentAddressMarker } from './map.js';
import { RERENDER_DELAY } from './const.js';

const cityTabs = document.querySelectorAll('input[name="city"]');
const addressTemplate = document.querySelector('#address-template').content;
const addressTabs = document.querySelector('#address-tabs');

document.querySelector('#pick-up-led').checked = true;
let activeTab = 'led';

const apendNodes = (address, coordinates, index) => {
  const addressElement = addressTemplate.cloneNode(true);

  addressElement.querySelector('input[name="address"]').value = address;
  addressElement.querySelector('input[name="address"]').setAttribute('id', `pick-up-address-${index + 1}`);
  addressElement.querySelector('input[name="address"]').dataset.coordinates = coordinates;
  addressElement.querySelector('#address-label').textContent = address;
  addressElement.querySelector('#address-label').setAttribute('for', `pick-up-address-${index + 1}`);
  return addressElement;
};

const apendPointsNonExistingMsg = () => {
  const noPointsMessage = document.createElement('h4');
  noPointsMessage.textContent = 'В данном городе нет пунктов выдачи заказов';
  noPointsMessage.setAttribute('id', 'no-points-message');
  addressTabs.appendChild(noPointsMessage);
};

const removeDeliveryPoints = () => {
  addressTabs.querySelectorAll('input[name="address"]').forEach((item) => item.remove());
  addressTabs.querySelectorAll('#address-label').forEach((item) => item.remove());
};

const onAddressTabClick = (evt) => {
  const addressInputs = document.querySelectorAll('input[name=address]');
  setActiveTab(evt, addressInputs);
  const activeTabCoordinates = evt.target.dataset.coordinates;
  createСurrentAddressMarker(activeTabCoordinates);
};

const renderDeliveryPoints = (currentTab) => {
  getData((cities) => {
    const adaptedCity = adoptCitiesData(cities).find((city) => city.cityId === currentTab);
    const { deliveryPoints } = adaptedCity;

    if (!deliveryPoints) {
      apendPointsNonExistingMsg();
    }

    if (addressTabs.contains(addressTabs.querySelector('input[name="address"]'))
      && addressTabs.contains(addressTabs.querySelector('#address-label'))) {
      removeDeliveryPoints();
    }

    if (addressTabs.contains(addressTabs.querySelector('no-points-message'))) {
      addressTabs.querySelector('no-points-message').remove();
    }

    const deliveryPointsFragment = document.createDocumentFragment();

    deliveryPoints.forEach(({ address, coordinates }, index) => {
      const addressElement = apendNodes(address, coordinates, index);
      deliveryPointsFragment.appendChild(addressElement);
    });

    addressTabs.appendChild(deliveryPointsFragment);

    const renderedAddressTabs = addressTabs.querySelectorAll('input[name="address"]');
    renderedAddressTabs[0].checked = true;
    createСurrentAddressMarker(renderedAddressTabs[0].dataset.coordinates);

    renderedAddressTabs.forEach((tab) => tab.addEventListener('click', debounce(onAddressTabClick), RERENDER_DELAY));
  });
};

const onCityTabClick = (evt) => {
  setActiveTab(evt, cityTabs);
  activeTab = evt.target.value.toLowerCase();
  renderDeliveryPoints(activeTab);
};

renderDeliveryPoints(activeTab);

cityTabs.forEach((tab) => tab.addEventListener('click', onCityTabClick));
