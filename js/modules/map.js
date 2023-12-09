import { CURRENT_PIN_SETTINGS, DEFAULT_MAP_SETTINGS, MAP_ADDRESS_SCALE } from './const.js';

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

const markerGroup = L.layerGroup().addTo(map);

const currentAddressPin = L.icon({
  iconUrl: 'img/pin-current.png',
  iconSize: CURRENT_PIN_SETTINGS.size,
  iconAnchor: CURRENT_PIN_SETTINGS.anchor,
});
const removePreviousMarker = () => {
  map.setZoom(DEFAULT_MAP_SETTINGS.scale);
  map.panTo([DEFAULT_MAP_SETTINGS.lat, DEFAULT_MAP_SETTINGS.lng]);
  markerGroup.clearLayers();
};

const addressMarker = L.marker(
  {},
  {
    icon: currentAddressPin,
  },
);

const createСurrentAddressMarker = (coordinates) => {
  removePreviousMarker();
  const [lat, lng] = coordinates.split(',');

  map.setZoom(MAP_ADDRESS_SCALE);
  map.panTo([lat, lng]);
  addressMarker.setLatLng(L.latLng(lat, lng));

  addressMarker.addTo(markerGroup);
};

export { createСurrentAddressMarker };
