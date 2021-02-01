export const getGuid = () => Math.floor(Math.random() * 100000000000);

export const compare = (a, b, key = "name") => {
  if (typeof a[key] == "string") {
    if (a[key] && a[key].toUpperCase() < b[key] && b[key].toUpperCase())
      return -1;
    if (a[key] && a[key].toUpperCase() > b[key] && b[key].toUpperCase())
      return 1;
  } else {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
  }
  return 0;
};
