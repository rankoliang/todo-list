import { build } from "../../helpers";
import { todoIndex } from "./todo";
import Partial from "./partial";
import projectController from "../../controllers/project_controller";

class ProjectPartial extends Partial {
  static get alternate() {
    return ProjectFormPartial;
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
        { tag: "form", classes: ["no-wrap"] },
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

    this.input["delete"].addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete '${this.project.title}'?`)) {
        projectController.destroy(this.project.id);
      }
    });

    return element;
  }

  get element() {
    return build(
      { tag: "div", classes: ["project"] },
      this.titleGroup,
      build(
        { tag: "div", classes: ["project--card"] },
        ...todoIndex(this.project.todos)
      )
    );
  }
}

class ProjectFormPartial extends Partial {
  static get alternate() {
    return ProjectPartial;
  }

  get titleGroup() {
    const element = build(
      {
        tag: "form",
        classes: ["project--title-group", "project--edit-title"],
      },
      (this.input["confirm"] = build({
        tag: "input",
        type: "submit",
        classes: ["btn", "btn__green"],
        name: "confirm-project-rename",
        value: "Y",
      })),
      (this.input["cancel"] = build({
        tag: "input",
        type: "button",
        classes: ["btn", "btn__red"],
        name: "cancel-project-rename",
        value: "N",
      })),
      (this.input["title"] = build({
        tag: "input",
        type: "text",
        classes: ["project--title"],
        name: "project-title",
        placeholder: "Project Title",
        value: this.project.title,
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

const _project_elements = function (projects) {
  return projects.map((project) => new ProjectPartial({ project }).element);
};

const projectIndex = function (projects) {
  return [..._project_elements(projects), newProjectButton()];
};

const newProjectButton = function () {
  let button;
  const form = build(
    { tag: "form" },
    (button = build({
      tag: "input",
      classes: ["btn", "btn__yellow", "project--create"],
      name: "project--create",
      type: "button",
      value: "New Project",
    }))
  );

  button.addEventListener("click", () => {
    projectController.new();
  });

  return form;
};

const projectNew = function (projects, project) {
  return [
    ..._project_elements(projects),
    new ProjectFormPartial({ project }).titleGroup,
    newProjectButton(),
  ];
};

export { projectIndex, projectNew };
