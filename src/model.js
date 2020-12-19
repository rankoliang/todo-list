class Model {
  static get model() {
    return "Model";
  }

  constructor({ id = null } = {}) {
    this.id = id;
  }

  static get _tables() {
    return (this.__tables = this.__tables || []);
  }

  static register(model) {
    Model._tables.push(model);
  }

  static get _staticProperties() {
    // Generates new static properties when inherited
    if (!Object.prototype.hasOwnProperty.call(this, "__staticProperties")) {
      this.__staticProperties = { id: 0, all: {} };
    }

    return this.__staticProperties;
  }

  static get all() {
    return Object.values(this._staticProperties.all);
  }

  static get id() {
    return this._staticProperties.id++;
  }

  save() {
    this.id = this.constructor.id;
    this.constructor._staticProperties.all[this.id] = this;

    localStorage.setItem(this.constructor.model, JSON.stringify(this.constructor.all));

    return this;
  }

  static load() {
    if (!localStorage.getItem(this.model)) {
      return this.all;
    }

    // Load all model instances from local storage
    this._staticProperties.all = JSON.parse(localStorage.getItem(this.model)).map(
      (model_params) => new this(model_params)
    );

    // sets the next model id to one above the max
    this._staticProperties.id = this.all.reduce((max_id, model) => {
      if (!isNaN(model.id) && max_id <= model.id) {
        return model.id + 1;
      } else {
        return max_id;
      }
    }, 0);

    return this.all;
  }

  static loadAll() {
    Model._tables.forEach((table) => table.load());
  }
}

export default Model;
