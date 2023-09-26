const data = {
    "users": [
      [10, 12],
      [13, 17],
      [14, 15]
    ],
    "rooms": [2]
  };
  
  function createVisitorMap(data) {
    const { users, rooms } = data;
    const roomCapacity = rooms[0];
    const visitorMap = new Map();
  
    for (const [arrival, departure] of users) {
      for (let i = arrival; i <= departure; i++) {
        if (visitorMap.has(i)) {
          visitorMap.set(i, visitorMap.get(i) + 1);
        } else {
          visitorMap.set(i, 1);
        }
      }
    }
  
    return visitorMap;
  }
  
  const visitorMap = createVisitorMap(data);
  
  console.log(visitorMap);