export const getUniqueOptions = (options, key) => {
  const uniqueMap = new Map();
 options.forEach((option) => {
uniqueMap.set(option[key], option);
  });
  return Array.from(uniqueMap.values());
};

export const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
