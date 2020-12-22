import Todo from "./models/todo";
import Project from "./models/project";

localStorage.clear();

const proj = new Project({ title: "Lorem Ipsum" });
proj.save();

const todo = proj.todos.create({
  title: "Title",
  description: "description",
  priority: "low",
  due_date: Date.now(),
});

const td2 = proj.todos.create({ title: "Lorem Ipsum", description: "desc", priority: "medium", due_date: Date.now() });

console.table(Todo.all);
