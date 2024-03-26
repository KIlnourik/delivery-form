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

const INPUT_ERR0R_CLASS = 'input-wrapper--error';
const INPUT_SUCCESS_CLASS = 'input-wrapper--success';
const CARD_INPUT_MAXLENGTH = 4;
const CARD_NUMBER_LENGTH = 16;
// eslint-disable-next-line no-useless-escape
const PHONE_REGEXP = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
const SUBMIT_HELPER_TIPS = {
  address: 'адрес',
  card: 'номер карты',
  date: 'дата доставки',
  phone: 'телефон',
  time: 'время доставки'
};

const SUCCESS_UPLOAD_MESSAGE = 'Заказ успешно оформлен';
const SUCCESS_UPLOAD_COLOR = '#99FF99	';

const FAIL_UPLOAD_MESSAGE = 'Не удалось оформить заказ. Что-то пошло не так.';
const DATE_MASK = 'DD/MM/YYYY';
const DEFAULT_CITY_TAB = 'led';
const DeliveryType = {
  pickUp: 'pick-up',
  delivery: 'delivery'
};
const SubmitButtonText = {
  load: 'Загрузка',
  send: 'Отправка...',
};
const PayType = {
  card: 'card',
  cash: 'cash',
};
const DEFAULT_TIME_INTERVAL = '10:00-12:00';
const DIV_HTML_TAG = 'div';

const INITIAL_START_MINUTE = 600;
const INITIAL_END_MINUTE = 1020;
const SLIDER_STEP = 20;
const MINUTES_PER_HOUR = 60;

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
  INPUT_SUCCESS_CLASS,
  CARD_INPUT_MAXLENGTH,
  CARD_NUMBER_LENGTH,
  PHONE_REGEXP,
  SUBMIT_HELPER_TIPS,
  SUCCESS_UPLOAD_MESSAGE,
  SUCCESS_UPLOAD_COLOR,
  FAIL_UPLOAD_MESSAGE,
  DATE_MASK,
  DEFAULT_CITY_TAB,
  DeliveryType,
  SubmitButtonText,
  PayType,
  DEFAULT_TIME_INTERVAL,
  DIV_HTML_TAG,
  INITIAL_START_MINUTE,
  INITIAL_END_MINUTE,
  SLIDER_STEP,
  MINUTES_PER_HOUR
};
