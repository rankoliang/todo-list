import Todo from "./models/todo";
import Project from "./models/project";

localStorage.clear();

const proj = new Project({ title: "Lorem Ipsum" });
proj.save();
proj.todos.create({ title: "Title", description: "description", priority: "low" });
proj.todos.create({ title: "Lorem Ipsum", description: "desc", priority: "medium" });
proj.delete();

const proj2 = new Project({ title: "Ipsum Lorem" });
proj2.save();
proj2.todos.build({ title: "Title", description: "description", priority: "low" }).save();

console.table(Todo.all);
