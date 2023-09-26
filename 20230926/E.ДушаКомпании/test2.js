function solution({users, rooms}) {
    const result = [];
    let currentRoom = -1;
  
    for (const [start, end] of users) {
        console.log(start, end)
      if (currentRoom === -1) {
        const roomIndex = rooms.findIndex(room => room === 0);
        if (roomIndex !== -1) {
          currentRoom = roomIndex;
        }
      }
  
      if (currentRoom !== -1) {
        if (rooms[currentRoom] === 0) {
          result.push([start, end]);
        } else {
          currentRoom = -1;
        }
      }
    }
  
    return result;
  }
  
  const data = {
    users: [
      [10, 12],
      [13, 17],
      [14, 15]
    ],
    rooms: [1]
  };
  
  console.log(solution(data)); // Output: [[14, 15]]