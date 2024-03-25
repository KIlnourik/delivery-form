// При фокусе на поле номера телефона проставляет +7 и устанавливает курсор в конец поля формы
const onPhoneInputSetFocus = (phoneInput) => {
  if (document.activeElement === phoneInput && !phoneInput.value.length) {
    phoneInput.value = '+7';
  }

  if (phoneInput.value === '+7') {
    phoneInput.setSelectionRange(2, 2);
  }
  phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
};



const setEventListenersToPhoneField = (phoneInput) => {
  phoneInput.addEventListener('focus', () => onPhoneInputSetFocus(phoneInput));
  phoneInput.addEventListener('click', () => onPhoneInputSetFocus(phoneInput));
};

export {onPhoneInputSetFocus, setEventListenersToPhoneField};
