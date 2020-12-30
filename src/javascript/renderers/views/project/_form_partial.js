import FormPartial from "../../../utilities/renderers/views/form_partial";
import { build } from "../../../utilities/helpers";
import projectController from "../../../controllers/project_controller";
import ProjectPartial from "./_partial";

class ProjectFormPartial extends FormPartial {
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

export default ProjectFormPartial;
