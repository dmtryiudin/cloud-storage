export const conditionStyles = (style: object, condition: boolean): object => {
  if (condition) {
    return style;
  }
  return {};
};
