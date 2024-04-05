import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS, DATE_MASK } from '../const.js';
import { setContainerStatusClass } from '../utils/utils.js';


dayjs.locale('ru');
dayjs.extend(customParseFormat);

const isDateValid = (dateInput, dateInputWrapper) => {
  if (!dateInput.value.length) {
    dateInputWrapper.classList.remove(INPUT_ERR0R_CLASS);
    dateInputWrapper.classList.remove(INPUT_SUCCESS_CLASS);
    return false;
  }
  const date = dayjs(dateInput.value, DATE_MASK, 'ru');
  const now = dayjs().locale('ru');
  const period = now.add(1, 'week');
  setContainerStatusClass(dateInputWrapper, date.isValid() && date >= now && date <= period);
  return date.isValid() && date >= now && date <= period;
};

export { isDateValid };
