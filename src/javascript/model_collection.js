class ModelCollection extends Array {
  constructor({ parent, model }) {
    super();
    Object.defineProperties(this, {
      _model: {
        value: model,
        enumerable: false,
      },
      _parent: {
        value: parent,
        enumerable: false,
      },
    });

    this.push(...model.all.filter((model_object) => model_object[this._parent.constructor.id_key] === parent.id));
  }

  // map, filter, and reduce return normal arrays
  static get [Symbol.species]() {
    return Array;
  }

  build({ ...model_params }) {
    return new this._model({ ...model_params, [this._parent.constructor.id_key]: this._parent.id });
  }

  create({ ...model_params }) {
    const model = this.build({ ...model_params });
    model.save();

    return model;
  }
}

export default ModelCollection;
