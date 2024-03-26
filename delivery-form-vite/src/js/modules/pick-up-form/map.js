import {
  CURRENT_PIN_SETTINGS,
  DEFAULT_MAP_SETTINGS,
  MAP_CURRENT_ADDRESS_SCALE,
  MAP_ADDRESS_SCALE,
  CITIES_CENTER_COORDINATES,
} from '../const.js';
import { getAddressFromMap, getEqualInObj } from '../utils.js';

const map = L.map('map')
  .setView({
    lat: DEFAULT_MAP_SETTINGS.lat,
    lng: DEFAULT_MAP_SETTINGS.lng,
  }, DEFAULT_MAP_SETTINGS.scale);

L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const simpleMarkerGroup = L.layerGroup().addTo(map);
const currentMarkerGroup = L.layerGroup().addTo(map);

const currentAddressPin = L.icon({
  iconUrl: 'img/pin-current.png',
  iconSize: CURRENT_PIN_SETTINGS.size,
  iconAnchor: CURRENT_PIN_SETTINGS.anchor,
});
const simpleAddressPin = L.icon({
  iconUrl: 'img/pin.png',
  iconSize: CURRENT_PIN_SETTINGS.size,
  iconAnchor: CURRENT_PIN_SETTINGS.anchor,
});

const removePreviousMarker = () => {
  map.setZoom(DEFAULT_MAP_SETTINGS.scale);
  map.panTo([DEFAULT_MAP_SETTINGS.lat, DEFAULT_MAP_SETTINGS.lng]);
  currentMarkerGroup.clearLayers();
};

const currentAddressMarker = L.marker(
  {},
  {
    icon: currentAddressPin,
  },
);

const createСurrentAddressMarker = (coordinates) => {
  removePreviousMarker();
  const [currentLat, currentLng] = coordinates.split(',');
  map.setZoom(MAP_CURRENT_ADDRESS_SCALE);
  map.panTo([currentLat, currentLng]);
  currentAddressMarker.setLatLng(L.latLng(currentLat, currentLng));

  currentAddressMarker.addTo(currentMarkerGroup);
};

const setActiveAddressTab = (coordinates) => {
  const addressInputs = document.querySelectorAll('input[name=address]');
  addressInputs.forEach((input) => {
    if (input.dataset.coordinates === coordinates) {
      input.checked = true;
    }
  }
  );
};

const createAddressMarkers = (city) => {
  removePreviousMarker();
  const cityCoordinates = getEqualInObj(city.cityId, CITIES_CENTER_COORDINATES);
  const [currentLat, currentLng] = cityCoordinates;

  map.setZoom(MAP_ADDRESS_SCALE);
  map.panTo([currentLat, currentLng]);

  city.deliveryPoints.forEach((point) => {
    const [lat, lng] = point.coordinates;
    const addressMarker = L.marker(
      {
        lat,
        lng
      },
      {
        icon: simpleAddressPin,
      },
    );
    addressMarker.addTo(simpleMarkerGroup);
    addressMarker.on('click', (evt) => {
      const addressCoords = getAddressFromMap(evt.target.getLatLng());
      createСurrentAddressMarker(addressCoords);
      setActiveAddressTab(addressCoords);
    });
  });
};

export { createAddressMarkers, createСurrentAddressMarker };
