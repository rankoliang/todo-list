import Model from "../model";
import Project from "./project";

class Todo extends Model {
  static get model() {
    return "Todo";
  }

  static get properties() {
    return {
      title: String,
      description: String,
      priority: String,
      project_id: Number,
    };
  }

  static get parents() {
    return [Project];
  }
}

export default Todo;
