const payTabs = document.querySelectorAll('.tabs-block__pick-up > .input-wrapper--payment-method > input');
const cardInputField = document.querySelector('.card');

document.querySelector('#payment-card').checked = true;

const cardFieldDisable = (value) => {
  switch (value) {
    case 'cash':
      cardInputField.style.display = 'none';
      break;
    case 'card':
      cardInputField.style.display = 'flex';
  }
};

const payTabOnclickChange = (evt) => {
  evt.preventDefault();
  const targetInput = evt.target.closest('input');
  targetInput.checked = true;
  console.log(targetInput);
  console.log(targetInput.checked);
  console.log(targetInput.value);
  cardFieldDisable(targetInput.value);
  payTabs.forEach((payTab) => {
    if (payTab.checked === true) {
      payTab.checked = false;
    }
  });
};

payTabs.forEach((tab) => tab.addEventListener('click', payTabOnclickChange));
