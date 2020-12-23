import Renderer from "../renderer";

class TodoRenderer extends Renderer {
  index() {
    return this.todos.map((todo) => {
      const elements = {
        title: { tag: "h4" },
        description: { tag: "p" },
        priority: { tag: "div" },
        due_date: { tag: "div" },
      };

      const todoComponents = document.createElement("div");

      for (const attribute in elements) {
        const component = document.createElement(elements[attribute].tag);
        component.textContent = todo[attribute];

        todoComponents.appendChild(component);
      }

      return todoComponents;
    });
  }
}

export default TodoRenderer;
