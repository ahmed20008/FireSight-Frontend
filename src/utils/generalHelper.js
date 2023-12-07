export const mapObject = (obj, other) => {
  for (let key in obj) {
    obj[key] = other.hasOwnProperty(key) ? other[key] : obj[key];
  }
}