// Функция-адаптер для информации с сервера
const cityDataAdapter = (oneCity) => {
  const {
    id,
    city,
    'city-id': cityId,
    'delivery-points': deliveryPoints,
  } = oneCity;

  return {
    id,
    city,
    cityId,
    deliveryPoints,
  };
};

// Функция применяющая адаптер для каждого из городов
const adoptCitiesData = (cities) => cities.slice().map((city) => cityDataAdapter(city));

export { adoptCitiesData };
