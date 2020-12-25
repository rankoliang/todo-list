class Template {
  constructor(model) {
    this.model = model;
    this.buttons = {};
    Object.assign(this, model);
  }

  buttonRenderTemplate({ buttonRole, element, template }) {
    this.buttons[buttonRole].addEventListener("click", () => {
      element.parentNode.replaceChild(
        new this.constructor.alternate(this.model)[template],
        element
      );
    });
  }
}

export default Template;
