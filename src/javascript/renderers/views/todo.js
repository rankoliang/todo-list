import Partial from "./partial";
import { attach, build, capitalize } from "../../helpers";
import { format, parseISO } from "date-fns";
import { isPast } from "date-fns";
import projectController from "../../controllers/project_controller";

class TodoPartial extends Partial {
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
    const element = build(
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
        textContent: isPast(this.todo.dueDate)
          ? `Was due on ${this.todo.formatted_date}`
          : `Due ${this.todo.formatted_date}`,
      }),
      build(
        { tag: "form", classes: ["todo--buttons"] },
        (this.input["edit"] = build({
          tag: "button",
          classes: ["todo--edit"],
          textContent: "Show/Edit",
        })),
        (this.input["delete"] = build({
          tag: "button",
          classes: ["todo--delete"],
          textContent: "Delete",
        }))
      )
    );

    this.input["delete"].addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm(`Are you sure you want to remove ${this.todo.title}?`)) {
        this.todo.delete();
        this.element.remove();
      }
    });

    this.input["edit"].addEventListener("click", (e) => {
      e.preventDefault();
      this.element.parentNode.replaceChild(
        new TodoFormPartial({ todo: this.todo }).partial,
        this.element
      );
    });

    return element;
  }

  get partial() {
    this.element = build({ tag: "div", classes: ["todo"] });
    attach(this.element, ...[this.checkbox, this.body, this.footer]);

    return this.element;
  }
}

class TodoFormPartial extends TodoPartial {
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
    console.log(format(this.todo.dueDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
    return build(
      { tag: "div" },
      this.input_field("title", { value: this.todo.title, required: true }),
      this.input_field("description", {
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
        type: "datetime-local",
        value: format(this.todo.dueDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        required: true,
      })
    );
  }

  get footer() {
    const element = build(
      { tag: "div", classes: ["form-field"] },
      (this.input["cancel"] = build({
        tag: "input",
        type: "button",
        classes: ["btn", "btn__red"],
        value: "Cancel",
      })),
      build({
        tag: "input",
        type: "submit",
        classes: ["btn", "btn__green"],
        value: "Confirm",
      })
    );

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      this.todo.assign_attributes({
        title: this.input["title"].value,
        description: this.input["description"].value,
        priority: this.input["priority"].value,
        dueDate: parseISO(this.input["due-date"].value),
      });

      if (this.todo.save()) {
        this.form.parentNode.replaceChild(
          new TodoPartial({ todo: this.todo }).partial,
          this.form
        );
      } else {
        alert("One or more of your form parameters are not valid");
      }
    });

    this.input["cancel"].addEventListener("click", () => {
      projectController.index();
    });

    return element;
  }

  get partial() {
    this.form = build({
      tag: "form",
      classes: ["todo"],
      id: this.todo.id ? "edit-todo-form" : "new-todo-form",
    });
    attach(this.form, ...[this.checkbox, this.body, this.footer]);
    return this.form;
  }

  _form_field(field, interactive_tag) {
    return build(
      { tag: "div", classes: ["form-field"] },
      build({ tag: "label", for: field, textContent: capitalize(field) }),
      (this.input[field] = interactive_tag)
    );
  }

  input_field(
    field,
    { value = "", type = "text", placeholder = "", required = false } = {}
  ) {
    return this._form_field(
      field,
      build({
        tag: "input",
        name: field,
        value,
        placeholder,
        type,
        required,
      })
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

const newTodoButton = function (todo) {
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

function _todo_elements(todos) {
  return todos.map((todo) => new TodoPartial({ todo }).partial);
}

const todoIndex = function (todos) {
  return [..._todo_elements(todos), newTodoButton(todos.build({}))];
};

export { todoIndex, TodoPartial };
