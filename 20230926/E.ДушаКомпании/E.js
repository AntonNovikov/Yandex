// module.exports = function solution({ users, rooms }) {
//   const result = [];
//   let currentRoom = null;

//   for (const user of users) {
//     if (currentRoom === null) {
//       if (rooms.length > 0) {
//         currentRoom = rooms.shift();
//         result.push([user[0], user[0]]);
//       }
//     } else {
//       if (currentRoom > 1) {
//         result.push([user[0], user[0]]);
//         currentRoom--;
//       } else {
//         currentRoom = null;
//         result[result.length - 1][1] = user[0];
//       }
//     }
//   }

//   return result;
// };

module.exports = function solution({ users, rooms }) {
  const result = [];
  let currentRoom = -1;

  for (const [start, end] of users) {
    if (currentRoom === -1) {
      const roomIndex = rooms.findIndex((room) => room > 1);
      if (roomIndex !== -1) {
        currentRoom = roomIndex;
      }
    }

    if (currentRoom !== -1) {
      if (rooms[currentRoom] > 1) {
        result.push([start, end]);
      } else {
        currentRoom = -1;
      }
    }
  }

  return result;
}
