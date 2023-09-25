# B. Луковый коммивояжёр
Цифровизация добралась и до известного коммивояжёра по прозвищу "Луковый Странник", теперь он обязан постоянно отчитываться перед налоговой страны N о том, какие города собирается посетить.

Чтобы упростить данный процесс, коммивояжёр обратился к вам за помощью с разработкой специальной функции-обёртки onionWrapper.

Функция должна делать следующее:

Сперва onionWrapper принимает произвольное количество городов (строк), но всегда не меньше одного.
// Пример
onionWrapper('city1')('city2')...('cityN')
Затем ровно один раз onionWrapper принимает произвольную функцию налоговой и возвращает другую функцию, которая "помнит" переданные ранее значения (все города и функцию налоговой). Назовём такую функцию superOnion.
// Пример
const superOnion = onionWrapper('city1')('city2')('city3')(taxFunc)
При этом функция superOnion может вести себя следующим образом:
// Вычёркивает город city1 из своего внутреннего списка городов и вызывает функцию налоговой
// taxFunc с массивом оставшихся городов ["city2","city3"] в качестве входного параметра
superOnion('city1')();

// Вычёркивает города city2 и city3 из своего внутреннего списка городов и вызывает
// функцию налоговой taxFunc с пустым массивом [] в качестве входного параметра
superOnion('city2')('city3')();
Также важно учесть, что при первоначальном составлении списка городов (то есть при передаче строк в onionWrapper) Луковый Странник часто рассеян и может записывать один и тот же город несколько раз, однако superOnion знает об этом и будет вычёркивать все повторы такого города после его посещения (то есть при передаче строки такого города в superOnion).

### Примечания
Задачу требуется решить на JavaScript и оформить решение по шаблону:

function onionWrapper(stringOrFunction) {
  // Ваш код
}

module.exports = onionWrapper;

function onionWrapper(...cities) {
  const visitedCities = new Set(cities);

  function superOnion(...args) {
    const remainingCities = cities.filter(city => !visitedCities.has(city));
    visitedCities.add(args[0]);

    return args.length === 0
      ? taxFunc(remainingCities)
      : superOnion(...args);
  }

  return superOnion;
}

module.exports = onionWrapper;

function onionWrapper(...cities) {
  const visitedCities = new Set(cities);

  function superOnion(...args) {
    const remainingCities = cities.filter(city => !visitedCities.has(city));
    visitedCities.add(args[0]);

    return args.length === 0
      ? taxFunc(remainingCities)
      : superOnion(...args);
  }

  return superOnion;
}

module.exports = onionWrapper;


### Yandex test 
runtime-error


### 

const onionWrapper = require('./onionWrapper');

describe('onionWrapper', () => {
  it('should call taxFunc with remaining cities', () => {
    const taxFunc = jest.fn();
    const superOnion = onionWrapper('city1', 'city2', 'city3')(taxFunc);

    superOnion('city1')();
    expect(taxFunc).toHaveBeenCalledWith(['city2', 'city3']);

    superOnion('city2')('city3')();
    expect(taxFunc).toHaveBeenCalledWith([]);
  });

  it('should handle duplicate cities', () => {
    const taxFunc = jest.fn();
    const superOnion = onionWrapper('city1', 'city1', 'city2')(taxFunc);

    superOnion('city1')();
    expect(taxFunc).toHaveBeenCalledWith(['city2']);

    superOnion('city1')('city2')();
    expect(taxFunc).toHaveBeenCalledWith([]);
  });
});