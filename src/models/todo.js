import Model from "../model";

class Todo extends Model {
  static get model() {
    return "Todo";
  }

  static get properties() {
    return {
      title: String,
      description: String,
      priority: String,
    };
  }
}

export default Todo;
