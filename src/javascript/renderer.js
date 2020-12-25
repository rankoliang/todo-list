import { build, attach, clearNode } from "./helpers";

class Renderer {
  constructor() {
    this.content = document.querySelector("#content");
  }

  render(route, route_params) {
    clearNode(this.content);

    this.buildComponent(route, route_params, this.content);
  }

  buildComponent(route, route_params, parentNode) {
    Object.assign(this, route_params);

    return attach(parentNode || build({ tag: "div" }), ...this[route]());
  }
}

export default Renderer;
