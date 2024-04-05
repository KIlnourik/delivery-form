import {
  ALERT_SHOW_TIME,
  INPUT_ERR0R_CLASS,
  INPUT_SUCCESS_CLASS,
  SUBMIT_HELPER_TIPS,
  DIV_HTML_TAG
} from '../const.js';

const createAlertBlock = (message, backgroundColor = 'tomato') => {
  const alertOverlay = document.createElement(DIV_HTML_TAG);
  alertOverlay.classList.add('popup__overlay');

  const alertWrapper = document.createElement(DIV_HTML_TAG);
  alertWrapper.classList.add('popup__wrapper');

  const alertContainer = document.createElement('p');
  alertContainer.classList.add('popup__text-block');
  alertContainer.style.backgroundColor = backgroundColor;
  alertContainer.textContent = message;

  alertOverlay.append(alertWrapper);
  alertWrapper.append(alertContainer);
  document.body.append(alertOverlay);
};

const onEscKeydown = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    document.querySelector('.popup__overlay').remove();
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEscKeydown);
  }
};

// Функция, показывающая попап, с переданным сообщением
const showAlert = (message, backgroundColor = 'tomato') => {

  createAlertBlock(message, backgroundColor);
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscKeydown);

  setTimeout(() => {
    document.querySelector('.popup__overlay').remove();
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEscKeydown);
  }, ALERT_SHOW_TIME);
};

const setActiveTab = (evt, tabs) => {
  tabs.forEach((tab) => {
    if (tab.checked === true) {
      tab.checked = false;
    }
    tab.checked = true;
  });
  evt.target.checked = true;
};

// Функция дебаунс
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функиця получающая координаты ПВЗ
const getCityCoordinates = (tab) => tab.dataset.coordinates.split(',');

// Функция, устанавливающая определенный статус для блока контейнера
const setContainerStatusClass = (container, validationResult) => {
  if (!validationResult) {
    container.classList.add(INPUT_ERR0R_CLASS);
  } else {
    container.classList.remove(INPUT_ERR0R_CLASS);
    container.classList.add(INPUT_SUCCESS_CLASS);
  }
};

// Функция, возвращающая значение из объекта, соответствующее переданному значению
const getEqualInObj = (value, obj) => {
  if (Object.hasOwn(obj, value)) {
    return obj[value];
  }
  return null;
};

// Функция, формирующая сообщение о незаполненных полях формы
const getEmptyFormMessage = (helper, ...emptyForms) => {
  if (helper.textContent !== '' && helper.hasChildNodes()) {
    helper.querySelectorAll('span').forEach((item) => item.remove());
    helper.textContent = '';
  }
  const emptyFormsFragment = document.createDocumentFragment();
  for (let i = 0; i < emptyForms.length; i++) {
    const emptyFormElementSpan = document.createElement('span');
    emptyFormElementSpan.textContent = getEqualInObj(emptyForms[i], SUBMIT_HELPER_TIPS);
    if (i > 0) {
      if (i !== emptyForms.length - 1) {
        emptyFormsFragment.append(', ', emptyFormElementSpan);
      } else {
        emptyFormsFragment.append(' и ', emptyFormElementSpan);
      }
    }
    emptyFormsFragment.append(emptyFormElementSpan);
  }
  helper.appendChild(emptyFormsFragment);
};

// Функция, проводящая валидацию по переданному регулярному выражению
const validateByRegExp = (regexp, value, wrapper) => {
  if (!value.length) {
    wrapper.classList.remove(INPUT_ERR0R_CLASS);
    wrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  setContainerStatusClass(wrapper, regexp.test(value));
  return regexp.test(value);
};

export {
  showAlert,
  setActiveTab,
  debounce,
  getCityCoordinates,
  setContainerStatusClass,
  getEqualInObj,
  getEmptyFormMessage,
  validateByRegExp,
};
