function onionWrapper(...cities) {
    const visitedCities = new Set(cities);
  
    function superOnion(...args) {
      const remainingCities = cities.filter(city => !visitedCities.has(city));
      visitedCities.add(args[0]);
  
      return args.length === 0
        ? taxFunc(remainingCities)
        : superOnion(...args);
    }
  
    return superOnion;
  }
  
  module.exports = onionWrapper;