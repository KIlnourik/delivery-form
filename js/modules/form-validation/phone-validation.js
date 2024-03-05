import { PHONE_REGEXP} from '../const.js';
import { setErrorClassToContainer } from '../utils.js';

const phoneInput = document.querySelector('#phone');
const phoneInputWrapper = document.querySelector('.phone');

const addRussianCountryCode = () => {
  if (document.activeElement === phoneInput && phoneInput.value === '') {
    phoneInput.value = '+7';
  }
};

const onPhoneInputSetFocus = () => {
  addRussianCountryCode();
  if (phoneInput.value === '+7'){
    phoneInput.setSelectionRange(2, 2);
  }
  phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
};

const validatePhoneNumber = () => {
  if (!phoneInput.value.length) {
    return false;
  }
  setErrorClassToContainer(phoneInputWrapper, PHONE_REGEXP.test(phoneInput.value));
  return true;
};

export {onPhoneInputSetFocus, validatePhoneNumber};
