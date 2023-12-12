import { CARD_INPUT_MAXLENGTH, CARD_NUMBER_LENGTH, INPUT_ERR0R_CLASS } from '../const.js';
import { getFullCardNumber } from '../utils.js';

const cardInputsContainer = document.querySelector('.card');
const cardInputs = cardInputsContainer.querySelectorAll('input');
let fullCardNumber = [];

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));

const switchFocus = () => {
  for (let i = 0; i < cardInputs.length - 1; i++) {
    if (document.activeElement === cardInputs[i] && cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
      cardInputs[i].blur();
      cardInputs[i + 1].focus();
    }
  }
};

const validateCardNumberMoonAlgorithm = (cardNumberValue) => {
  const arr = [];

  for (let i = 0; i < cardNumberValue.length; i++) {
    if (i % 2 === 0) {
      const m = parseInt(cardNumberValue[i], 10) * 2;
      if (m > 9) {
        arr.push(m - 9);
      } else {
        arr.push(m);
      }
    } else {
      const n = parseInt(cardNumberValue[i], 10);
      arr.push(n);
    }
  }
  const summ = arr.reduce((a, b) => a + b);
  return Boolean(!(summ % 10));
};

const validateCardNumber = () => {
  const full = getFullCardNumber(cardInputs, cardInputsContainer);
  validateCardNumberMoonAlgorithm(full);
};

cardInputs.forEach((input) => input.addEventListener('input', switchFocus));
// cardInputs.forEach((input) => input.addEventListener('change', validateCardNumber));

cardInputs.forEach((input) => console.log(input.value));

console.log(fullCardNumber);

// cardInputsContainer.classList.remove(INPUT_ERR0R_CLASS);
