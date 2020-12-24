import Renderer from "../renderer";
import { projectIndex } from "./views/project";

class ProjectRenderer extends Renderer {
  index() {
    return projectIndex(this.projects);
  }
}

export default ProjectRenderer;
