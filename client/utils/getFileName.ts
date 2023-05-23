export const getFileName = (href: string) => {
  const splitHref = href.split("/");
  return splitHref[splitHref.length - 1];
};
