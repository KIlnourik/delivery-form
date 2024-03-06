import { CARD_INPUT_MAXLENGTH } from '../const.js';
import { getFullCardNumber, setErrorClassToContainer } from '../utils.js';

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

const validateCardNumber = (cardInputs, cardInputsContainer) => {
  const full = getFullCardNumber(cardInputs);
  const isValidCardNumber = validateCardNumberMoonAlgorithm(full);
  setErrorClassToContainer(cardInputsContainer, isValidCardNumber);
  if (!isValidCardNumber) {
    return false;
  }
  return true;
};

export { switchFocus, switchFocusByKeyBackpace, validateCardNumber };
