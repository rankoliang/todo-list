import Model from "../utilities/models/model";
import ModelCollection from "../utilities/models/model_collection";
import Todo from "./todo";

class Project extends Model {
  static get model() {
    return "Project";
  }

  static get properties() {
    return {
      title: String,
    };
  }

  get todos() {
    return new ModelCollection({ parent: this, model: Todo });
  }

  static delete(id) {
    this.find(id).todos.forEach((todo) => todo.delete());
    super.delete(id);
  }
}

export default Project;
