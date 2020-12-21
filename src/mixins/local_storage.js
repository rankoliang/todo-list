const LocalStorageMixin = (Base) =>
  class extends Base {
    static load() {
      if (!localStorage.getItem(this.model)) {
        return false;
      }

      // Load all model instances from local storage
      this._staticProperties.all = function () {
        const table = JSON.parse(localStorage.getItem(this.model)).map((model_params) => [
          model_params.id,
          new this(model_params),
        ]);

        return Object.fromEntries(table);
      }.call(this);

      // sets the next model id to one above the max
      this._staticProperties.id = this._table.reduce((max_id, model) => {
        if (!isNaN(model.id) && max_id <= model.id) {
          return model.id + 1;
        } else {
          return max_id;
        }
      }, 0);
    }

    save() {
      if (!this.isValid) {
        return false;
      }

      this.constructor.load();

      if (this.id === null) {
        this.id = this.constructor.id;
      }

      this.constructor._staticProperties.all[this.id] = Object.assign(new this.constructor(), this);

      this.constructor.save();

      return this;
    }

    static save() {
      localStorage.setItem(this.model, JSON.stringify(this._table));
    }
  };

export default LocalStorageMixin;
