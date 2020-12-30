import Partial from "../partial";
import TodoPartial from "./_form_partial";
import projectController from "../../../controllers/project_controller";
import { attach, build, capitalize } from "../../../helpers";
import { format, parseISO } from "date-fns";

class TodoFormPartial extends Partial {
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
      this.input_field("title", { value: this.todo.title, required: true }),
      this.textarea_field("description", {
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
        value: format(this.todo.dueDate, "yyyy-MM-dd'T'HH:mm"),
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
  textarea_field(field, { value, required }) {
    return this._form_field(
      field,
      build({
        tag: "textarea",
        value,
        required,
      })
    );
  }
}

export default TodoFormPartial;
