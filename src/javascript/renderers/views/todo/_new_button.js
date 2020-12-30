import TodoFormPartial from "./_form_partial";
import { build } from "../../../helpers";

const todoNewButton = function (todo) {
  const button = build(
    { tag: "form" },
    build({
      tag: "input",
      classes: ["btn", "btn__yellow", "project--new-todo"],
      name: "todo--create",
      type: "button",
      value: "New Todo",
    })
  );

  button.addEventListener("click", () => {
    const todoForm = document.getElementById("new-todo-form");
    if (todoForm) {
      todoForm.remove();
    }

    button.parentNode.insertBefore(
      new TodoFormPartial({ todo }).partial,
      button
    );
  });

  return button;
};

export default todoNewButton;
