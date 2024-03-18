import dayjs from 'https://cdn.skypack.dev/dayjs@1.11.10';
import 'https://cdn.skypack.dev/dayjs@1.11.10/locale/ru';
import customParseFormat from 'https://cdn.skypack.dev/dayjs@1.11.10/plugin/customParseFormat';
import { INPUT_ERR0R_CLASS, INPUT_SUCCESS_CLASS, DATE_MASK } from '../const.js';
import { setStatusClassToContainer } from '../utils.js';


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
  if (date.isValid() && date >= now && date <= period) {
    setStatusClassToContainer(dateInputWrapper, true);
    return true;
  }
  setStatusClassToContainer(dateInputWrapper, false);
  return false;
};

export { isDateValid };
