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

// Falls back to a new div if the parent node does not exist
function build({ tag, classes = [], ...attributes }, ...children) {
  const component = document.createElement(tag);
  component.classList.add(...classes);
  Object.assign(component, attributes);

  attach(component, ...children);

  return component;
}

function attach(component, ...children) {
  children.forEach((child) => {
    component.appendChild(child);
  });

  return component;
}

export { objectMap, cast, build, attach };
