const solution = require("./Map2modR");

const input = {
  users: [
    [10, 12],
    [13, 17],
    [14, 15],
  ],
  rooms: [2],
};

const output = solution(input);
console.log(output);
// Вывод: [ [ 10, 12 ], [ 13, 14 ], [ 15, 17 ] ]


const input2 = {
  users: [
    [10, 12],
    [13, 15],
    [16, 17],
  ],
  rooms: [1],
};

const output2 = solution(input2);
console.log(output2);



const input3 = {
  users: [
    [10, 12],
    [13, 15],
    [16, 17],
  ],
  rooms: [1],
};

const output3 = solution(input3);
console.log(output3);


const input4 = {
  users: [
    
  ],
  rooms: [1],
};

const output4 = solution(input4);
console.log(output4);
