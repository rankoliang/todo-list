import Renderer from "../renderer";
import { todoIndex } from "./views/todo";

class TodoRenderer extends Renderer {
  index() {
    return todoIndex(this.todos);
  }
}

export default TodoRenderer;
