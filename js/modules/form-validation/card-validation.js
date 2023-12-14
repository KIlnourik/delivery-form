import { CARD_INPUT_MAXLENGTH, INPUT_ERR0R_CLASS } from '../const.js';
import { getFullCardNumber, setErrorClassToContainer } from '../utils.js';

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

const validateCardNumber = () => {
  const full = getFullCardNumber(cardInputs);
  const isValidCardNumber = validateCardNumberMoonAlgorithm(full);
  setErrorClassToContainer(cardInputsContainer, isValidCardNumber);
  if (!isValidCardNumber) {
    // cardInputsContainer.classList.add(INPUT_ERR0R_CLASS);
    return null;
  }
  // cardInputsContainer.classList.remove(INPUT_ERR0R_CLASS);
  return full;
};

cardInputs.forEach((input) => input.addEventListener('input', () => {
  switchFocus();
  validateCardNumber();
}));
