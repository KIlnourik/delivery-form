import { PHONE_REGEXP, INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS } from '../const.js';
import { setErrorClassToContainer } from '../utils.js';

const phoneInput = document.querySelector('#phone');
const phoneInputWrapper = document.querySelector('.phone');

// Добавляет в поле номера телефона +7
const addRussianCountryCode = () => {
  if (document.activeElement === phoneInput && phoneInput.value === '') {
    phoneInput.value = '+7';
  }
};

// При фокусе на поле номера телефона проставляет +7 и устанавливает курсор в конец поля формы
const onPhoneInputSetFocus = () => {
  addRussianCountryCode();
  if (phoneInput.value === '+7') {
    phoneInput.setSelectionRange(2, 2);
  }
  phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
};

// Проверяет валидность номера телефона и устанавливает соотвествующий стиль полю формы
const isValidPhoneNumber = (phoneInputValue) => {
  if (!phoneInputValue.length) {
    phoneInputWrapper.classList.remove(INPUT_ERR0R_CLASS);
    phoneInputWrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  setErrorClassToContainer(phoneInputWrapper, PHONE_REGEXP.test(phoneInputValue));
  return PHONE_REGEXP.test(phoneInputValue);
};

export { onPhoneInputSetFocus, isValidPhoneNumber };
