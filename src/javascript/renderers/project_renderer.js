import Renderer from "../renderer";
import TodoRenderer from "./todo_renderer";

class ProjectRenderer extends Renderer {
  index() {
    return this.projects.map((project) => {
      const projectComponent = document.createElement("div");

      const header = document.createElement("h2");
      header.textContent = project.title;

      projectComponent.appendChild(header);

      new TodoRenderer().buildComponent("index", { todos: project.todos }, projectComponent);
      return projectComponent;
    });
  }
}

export default ProjectRenderer;
