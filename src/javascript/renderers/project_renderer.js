import Renderer from "../renderer";
import { projectIndex, projectNew } from "./views/project";

class ProjectRenderer extends Renderer {
  index() {
    return projectIndex(this.projects);
  }

  new() {
    return projectNew(this.projects, this.project);
  }
}

export default ProjectRenderer;
