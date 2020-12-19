import Model from "../model";

class Todo extends Model {
  static get model() {
    return "Todo";
  }

  constructor({ id, title, description, priority }) {
    super({ id });
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}

Model.register(Todo);

export default Todo;
