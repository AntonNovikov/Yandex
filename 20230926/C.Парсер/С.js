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
