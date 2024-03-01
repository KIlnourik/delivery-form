import { payTabOnclickChange, getFullCardNumber } from './utils.js';
import { CARD_INPUT_MAXLENGTH} from './const.js';
import { switchFocus, validateCardNumber } from './form-validation/card-validation.js';

const pickUpBlock = document.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const payTabsWrapper = pickUpBlock.querySelector('.input-wrapper--payment-method');
const payTabs = payTabsWrapper.querySelectorAll('input');
const cardInputField = pickUpBlock.querySelector('.card');
const cardInputs = cardInputField.querySelectorAll('input');
const submitBtn = pickUpBlock.querySelector('.form__submit-btn');
const submitHelper = pickUpBlock.querySelector('.form__submit-help');

document.querySelector('#payment-card').checked = true;
payTabs.forEach((tab) => tab.addEventListener('click', (evt) => payTabOnclickChange(evt, cardInputField, payTabs)));

cardInputs.forEach((input) => input.setAttribute('maxLength', CARD_INPUT_MAXLENGTH.toString()));
cardInputs.forEach((input) => input.addEventListener('input', () => {
  switchFocus(cardInputs);
  validateCardNumber(cardInputs, cardInputField);
}));



// const data = {
//   city:
//   address:
//   payment-method:
//   card-number?:
//   phone:
// };

submitBtn.disabled = false;

pickUpForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (data.get('payment-method') === 'card') {
    const fullCardNumber = getFullCardNumber(cardInputs);
    data.append('card', fullCardNumber);
  }
  for (const keyValue of data.entries()) {
    console.log(`${keyValue[0]}, ${keyValue[1]}`);
  }
});
