import Renderer from "../renderer";

class ProjectRenderer extends Renderer {
  index() {
    return this.projects.map((project) => {
      const header = document.createElement("h2");
      header.textContent = project.title;
      return header;
    });
  }
}

export default ProjectRenderer;
