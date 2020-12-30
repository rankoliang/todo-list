import Partial from "../../../utilities/renderers/views/partial";
import TodoFormPartial from "./_form_partial";
import { attach, build, capitalize } from "../../../utilities/helpers";
import { isPast } from "date-fns";

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

export default TodoPartial;
