const rangeSlider = document.querySelector('.range-slider');
const rangeSliderInput = document.querySelector('#delivery-user-time-delivery');

const initialStartMinute = 600;
const initialEndMinute = 1020;
const step = 20;
const MINUTES_PER_HOUR = 60;

const convertToHour = (value) => Math.floor(value / MINUTES_PER_HOUR);

const convertToMinute = (value, hour) => value - hour * MINUTES_PER_HOUR;

const formatHoursAndMinutes = (value) => {
  let hours = 0;
  let minutes = 0;

  hours = convertToHour(value);
  minutes = convertToMinute(value, hours);

  if (hours.toString().length === 1) {
    hours = `0${hours}`;
  }
  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

const format = {
  to: function (value) {
    return formatHoursAndMinutes(value);
  },
  from: function (value) {
    return value;
  }
};

noUiSlider.create(rangeSlider, {
  start: initialStartMinute,
  range: {
    'min': initialStartMinute,
    'max': initialEndMinute,
  },
  step: step,
  format: format,
  tooltips: true,
});

const setDeliveryTime = (values) => {
  const secondValues = values[0].split(':');
  rangeSliderInput.value = `${values[0]}-${Number(secondValues[0]) + 2}:${secondValues[1]}`;
};

rangeSlider.noUiSlider.on('update', (values) => setDeliveryTime(values));
