import {
  CARD_INPUT_MAXLENGTH,
  INPUT_ERR0R_CLASS,
  INPUT_SUCCESS_CLASS,
  CARD_NUMBER_LENGTH,
  DIV_HTML_TAG,
  PayType,
} from '../const.js';
import { setContainerStatusClass } from '../utils/utils.js';

// Функция, отключающая инпуты
const cardFieldDisable = (value, cardInputWrapper) => {
  if (value === PayType.card) {
    return cardInputWrapper.querySelectorAll('input').forEach((input) => { input.disabled = false; });
  }
  cardInputWrapper.classList.remove(INPUT_ERR0R_CLASS);
  cardInputWrapper.classList.remove(INPUT_SUCCESS_CLASS);
  return cardInputWrapper.querySelectorAll('input').forEach((input) => {
    input.value = '';
    input.disabled = true;
  });
};

// Переключение фокуса при заполнении одной формы номера карты
const switchFocus = (cardInputs) => {
  for (let i = 0; i < cardInputs.length - 1; i++) {
    if (document.activeElement === cardInputs[i] &&
      cardInputs[i].value.length === CARD_INPUT_MAXLENGTH) {
      cardInputs[i].blur();
      cardInputs[i + 1].focus();
    }
  }
};

// Функция реализующая переключение фокуса и удаление последней цифры предыдущего окна формы
// при нажатии клавиши Backspace
const switchFocusByKeyBackpace = (cardInputs, evt) => {
  for (let i = 0; i < cardInputs.length; i++) {
    if (document.activeElement === cardInputs[i] &&
      i !== 0 &&
      evt.key === 'Backspace' &&
      !cardInputs[i].value.length) {
      cardInputs[i].blur();
      cardInputs[i - 1].focus();
      cardInputs[i - 1].value.slice(-1);
    }
  }
};

// Функция валидации номера карты по алгоритму Муна
const validateCardNumberMoonAlgorithm = (cardNumberValue) => {
  let checksum = 0;
  const cardnumbers = cardNumberValue.split('').map(Number);
  for (const [index, num] of cardnumbers.entries()) {
    if (index % 2 === 0) {
      const buffer = num * 2;
      if (buffer > 9) {
        checksum += buffer - 9;
      } else {
        (checksum += buffer);
      }
    }
    else {
      checksum += num;
    }
  }
  return checksum % 10 === 0;
};

// Функция, формирующая полный номер карты
const getFullCardNumber = (cardInputs) => {
  const fullCardNumber = [];
  for (let i = 0; i < cardInputs.length; i++) {
    if (cardInputs[i].value.length === CARD_INPUT_MAXLENGTH) {
      fullCardNumber.push(cardInputs[i].value);
    }
  }
  const completeCardNumber = fullCardNumber.join('');
  return (completeCardNumber.length === CARD_NUMBER_LENGTH) ? completeCardNumber : null;
};

// Функция проверяет валидность введенного номера карты и устанавливает соответствующий стиль полю формы
const isValidCardNumber = (cardInputs, cardInputsContainer) => {
  const full = getFullCardNumber(cardInputs);
  if (full !== null) {
    const result = validateCardNumberMoonAlgorithm(full);
    setContainerStatusClass(cardInputsContainer, result);
    return result;
  }
  cardInputsContainer.classList.remove(INPUT_ERR0R_CLASS);
  cardInputsContainer.classList.remove(INPUT_SUCCESS_CLASS);
  return false;
};

const setCardFieldEventListeners = (cardInputs) => {
  cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));
  cardInputs.forEach((input) => input.addEventListener('keydown', (evt) => switchFocusByKeyBackpace(cardInputs, evt)));
  cardInputs.forEach((input) => input.addEventListener('input', () => switchFocus(cardInputs)));
};

// Функция, очищающая поля номера карты
const resetCardInput = (cardInputs) => cardInputs.forEach((input) => {
  input.value = '';
  input.closest(DIV_HTML_TAG).classList.remove(INPUT_SUCCESS_CLASS);
});

export {
  setCardFieldEventListeners,
  getFullCardNumber,
  isValidCardNumber,
  resetCardInput,
  cardFieldDisable
};
