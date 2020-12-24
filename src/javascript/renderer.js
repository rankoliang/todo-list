import { build, attach } from "./helpers";

class Renderer {
  constructor() {
    this.content = document.querySelector("#content");
  }

  static clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  }

  render(route, route_params) {
    this.constructor.clearNode(this.content);

    this.buildComponent(route, route_params, this.content);
  }

  buildComponent(route, route_params, parentNode) {
    Object.assign(this, route_params);

    return attach(parentNode || build({ tag: "div" }), ...this[route]());
  }
}

export default Renderer;
