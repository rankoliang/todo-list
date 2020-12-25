import Project from "../models/project";
import ProjectRenderer from "../renderers/project_renderer";

class ProjectController {
  constructor(renderer = ProjectRenderer) {
    this.renderer = new renderer();
  }

  index() {
    this.renderer.render("index", { projects: Project.all });
  }

  new() {
    this.renderer.render("new", {
      projects: Project.all,
      project: new Project({ title: "" }),
    });
  }

  create(projectParams) {
    const project = new Project(projectParams);

    if (project.save()) {
      this.index();
    }
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
}

export default new ProjectController();
