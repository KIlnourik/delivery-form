import {CURRENT_PIN_SETTINGS, SIMPLE_PIN_SETTINGS, DEFAULT_MAP_SETTINGS, RERENDER_DELAY} from './const.js';

const map = L.map('map')
  .setView({
    lat: DEFAULT_MAP_SETTINGS.lat,
    lng: DEFAULT_MAP_SETTINGS.lng,
  }, DEFAULT_MAP_SETTINGS.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// const mainPin = L.icon({
//   iconUrl: 'img/pin-current.png',
//   iconSize: MAIN_PIN_SETTINGS.size,
//   iconAnchor: MAIN_PIN_SETTINGS.anchor,
// });

// const simplePin = L.icon({
//   iconUrl: 'img/pin.svg',
//   iconSize: SIMPLE_PIN_SETTINGS.size,
//   iconAnchor: SIMPLE_PIN_SETTINGS.anchor,
// });

// const mainPinMarker = L.marker(
//   {
//     lat: DEFAULT_MAP_SETTINGS.lat,
//     lng: DEFAULT_MAP_SETTINGS.lng,
//   },
//   {
//     draggable: true,
//     icon: mainPin,
//   }
// );
// const createMainPin = () => {
//   mainPinMarker.addTo(map);
//   mainPinMarker.on('moveend', (evt) => {
//     address.value = getAddressFromMap(evt.target.getLatLng());
//   });
// };
// const resetMainPin = () => {
//   const defaultLatLng = L.latLng(DEFAULT_MAP_SETTINGS.lat, DEFAULT_MAP_SETTINGS.lng);
//   mainPinMarker.setLatLng(defaultLatLng);
//   address.value = getAddressFromMap(DEFAULT_MAP_SETTINGS);
// };
