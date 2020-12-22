import { toDate, parseJSON } from "date-fns";

function objectMap(obj, callback) {
  return Object.fromEntries(Object.entries(obj).map(callback));
}

function cast(type, load_format) {
  switch (type) {
    case Date:
      switch (load_format) {
        case "JSON":
          return parseJSON;
        default:
          return toDate;
      }
    default:
      return type;
  }
}

export { objectMap, cast };
