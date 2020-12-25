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

  destroy(id) {
    Project.delete(id);

    this.index();
  }

  create() {
    const project = new Project({ title: "New Project" });

    if (project.save()) {
      project.update({ title: `Project ${project.id + 1}` });
      this.index();
    }
  }
}

export default new ProjectController();
