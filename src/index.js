import Project from "./javascript/models/project";
import project_controller from "./javascript/controllers/project_controller";

localStorage.clear();

const project = Project.create({ title: "Lorem Ipsum" });

project.todos.create({
  title: "Title",
  description: "description",
  priority: "low",
  due_date: Date.now(),
});

project.todos.create({
  title: "Lorem Ipsum",
  description: "desc",
  priority: "medium",
  due_date: Date.now(),
});

Project.create({ title: "Project 2" });

project_controller.index();
