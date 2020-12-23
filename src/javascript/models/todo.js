import Model from "../model";
import Project from "./project";
import { format } from "date-fns";

class Todo extends Model {
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
    };
  }

  static get parents() {
    return [Project];
  }

  get formatted_date() {
    return format(this.dueDate, "MM-dd-yyyy");
  }
}

export default Todo;
