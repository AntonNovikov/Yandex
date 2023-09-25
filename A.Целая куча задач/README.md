# A. Целая куча задач

Молодая команда разработчиков была нанята, чтобы разработать админку для b2b-компании, занимающейся обработкой текстовых данных. Вашей задачей является создание алгоритма, который бы позволял обработать наибольшее количество заказов.

Заказы представляет собой массив объектов со следующими полями: interface Order { id: string; executionTime: number; expiredAt: number; }

Где поле id представляет собой уникальный идентификатор заказа, поле executionTime содержит количество минут, необходимых для выполнения заказа, а поле expiredAt крайний срок (в минутах), к которому заказ должен быть выполнен.

Работа алгоритма начинается в нулевой момент времени.

### Пример 1

Ввод

```javascript
[
  { index: "0000", executionTime: 100, expiredAt: 200 }, // 1  100 <= 200
  { index: "0001", executionTime: 1000, expiredAt: 1250 }, // 2  1100 <= 1250
  { index: "0002", executionTime: 200, expiredAt: 1300 }, //3  1300 <= 1300
  { index: "0003", executionTime: 2000, expiredAt: 3200 }, // -
];
```

Вывод 3

### Пример 2

Ввод

```javascript
[{ index: "0000", executionTime: 1, expiredAt: 2 }]; // 1 1<=2
```

Вывод 1

### Пример 3

Ввод

```javascript
[{"index":"0000","executionTime":3,"expiredAt":2}, // -  3 > 2
{"index":"0001","executionTime":4,"expiredAt":3}] // - 4 < 3
Вывод 0
```

### Примечания

Решение требуется оформить по шаблону:

```javascript
module.exports = function (orders) {
  // основная функция
  // ...
};

// вспомогательные функции
// ...
```
### Моё решение
```javascript
module.exports = function(orders) {
  orders.sort((a, b) => a.expiredAt - b.expiredAt);
  let currentTime = 0;
  let maxOrders = 0;
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    if (currentTime + order.executionTime <= order.expiredAt) {
      maxOrders++;
      currentTime += order.executionTime;
    }
  }
  return maxOrders;
}
```

### Ответ тестов

``` js
orders.length-bad order = right answer
1 orders.length-1 = 3
2 orders.length = 1
3 orders.length-2 = 0
4 orders.length-1 = 3
5 orders.length = 1
6 orders.length-2 = 0
7 orders.length = 2
8 orders.length-1 = 2 // (Мой код выдает на 1 меньше
9 orders.length-1 = 1
10 4
11 orders.length-2 = 3
12 orders.length-3 = right answer
13 orders.length = 4
``