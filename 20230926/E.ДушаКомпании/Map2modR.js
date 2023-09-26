module.exports = function solution({ users, rooms }) {
  console.log(users);
  console.log(rooms);
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
    console.log("write");
    let startkey = arr[0];
    for (let i = 0; i < arr[1] - arr[0]; i++) {
      key = startkey + i;
      console.log("key: ", key);
      if (my_map.get(key) === 0) {
        console.log(my_map.get(key), " - 1 if");
        my_map.set(key, 1);
      } else if (my_map.get(key) >= 1 && my_map.get(key) < rooms[0]) {
        console.log(my_map.get(key), " - 2 if");
        value = my_map.get(key) + 1;
        my_map.set(key, value);
      } else if (my_map.get(key) === rooms[0]) {
        console.log(my_map.get(key), " - 3 if");
        my_map.set(key, 0);
      }
    }
    return my_map;
  }

  for (let i = 0; i < my_array2.length; i++) {
    my_map = write_to_map(my_array2[i]);
  }

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
  return result;
};
