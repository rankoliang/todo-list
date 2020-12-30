import projectController from "../../../controllers/project_controller";
import { build } from "../../../utilities/helpers";

const projectNewButton = function () {
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

export default projectNewButton;
