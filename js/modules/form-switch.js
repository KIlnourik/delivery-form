const deliveryForm = document.querySelector('.tabs-block__item-delivery');
const pickUpFrom = document.querySelector('.tabs-block__pick-up');
const deliveryTabs = document.querySelectorAll('.tab');

deliveryForm.classList.add('hidden');

const formDisabler = (tabData) => {
  switch (tabData) {
    case 'pickup':
      deliveryForm.classList.add('hidden');
      pickUpFrom.classList.remove('hidden');
      break;
    case 'delivery':
      pickUpFrom.classList.add('hidden');
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
