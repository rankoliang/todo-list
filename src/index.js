import Todo from "./models/todo";
import Project from "./models/project";

localStorage.clear();

const proj = new Project({ title: "Lorem Ipsum" });
proj.save();
proj.buildTodo({ title: "Title", description: "description", priority: "low" }).save();
proj.buildTodo({ title: "Lorem Ipsum", description: "desc", priority: "medium" }).save();
proj.delete();

const proj2 = new Project({ title: "Ipsum Lorem" });
proj2.save();
proj2.buildTodo({ title: "Title", description: "description", priority: "low" }).save();

console.table(Todo.all);
