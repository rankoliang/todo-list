class Partial {
  constructor(model) {
    this.model = model;
    this.input = {};
    Object.assign(this, model);
  }

  buttonRenderTemplate({ buttonRole, element, template }) {
    this.input[buttonRole].addEventListener("click", () => {
      element.parentNode.replaceChild(
        new this.constructor.alternate(this.model)[template],
        element
      );
    });
  }
}

export default Partial;
