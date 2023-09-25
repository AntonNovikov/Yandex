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

