import Partial from "../../../utilities/renderers/views/partial";
import { build } from "../../../utilities/helpers";
import projectController from "../../../controllers/project_controller";
import ProjectFormPartial from "./_form_partial";
import todoIndex from "../todo/index";

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

export default ProjectPartial;
