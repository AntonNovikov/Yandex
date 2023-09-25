Задача
Напишите функцию parse, которая на вход принимает 3 аргумента:

Функцию для похода за данными
Урл по которому лежат данные
Целое число - размер чанка
Функция должная ходить за разметкой по указаному урлу с помощью переданного фетчера, возвращать асинхронно итерируемый объект, который перебирает элементы полученной разметки и возвращает чанками размера chunkSize значения полей value элементов типа 'data'. Если встречается в разметке элемент типа provider, то этот элемент заменятся на результат работы функции fetcher(src), где src значение одноименного поля элемента

```js
interface ItemProvider {
  type: 'provider';
  src: string;
}

interface ItemData {
  type: 'data';
  value: any;
  children: Array<ItemData | ItemProvider>;
}

type Fetcher = (src: string) => Promise<Array<ItemData | ItemProvider>>;
```
Шаблон решения
```js
modules.exports.parse = function(fetcher: Fetcher, src: string, chunkSize: number): AsyncIterable<any[]> {
  // код
};
````
Пример

Пусть есть ручка src1. Ее ответ:
```js
 [
    {
      type: 'data',
      value: 1
    },
    {
      type: 'data',
      value: 2,
      children: [
        {
          type: 'data',
          value: 1
        },
        {
          type: 'provider',
          src: 'src2'
        },
      ]
    },
    {
      type: 'data',
      value: 3
    }
  ]
  ```
и ручка src2, ее ответ:
``` js
  [
    {
      type: 'data',
      value: 1
    },
    {
      type: 'data',
      value: 2
    },
    {
      type: 'data',
      value: 3
    },
    {
      type: 'data',
      value: 4
    }
  ]
  ```
тогда при вызове вашей функции со вторым аргументом src1 и третим аргументов 3, чанки будут следующими:
```js
[1, 2, 1]
[1, 2, 3]
[4, 3]
```
### мой НЕправильный ответ

```js
async function parse(fetcher, src, chunkSize) {
  const data = await fetcher(src);
  const chunks = [];

  function traverse(item) {
    if (item.type === "data") {
      chunks.push(item.value);
    } else if (item.type === "provider") {
      const providerData = fetcher(item.src);
      chunks.push(...providerData);
    }

    if (item.children) {
      for (const child of item.children) {
        traverse(child);
      }
    }
  }

  traverse(data);

  const result = [];
  let i = 0;

  while (i < chunks.length) {
    result.push(chunks.slice(i, i + chunkSize));
    i += chunkSize;
  }

  return result;
}

module.exports = parse;

```
