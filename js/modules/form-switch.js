const deliveryForm = document.querySelector('.tabs-block__item-delivery');
const pickUpFrom = document.querySelector('.tabs-block__pick-up');
const deliveryTabs = document.querySelectorAll('.tab');

deliveryForm.style.display = 'none';

const formDisabler = (tabData) => {
  switch (tabData) {
    case 'pickup':
      deliveryForm.style.display = 'none';
      pickUpFrom.style.display = 'block';
      break;
    case 'delivery':
      pickUpFrom.style.display = 'none';
      deliveryForm.style.display = 'block';
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
