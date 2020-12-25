import { build } from "../../helpers";
import { todoIndex } from "./todo";
import Template from "./template";

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
        (this.buttons["edit"] = build({
          tag: "input",
          classes: ["btn", "btn__yellow"],
          type: "button",
          name: "edit-project",
          value: "Edit",
        })),
        (this.buttons["delete"] = build({
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
      build({
        tag: "input",
        type: "text",
        class: "project--title",
        name: "project-title",
        placeholder: "Project Title",
        value: this.project.title,
        size: "8",
      }),
      (this.buttons["cancel"] = build({
        tag: "input",
        type: "button",
        classes: ["btn", "btn__red"],
        name: "cancel-project-rename",
        value: "N",
      })),
      (this.buttons["confirm"] = build({
        tag: "input",
        type: "button",
        classes: ["btn", "btn__green"],
        name: "confirm-project-rename",
        value: "Y",
      }))
    );

    this.buttonRenderTemplate({
      element,
      buttonRole: "cancel",
      template: "titleGroup",
    });

    return element;
  }
}

const projectIndex = function (projects) {
  return [
    ...projects.map(projectPartial),
    build(
      { tag: "form" },
      build({
        tag: "input",
        classes: ["btn", "btn__yellow", "project--create"],
        name: "project--create",
        type: "button",
        value: "New Project",
      })
    ),
  ];
};

export { projectPartial, projectIndex };
