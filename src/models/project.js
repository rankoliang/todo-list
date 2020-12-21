import Model from "../model";
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

  buildTodo({ ...todo_params }) {
    return new Todo({ ...todo_params, project_id: this.id });
  }

  get todos() {
    return Todo.all.filter((todo) => todo.project_id === this.id);
  }

  static delete(id) {
    this.find(id).todos.forEach((todo) => todo.delete());
    super.delete(id);
  }
}

export default Project;
