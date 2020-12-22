import Todo from "./javascript/models/todo";
import Project from "./javascript/models/project";

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

console.table(Todo.all, Object.keys(Todo.properties));
