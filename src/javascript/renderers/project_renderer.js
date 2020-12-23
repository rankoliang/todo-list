import Renderer from "../renderer";
import TodoRenderer from "./todo_renderer";

class ProjectRenderer extends Renderer {
  index() {
    return this.projects.map((project) => {
      const elements = {
        title: { tag: "h2", classes: ["project--title"] },
      };

      const projectComponent = document.createElement("div");
      projectComponent.classList.add("project");

      for (const attribute in elements) {
        (() => {
          const { tag, textContent, classes } = elements[attribute];
          const component = document.createElement(tag);
          component.textContent = textContent || project[attribute];
          if (classes) {
            component.classList.add(...classes);
          }

          projectComponent.appendChild(component);
        })();
      }

      new TodoRenderer().buildComponent("index", { todos: project.todos }, projectComponent);

      return projectComponent;
    });
  }
}

export default ProjectRenderer;
