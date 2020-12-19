function objectMap(obj, callback) {
  return Object.fromEntries(Object.entries(obj).map(callback));
}

export { objectMap }
