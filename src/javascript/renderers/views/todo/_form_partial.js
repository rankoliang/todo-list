import FormPartial from "../../../utilities/renderers/views/form_partial";
import TodoPartial from "./_partial";
import projectController from "../../../controllers/project_controller";
import { attach, build } from "../../../utilities/helpers";
import { format, parse, parseISO } from "date-fns";
import Modernizr from "../../../utilities/modernizr";

class TodoFormPartial extends FormPartial {
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

  get dueDateField() {
    if (Modernizr.inputtypes["datetime-local"]) {
      return this.input_field("due-date", {
        type: "datetime-local",
        value: format(this.todo.dueDate, "yyyy-MM-dd'T'HH:mm"),
        required: true,
        pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
        title: "2020-01-01T16:00",
      });
    } else {
      return build(
        { tag: "div" },
        this.input_field("Due date", {
          type: "date",
          value: format(this.todo.dueDate, "yyyy-MM-dd"),
          required: true,
        }),
        this.input_field("Due time", {
          type: "time",
          value: format(this.todo.dueDate, "HH:mm"),
          required: true,
        })
      );
    }
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
      this.dueDateField
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
        dueDate: this.parseDueDate(),
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

  parseDueDate() {
    if (Modernizr.inputtypes["datetime-local"]) {
      return parseISO(this.input["due-date"].value);
    } else {
      const date = this.input["Due date"].value;
      const time = this.input["Due time"].value;
      return parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", Date.now());
    }
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
}

export default TodoFormPartial;
