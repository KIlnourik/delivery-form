import { CARD_INPUT_MAXLENGTH, CARD_NUMBER_LENGTH, INPUT_ERR0R_CLASS } from '../const.js';

const cardInputsContainer = document.querySelector('.card');
const cardInputs = cardInputsContainer.querySelectorAll('input');

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));

const switchFocus = () => {
  for (let i = 0; i < cardInputs.length - 1; i++) {
    if (document.activeElement === cardInputs[i] &&
      cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
      cardInputs[i].blur();
      cardInputs[i + 1].focus();
    }
  }
};

const validateCardNumberMoonAlgorithm = (cardNumberValue) => {
  if (cardNumberValue !== null) {
    let checksum = 0;
    const cardnumbers = cardNumberValue.split('').map(Number);
    for (const [index, num] of cardnumbers.entries()) {
      if (index % 2 === 0) {
        const buffer = num * 2;
        // eslint-disable-next-line no-unused-expressions
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
  } else {
    return false;
  }
};

const getFullCardNumber = () => {
  const fullCardNumber = [];
  for (let i = 0; i <= cardInputs.length - 1; i++) {
    if (cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
      fullCardNumber.push(cardInputs[i].value);
    }
  }
  const completeCardNumber = fullCardNumber.join('');
  if (completeCardNumber.length === CARD_NUMBER_LENGTH) {
    return completeCardNumber;
  } else {
    return null;
  }
};

const validateCardNumber = () => {
  const full = getFullCardNumber();
  const isValidCardNumber = validateCardNumberMoonAlgorithm(full);
  if (!isValidCardNumber) {
    cardInputsContainer.classList.add(INPUT_ERR0R_CLASS);
    return null;
  }
  cardInputsContainer.classList.remove(INPUT_ERR0R_CLASS);
  return full;
};

cardInputs.forEach((input) => input.addEventListener('input', () => {
  switchFocus();
  validateCardNumber();
}));
