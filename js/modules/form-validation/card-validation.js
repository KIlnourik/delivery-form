import { CARD_INPUT_MAXLENGTH } from '../const.js';

const cardInputs = document.querySelector('.card').querySelectorAll('input');

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));

const switchFocus = () => {
  for (let i = 0; i < cardInputs.length - 1; i++) {
    if (cardInputs[i].value.length === CARD_INPUT_MAXLENGTH &&
      !isNaN(Number(cardInputs[i].value))) {
      cardInputs[i].blur();
      cardInputs[i + 1].focus();
    }
  }
};

cardInputs.forEach((input) => input.addEventListener('input', switchFocus));

