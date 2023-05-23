export const fromBytesToMegabytes = (capacity: number) => {
  return (capacity * (9.537 * Math.pow(10, -7))).toFixed(1);
};
