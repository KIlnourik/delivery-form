const ALERT_SHOW_TIME = 3000;
const CURRENT_PIN_SETTINGS = {
  size: [28, 44],
  anchor: [14, 44]
};
const SIMPLE_PIN_SETTINGS = {
  size: [28, 44],
  anchor: [20, 40]
};
const RERENDER_DELAY = 500;
const DEFAULT_MAP_SETTINGS = {
  lat: 66.417,
  lng: 94.25,
  scale: 3
};

const CITIES_CENTER_COORDINATES = {
  led: [59.93863, 30.31413],
  mow: [55.75222, 37.61556],
  goj: [56.32867, 44.00205],
  krr: [45.04484, 38.97603]
};

const MAP_ADDRESS_SCALE = 10;
const MAP_CURRENT_ADDRESS_SCALE = 15;

const INPUT_ERROR_TEXT = {
  cardError: 'Введите верный номер карты',
  phoneError: 'Введите верный номер телефона, он должен начинаться с +7',
  addressError: 'Укажите адрес',
  dateError: 'Укажите корректную дату доставки'
};

const INPUT_ERR0R_CLASS = 'input-wrapper--error';
const CARD_INPUT_MAXLENGTH = 4;
const CARD_NUMBER_LENGTH = 16;

// eslint-disable-next-line no-invalid-regexp, no-useless-escape
const PHONE_REGEXP = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

export {
  ALERT_SHOW_TIME,
  CURRENT_PIN_SETTINGS,
  SIMPLE_PIN_SETTINGS,
  DEFAULT_MAP_SETTINGS,
  CITIES_CENTER_COORDINATES,
  MAP_ADDRESS_SCALE,
  MAP_CURRENT_ADDRESS_SCALE,
  RERENDER_DELAY,
  INPUT_ERR0R_CLASS,
  INPUT_ERROR_TEXT,
  CARD_INPUT_MAXLENGTH,
  CARD_NUMBER_LENGTH,
  PHONE_REGEXP
};
