export const getCssValue = (property: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
};
