const solution = require("./Map2modR");
console.log("0____");
const input = {
  users: [
    [10, 12],
    [13, 17],
    [14, 15],
  ],
  rooms: [2],
};

const output = solution(input);
console.log("Ответ: ",output);
// Вывод: [ [ 10, 12 ], [ 13, 14 ], [ 15, 17 ] ]
console.log("2____");
const input2 = {
  users: [
    [10, 12],
    [13, 15],
    [16, 17],
  ],
  rooms: [1],
};

const output2 = solution(input2);
console.log("Ответ: ",output2);
console.log("3____");
const input3 = {
  users: [
    [10, 12],
    [12, 15],
    [15, 17],
  ],
  // rooms: [4], // [ [ 10, 12 ], [ 13, 17 ] ]
  // rooms: [3], // [ [ 10, 12 ], [ 13, 16 ] ]
  rooms: [2], // [ [ 10, 12 ], [ 13, 14 ], [ 15, 16 ] ]
};
// console.log(input3.users)
// console.log(input3.rooms)
const output3 = solution(input3);
console.log("Ответ: ",output3);
console.log("4____");
const input4 = {
  users: [],
  rooms: [1],
};

const output4 = solution(input4);
console.log( "Ответ: ",output4);
