// При фокусе на поле номера телефона проставляет +7 и устанавливает курсор в конец поля формы
const setPhoneFieldFocus = (phoneInput) => {
  if (document.activeElement === phoneInput && !phoneInput.value.length) {
    phoneInput.value = '+7';
  }

  if (phoneInput.value === '+7') {
    phoneInput.setSelectionRange(2, 2);
  }
  phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
};

const setPhoneFieldEventListeners = (phoneInput) => {
  phoneInput.addEventListener('focus', () => setPhoneFieldFocus(phoneInput));
  phoneInput.addEventListener('click', () => setPhoneFieldFocus(phoneInput));
};

export {setPhoneFieldFocus, setPhoneFieldEventListeners};
