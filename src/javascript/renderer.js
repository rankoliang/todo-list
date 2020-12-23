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

    this[route]().forEach((component) => {
      parentNode.appendChild(component);
    });
  }
}

export default Renderer;
