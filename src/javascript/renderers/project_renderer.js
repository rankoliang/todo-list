import Renderer from "../renderer";
import projectComponent from "./components/project";

class ProjectRenderer extends Renderer {
  index() {
    return this.projects.map(projectComponent);
  }
}

export default ProjectRenderer;
