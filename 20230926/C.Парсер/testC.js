const parse = require("./C");

const fetcher = async function (src) {
  try {
    console.log("try");
    console.log(src);
    const response = await fetch(src); // Отправляем GET-запрос по указанному URL
    const data = await response.json(); // Парсим полученные данные в формате JSON
    return data; // Возвращаем полученные данные
  } catch (error) {
    console.log("catch");
    console.error(error); // Обрабатываем ошибку, если что-то пошло не так
    throw new Error("Failed to fetch data"); // Выбрасываем ошибку, чтобы ее можно было обработать в вызывающем коде
  }
};

const src = "src1";
const chunkSize = 3;

console.log("___");
const iterable = parse(fetcher, src, chunkSize);

iterable.then((data) => {
  console.log("Then");
  console.log(data);
});
console.log("___");
// console.log(iterable)
(async function () {
  for await (const chunk of iterable) {
    console.log(chunk);
  }
})();

const src1 = [
  {
    type: "data",
    value: 1,
  },
  {
    type: "data",
    value: 2,
    children: [
      {
        type: "data",
        value: 1,
      },
      {
        type: "provider",
        src: "src2",
      },
    ],
  },
  {
    type: "data",
    value: 3,
  },
];
const src2 = [
  {
    type: "data",
    value: 1,
  },
  {
    type: "data",
    value: 2,
  },
  {
    type: "data",
    value: 3,
  },
  {
    type: "data",
    value: 4,
  },
];
