import Todo from "../models/todo";
import TodoRenderer from "../renderers/todo_renderer";

class TodoController {
  constructor(renderer = TodoRenderer) {
    this.renderer = new renderer();
  }

  index() {
    this.renderer.render("index", { todos: Todo.all });
  }
}

export default new TodoController();
