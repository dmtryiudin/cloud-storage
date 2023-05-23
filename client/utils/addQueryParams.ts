export const addQueryParams = (obj: { [param: string]: string }) => {
  let res = "";
  for (let el in obj) {
    if (obj[el]) {
      if (!res) {
        res = `?${el}=${obj[el]}`;
      } else {
        res += `&${el}=${obj[el]}`;
      }
    }
  }

  return res;
};
