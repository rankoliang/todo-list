import { build, capitalize } from "../../helpers";
import Template from "./template";
import Todo from "../../models/todo";
import { format } from "date-fns";

const todoPartial = function (todo, { TodoTemplateClass = TodoTemplate } = {}) {
  const todoTemplate = new TodoTemplateClass({ todo });

  const partial = build(
    { tag: "div", classes: ["todo"] },
    todoTemplate.checkbox,
    todoTemplate.body,
    todoTemplate.footer
  );

  return partial;
};

class TodoTemplate extends Template {
  get checkbox() {
    const element = build({
      tag: "input",
      type: "checkbox",
      name: "todo-complete",
      checked: this.todo.complete,
    });

    element.addEventListener("change", (e) => {
      this.todo.complete = e.target.checked;
      this.todo.save();
    });

    return element;
  }

  get body() {
    return build(
      { tag: "div", classes: ["todo--important"] },
      build({
        tag: "span",
        classes: ["todo--title"],
        textContent: this.todo.title,
      }),
      document.createTextNode(" - "),
      build({
        tag: "span",
        classes: ["todo--description"],
        textContent: this.todo.description,
      })
    );
  }

  get footer() {
    return build(
      { tag: "div", classes: ["todo--info"] },
      build({
        tag: "div",
        classes: ["todo--priority", `todo--priority__${this.todo.priority}`],
        textContent: `${
          this.todo.priority && capitalize(this.todo.priority)
        } Priority`,
      }),
      build({
        tag: "div",
        classes: ["todo--due-date"],
        textContent: `Due ${this.todo.formatted_date}`,
      }),
      build(
        { tag: "form", classes: ["todo--buttons"] },
        (this.input["edit"] = build({
          tag: "button",
          classes: ["todo--edit"],
          textContent: "Edit",
        })),
        (this.input["delete"] = build({
          tag: "button",
          classes: ["todo--delete"],
          textContent: "Delete",
        }))
      )
    );
  }

  get partial() {
    return build(
      { tag: "div", classes: ["todo"] },
      this.checkbox,
      this.body,
      this.footer
    );
  }
}

class TodoFormTemplate extends TodoTemplate {
  get checkbox() {
    const element = build({
      tag: "input",
      type: "checkbox",
      name: "todo-complete",
      checked: this.todo.complete,
    });

    element.addEventListener("change", (e) => {
      this.todo.complete = e.target.checked;
    });

    return element;
  }

  get body() {
    return build(
      { tag: "div" },
      this.input_field("Title", { value: this.todo.title, required: true }),
      this.input_field("Description", {
        value: this.todo.description,
        required: true,
      }),
      this.select_field(
        "priority",
        {
          low: "Low",
          medium: "Medium",
          high: "High",
        },
        this.todo.priority
      ),
      this.input_field("due-date", {
        type: "date",
        value: format(this.todo.dueDate, "yyyy-MM-dd"),
        required: true,
      })
    );
  }

  get footer() {
    return build({ tag: "div" });
  }

  _form_field(field, interactive_tag) {
    return build(
      { tag: "div", classes: ["form-field"] },
      build({ tag: "label", for: field, textContent: capitalize(field) }),
      interactive_tag
    );
  }

  input_field(
    field,
    { value = "", type = "text", placeholder = "", required = false } = {}
  ) {
    return this._form_field(
      field,
      build({ tag: "input", name: field, value, placeholder, type, required })
    );
  }

  select_field(field, options, selected_value) {
    return this._form_field(
      field,
      build(
        { tag: "select", name: field },
        ...Object.entries(options).map(([value, textContent]) => {
          return build({
            tag: "option",
            value,
            textContent,
            selected: value === selected_value,
          });
        })
      )
    );
  }
}

const newTodoButton = function () {
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
    button.parentNode.insertBefore(
      todoPartial(new Todo(), { TodoTemplateClass: TodoFormTemplate }),
      button
    );
  });

  return button;
};

function _todo_elements(todos) {
  return todos.map(todoPartial);
}

const todoIndex = function (todos) {
  return [..._todo_elements(todos), newTodoButton()];
};

export { todoPartial, todoIndex };
