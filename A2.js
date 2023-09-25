const processOrders = require('./A');

const orders1 = [
  {"index":"0000","executionTime":100,"expiredAt":200},
  {"index":"0001","executionTime":1000,"expiredAt":1250},
  {"index":"0002","executionTime":200,"expiredAt":1300},
  {"index":"0003","executionTime":2000,"expiredAt":3200}
];

console.log(processOrders(orders1)); // Output: 3

const orders2 = [
  {"index":"0000","executionTime":1,"expiredAt":2}
];

console.log(processOrders(orders2)); // Output: 1

const orders3 = [
  {"index":"0000","executionTime":3,"expiredAt":2},
  {"index":"0001","executionTime":4,"expiredAt":3}
];

console.log(processOrders(orders3)); // Output: 0