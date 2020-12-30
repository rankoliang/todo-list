import Model from "../utilities/models/model";
import Project from "./project";
import { format } from "date-fns";

class Todo extends Model {
  constructor(...args) {
    super(...args);
  }

  static get defaults() {
    return {
      complete: false,
      dueDate: Date.now(),
    };
  }

  static get model() {
    return "Todo";
  }

  static get properties() {
    return {
      title: String,
      description: String,
      priority: String,
      projectId: Number,
      dueDate: Date,
      complete: Boolean,
    };
  }

  static get parents() {
    return [Project];
  }

  get formatted_date() {
    return format(this.dueDate, "MM/dd/yyyy HH:mm");
  }
}

export default Todo;
