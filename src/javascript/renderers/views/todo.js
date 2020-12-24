import { build, capitalize } from "../../helpers";

const todoPartial = function (todo) {
  const buttons = {};

  const partial = build(
    { tag: "div", classes: ["todo"] },
    (buttons.complete = build({ tag: "input", type: "checkbox", name: "todo-complete" })),
    build(
      { tag: "div", classes: ["todo--important"] },
      build({ tag: "span", classes: ["todo--title"], textContent: todo.title }),
      document.createTextNode(" - "),
      build({ tag: "span", classes: ["todo--description"], textContent: todo.description })
    ),
    build(
      { tag: "div", classes: ["todo--info"] },
      build({
        tag: "div",
        classes: ["todo--priority", `todo--priority__${todo.priority}`],
        textContent: `${capitalize(todo.priority)} Priority`,
      }),
      build({ tag: "div", classes: ["todo--due-date"], textContent: `Due ${todo.formatted_date}` }),
      build(
        { tag: "form", classes: ["todo--buttons"] },
        (buttons.edit = build({ tag: "button", classes: ["todo--edit"], textContent: "Edit" })),
        (buttons.delete = build({ tag: "button", classes: ["todo--delete"], textContent: "Delete" }))
      )
    )
  );

  return partial;
};

const todoIndex = function (todos) {
  return todos.map(todoPartial);
};

export { todoPartial, todoIndex };
