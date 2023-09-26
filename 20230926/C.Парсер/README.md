Задача
Напишите функцию parse, которая на вход принимает 3 аргумента:

Функцию для похода за данными
Урл по которому лежат данные
Целое число - размер чанка
Функция должная ходить за разметкой по указаному урлу с помощью переданного фетчера, возвращать асинхронно итерируемый объект, который перебирает элементы полученной разметки и возвращает чанками размера `chunkSize` значения полей `value` элементов типа 'data'. Если встречается в разметке элемент типа provider, то этот элемент заменятся на результат работы функции `fetcher(src)`, где `src` значение одноименного поля элемента

```ts
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
```ts
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

```js

modules.exports.parse = async function(fetcher, src, chunkSize) {
  const markup = await fetcher(src);

  async function* parseMarkup(markup) {
    for (const item of markup) {
      if (item.type === 'data') {
        yield item.value;
      } else if (item.type === 'provider') {
        const providerMarkup = await fetcher(item.src);
        yield* parseMarkup(providerMarkup);
      }
    }
  }

  const chunks = [];
  let chunk = [];

  for await (const value of parseMarkup(markup)) {
    chunk.push(value);

    if (chunk.length === chunkSize) {
      chunks.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length > 0) {
    chunks.push(chunk);
  }

  return chunks;
};
```


``` ts
modules.exports.parse = async function(fetcher: Fetcher, src: string, chunkSize: number): Promise<any[][]> {
  const markup: Array<ItemData | ItemProvider> = await fetcher(src);

  async function* parseMarkup(markup: Array<ItemData | ItemProvider>): AsyncGenerator<any, void, unknown> {
    for (const item of markup) {
      if (item.type === 'data') {
        yield item.value;
      } else if (item.type === 'provider') {
        const providerMarkup: Array<ItemData | ItemProvider> = await fetcher(item.src);
        yield* parseMarkup(providerMarkup);
      }
    }
  }

  const chunks: any[][] = [];
  let chunk: any[] = [];

  for await (const value of parseMarkup(markup)) {
    chunk.push(value);

    if (chunk.length === chunkSize) {
      chunks.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length > 0) {
    chunks.push(chunk);
  }

  return chunks;
};
```