import { build } from "../../helpers";
import { todoPartial } from "./todo";

const projectPartial = function (project) {
  const buttons = {};

  const partial = build(
    { tag: "div", classes: ["project"] },
    build(
      { tag: "div", classes: ["project--title-group"] },
      build({ tag: "h2", classes: ["project--title"], textContent: project.title }),
      build(
        { tag: "form" },
        (buttons.edit = build({
          tag: "input",
          classes: ["btn", "btn__yellow"],
          type: "button",
          name: "edit-project",
          value: "Edit",
        })),
        (buttons.delete = build({
          tag: "input",
          classes: ["btn", "btn__red"],
          type: "button",
          name: "delete-project",
          value: "Delete",
        }))
      )
    ),
    build({ tag: "div", classes: ["project--card"] }, ...project.todos.map(todoPartial))
  );

  return partial;
};

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
