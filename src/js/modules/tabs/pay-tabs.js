import { cardFieldDisable } from '../form-fields/card-fields.js';
import { setActiveTab } from '../utils/utils';
import { PayType } from '../const';

const tabs = document.querySelectorAll('.tab');

// Функция, которая переключает способ оплаты
const onClickPayTab = (evt) => {
  const activeTab = evt.target.value;

  tabs.forEach((tab) => {
    const payTabs = document.querySelectorAll(`.tabs-block__${tab.dataset.tab} .input-wrapper--payment-method input`);

    setActiveTab(evt, payTabs);
    document.querySelector(`#${tab.dataset.tab}-payment-${activeTab}`).checked = true;
    cardFieldDisable(activeTab, document.querySelector(`.tabs-block__${tab.dataset.tab}`)
      .querySelector('.card'));
  });
};

const resetPayTab = () => {
  document.querySelectorAll('.tab').forEach((tab) => {
    document.querySelector(`#${tab.dataset.tab}-payment-card`).checked = true;
    cardFieldDisable(PayType.card, document.querySelector(`.tabs-block__${tab.dataset.tab}`)
      .querySelector('.card'));
  });
};

// Функция, вещающая слушателей событий на табы способов оплаты
const setPayTabsEventListener = (payTabs) => payTabs.forEach((tab) =>
  tab.addEventListener('click', onClickPayTab));

export { resetPayTab, setPayTabsEventListener };
