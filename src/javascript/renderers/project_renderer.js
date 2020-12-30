import Renderer from "../utilities/renderers/renderer";
import projectIndex from "./views/project/index"
import projectNew from "./views/project/new"

class ProjectRenderer extends Renderer {
  index() {
    return projectIndex(this.projects);
  }

  new() {
    return projectNew(this.projects, this.project);
  }
}

export default ProjectRenderer;
