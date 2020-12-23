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

const todos = Project.create({ title: "Project 2" }).todos;

todos.create({
  title: "Ipsum Lorem",
  description: "hello world",
  priority: "high",
  due_date: new Date(2021, 10, 31),
});

project_controller.index();
