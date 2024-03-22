const deliveryForm = document.querySelector('.tabs-block__item-delivery');
const pickUpForm = document.querySelector('.tabs-block__pick-up');
const deliveryTabs = document.querySelectorAll('.tab');

deliveryForm.classList.add('hidden');

const formDisabler = (tabData) => {
  switch (tabData) {
    case 'pick-up':
      deliveryForm.classList.add('hidden');
      pickUpForm.classList.remove('hidden');
      break;
    case 'delivery':
      pickUpForm.classList.add('hidden');
      deliveryForm.classList.remove('hidden');
      break;
  }
};

const tabsSwitch = (evt) => {
  evt.preventDefault();
  const targetTab = evt.target.closest('.tab');
  deliveryTabs.forEach((tab) => {
    if (!targetTab.classList.contains('active')) {
      targetTab.classList.add('active');
      if (tab.classList.contains('active')) {
        tab.classList.remove('active');
      }
      formDisabler(targetTab.dataset.tab);
    }
  });
};

deliveryTabs.forEach((tab) => {
  tab.addEventListener('click', tabsSwitch);
});
