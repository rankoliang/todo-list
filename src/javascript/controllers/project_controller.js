import Project from "../models/project";
import ProjectRenderer from "../renderers/project_renderer.js";

class ProjectController {
  constructor(renderer = ProjectRenderer) {
    this.renderer = new renderer();
  }

  index() {
    this.renderer.render("index", { projects: Project.all });
  }

  // create(project_params) {
  //   const project = new Project({ project_params });

  //   if (project.save()) {
  //     this.renderer.index();
  //   } else {
  //     this.renderer.new();
  //   }
  // }
}

export default new ProjectController();
