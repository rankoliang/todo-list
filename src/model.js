import LocalStorageMixin from "./mixins/local_storage";
import { objectMap } from "./helpers";

class BaseModel {
  constructor({ id = null, ...model_params } = {}) {
    this.id = id;

    // initializes properties to null
    Object.assign(
      this,
      objectMap(this.constructor.properties, ([key]) => [key, null])
    );

    this.assign_attributes(model_params);
  }

  static get _staticProperties() {
    // Generates new static properties when inherited
    if (!Object.prototype.hasOwnProperty.call(this, "__staticProperties")) {
      this.__staticProperties = { id: 0, all: {} };
    }

    return this.__staticProperties;
  }

  static get model() {
    return "Model";
  }

  static get id() {
    return this._staticProperties.id++;
  }

  static get id_key() {
    return `${this.model.toLowerCase()}_id`;
  }

  static get _parent() {
    return this.references.parent;
  }

  static get references() {
    return {};
  }

  static create(model_params) {
    const model = new this(model_params);
    model.save();

    return model;
  }

  static find(id) {
    return this._staticProperties.all[id];
  }

  static delete(id) {
    delete this._staticProperties.all[id];
    this.save();
  }

  delete() {
    this.constructor.delete(this.id);
  }

  assign_attributes(model_params) {
    // validates types
    Object.assign(this, model_params);

    // dynamically sets a parent attribute
    (() => {
      if (this.constructor._parent) {
        this[this.constructor._parent.model.toLowerCase()] = this.constructor._parent.all.find(
          (parent_object) => parent_object.id === this[this.constructor._parent.id_key]
        );
      }
    })();
  }

  update(model_params) {
    this.assign_attributes(model_params);
    return this.save();
  }

  get errors() {
    return (this._errors = this._errors || {});
  }

  validate() {
    this._errors = Object.fromEntries(
      Object.entries(this.constructor.properties).flatMap(([property, datatype]) => {
        const value = this[property];
        const messages = [];

        if (value === null || value.constructor !== datatype) {
          messages.push(`${value} is not of type ${datatype.name}`);
        }

        return messages.length > 0 ? [[property, messages]] : [];
      })
    );
  }

  _appendError(property, message) {
    if (!this.errors[property]) {
      this.errors[property] = [];
    }

    this.errors[property].push(message);
  }

  get isValid() {
    this.validate();

    return Object.keys(this.errors).length === 0;
  }

  static get all() {
    this.load();

    return this._table;
  }

  static get _table() {
    return Object.values(this._staticProperties.all);
  }
}

export default LocalStorageMixin(BaseModel);
