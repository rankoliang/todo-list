import Renderer from "../renderer";

class TodoRenderer extends Renderer {
  index() {
    return this.todos.map((todo) => {
      const elements = {
        title: { tag: "h3" },
        description: { tag: "p" },
        priority: { tag: "div" },
        dueDate: { tag: "div", textContent: todo.formatted_date },
      };

      const todoComponent = document.createElement("div");
      todoComponent.classList.add("todo", "project--card");

      for (const attribute in elements) {
        (() => {
          const { tag, textContent, classes } = elements[attribute];
          const component = document.createElement(tag);
          component.textContent = textContent || todo[attribute];
          if (classes) {
            component.classList.add(...classes);
          }

          todoComponent.appendChild(component);
        })();
      }

      return todoComponent;
    });
  }
}

export default TodoRenderer;
