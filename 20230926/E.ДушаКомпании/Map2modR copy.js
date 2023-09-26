module.exports = function solution({ users, rooms }) {
  // console.log(users);
  if (users.length === 0 || rooms === 0) {
    // console.log("if");
    return [];
  }
  // const my_array2 = [
  //   [10, 12],
  //   [13, 17],
  //   [14, 15],
  // ];
  const my_array2 = users;
  let my_map = new Map();
  let min_num = Infinity;
  let max_num = -Infinity;
  for (let i = 0; i < my_array2.length; i++) {
    for (let j = 0; j < my_array2[i].length; j++) {
      const num = my_array2[i][j];
      if (num < min_num) {
        min_num = num;
      }
      if (num > max_num) {
        max_num = num;
      }
    }
  }

  for (let num = min_num; num <= max_num; num++) {
    my_map.set(num, 0);
  }

  function write_to_map(arr) {
    // console.log(arr);
    // console.log(arr.length);
    // console.log(arr[arr.length - 1]);
    let startkey = arr[0];
    for (let i = 0; i < arr[1] - arr[0]; i++) {
      key = startkey + i;
      // console.log(my_map.get(key));
      if (my_map.get(key) === 0) {
        my_map.set(key, 1);
      } else if (my_map.get(key) === 1) {
        my_map.set(key, 2);
      }
    }

    return my_map;
  }

  const my_array = [10, 15];

  for (let i = 0; i < my_array2.length; i++) {
    my_map = write_to_map(my_array2[i]);
    // console.log("_________", i + 1, "_________");
    // console.log(my_map);
  }

  // my_map = write_to_map(my_array2[0]);
  // // console.log("1_________");
  // // console.log(my_map);
  // my_map = write_to_map(my_array2[1]);
  // // console.log("2_________");
  // // console.log(my_map);
  // my_map = write_to_map(my_array2[2]);
  // console.log("3_________");
  // console.log(my_map);

  // let rooms = 2;
  // let rooms = rooms;
  // let intervals = new Map([
  //   [10, 1],
  //   [11, 1],
  //   [12, 0],
  //   [13, 1],
  //   [14, 2],
  //   [15, 1],
  //   [16, 1],
  //   [17, 0]
  // ]);
  let intervals = my_map;
  console.log(my_map);
  let result = [];
  let start = null;
  let end = null;

  for (let [key, value] of intervals) {
    if (value > 0 && value < rooms) {
      if (start === null) {
        start = key;
        end = key;
      } else {
        end = key;
      }
    } else {
      if (start !== null) {
        result.push([start, end + 1]);
        start = null;
        end = null;
      }
    }
  }

  if (start !== null) {
    result.push([start, end + 1]);
  }

  // console.log(result);
  return result;
};
