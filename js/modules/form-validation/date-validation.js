import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS } from '../const.js';

const DATE_MASK = 'DD/MM/YYYY';
dayjs.locale('ru');
dayjs.extend(customParseFormat);

const isDateValid = (dateInput, dateInputWrapper) => {
  if (!dateInput.value.length) {
    dateInputWrapper.classList.remove(INPUT_ERR0R_CLASS);
    dateInputWrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  const date = dayjs(dateInput.value, 'DD/MM/YYYY', 'ru');
  const now = dayjs().locale('ru');
  const period = now.add(1, 'week');
  if (date.isValid()) {
    // console.log('HYI');
    // console.log(now >= date);
  }
  console.log(dateInput.value);
  console.log(date);
  console.log(dayjs.locale());
  console.log(date.format('DD/MM/YYYY'));
  // console.log('NIHYI');
  // console.log(now.format('DD/MM/YYYY'));
  // console.log(period.format('DD/MM/YYYY'));
};

export { isDateValid };
