import Project from "../models/project";
import ProjectRenderer from "../renderers/project_renderer";

class ProjectController {
  constructor(renderer = ProjectRenderer) {
    this.renderer = new renderer();
  }

  index() {
    this.renderer.render("index", { projects: Project.all });
  }

  update(id, project_params) {
    const project = Project.find(id);
    if (project.update(project_params)) {
      this.index();
    }
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
