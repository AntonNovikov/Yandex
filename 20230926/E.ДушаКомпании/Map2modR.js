module.exports = function solution({ users, rooms }) {
  if (users.length === 0 || rooms === 0) {
    return [];
  }
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
    let startkey = arr[0];
    for (let i = 0; i < arr[1] - arr[0]; i++) {
      key = startkey + i;
      if (my_map.get(key) === 0) {
        my_map.set(key, 1);
      } else if (my_map.get(key) === 1) {
        my_map.set(key, 2);
      }
    }
    return my_map;
  }

  for (let i = 0; i < my_array2.length; i++) {
    my_map = write_to_map(my_array2[i]);
  }

  let intervals = my_map;
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
  return result;
};
