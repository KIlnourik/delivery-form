import { CARD_INPUT_MAXLENGTH, INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS } from '../const.js';
import { getFullCardNumber, setStatusClassToContainer } from '../utils.js';

// Переключение фокуса при заполнении одной формы номера карты
const switchFocus = (cardInputs) => {
  for (let i = 0; i < cardInputs.length - 1; i++) {
    if (document.activeElement === cardInputs[i] &&
      cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
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

// Функция проверяет валидность введенного номера карты и устанавливает соответствующий стиль полю формы
const isValidCardNumber = (cardInputs, cardInputsContainer) => {
  const full = getFullCardNumber(cardInputs);
  if (full !== null) {
    const result = validateCardNumberMoonAlgorithm(full);
    setStatusClassToContainer(cardInputsContainer, result);
    return result;
  }
  cardInputsContainer.classList.remove(INPUT_ERR0R_CLASS);
  cardInputsContainer.classList.remove(INPUT_SUCCESS_CLASS);
  return false;
};

export { switchFocus, switchFocusByKeyBackpace, isValidCardNumber };
