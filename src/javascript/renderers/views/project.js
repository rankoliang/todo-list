import { build } from "../../helpers";
import { todoIndex } from "./todo";
import Template from "./template";
import projectController from "../../controllers/project_controller";

const projectPartial = function (project) {
  const projectShow = new ProjectShow({ project: project });

  const partial = build(
    { tag: "div", classes: ["project"] },
    projectShow.titleGroup,
    build(
      { tag: "div", classes: ["project--card"] },
      ...todoIndex(project.todos)
    )
  );

  return partial;
};

class ProjectShow extends Template {
  static get alternate() {
    return ProjectShowForm;
  }

  get titleGroup() {
    const element = build(
      { tag: "div", classes: ["project--title-group"] },
      build({
        tag: "h2",
        classes: ["project--title"],
        textContent: this.project.title,
      }),
      build(
        { tag: "form" },
        (this.input["edit"] = build({
          tag: "input",
          classes: ["btn", "btn__yellow"],
          type: "button",
          name: "edit-project",
          value: "Edit",
        })),
        (this.input["delete"] = build({
          tag: "input",
          classes: ["btn", "btn__red"],
          type: "button",
          name: "delete-project",
          value: "Delete",
        }))
      )
    );

    this.buttonRenderTemplate({
      element,
      buttonRole: "edit",
      template: "titleGroup",
    });

    //     console.log(projectController.destroy);
    this.input["delete"].addEventListener("click", () => {
      projectController.destroy(this.project.id);
    });

    return element;
  }
}

class ProjectShowForm extends Template {
  static get alternate() {
    return ProjectShow;
  }

  get titleGroup() {
    const element = build(
      {
        tag: "form",
        classes: ["project--title-group", "project--edit-title"],
      },
      (this.input["title"] = build({
        tag: "input",
        type: "text",
        class: "project--title",
        name: "project-title",
        placeholder: "Project Title",
        value: this.project.title,
        size: "8",
      })),
      (this.input["cancel"] = build({
        tag: "input",
        type: "button",
        classes: ["btn", "btn__red"],
        name: "cancel-project-rename",
        value: "N",
      })),
      (this.input["confirm"] = build({
        tag: "input",
        type: "submit",
        classes: ["btn", "btn__green"],
        name: "confirm-project-rename",
        value: "Y",
      }))
    );

    ["cancel", "confirm"].forEach((buttonRole) => {
      this.input[buttonRole].addEventListener("click", (e) => {
        e.preventDefault();
        projectController.index();
      });
    });

    this.input["confirm"].addEventListener("click", () => {
      if (this.project.id === null) {
        projectController.create({ title: this.input["title"].value });
      } else {
        projectController.update(this.project.id, {
          title: this.input["title"].value,
        });
      }
    });

    return element;
  }
}

const _all_projects = function (projects) {
  return projects.map(projectPartial);
};

const projectIndex = function (projects) {
  return [..._all_projects(projects), newProjectButton];
};

const newProjectButton = (function () {
  const button = build(
    { tag: "form" },
    build({
      tag: "input",
      classes: ["btn", "btn__yellow", "project--create"],
      name: "project--create",
      type: "button",
      value: "New Project",
    })
  );

  button.addEventListener("click", () => {
    projectController.new();
  });

  return button;
})();

const projectNew = function (projects, project) {
  return [
    ..._all_projects(projects),
    new ProjectShowForm({ project }).titleGroup,
    newProjectButton,
  ];

  buttons["newProject"].addEventListener("click", () => {
    projectController.create();
  });

  return elements;
};

export { projectPartial, projectIndex, projectNew };
