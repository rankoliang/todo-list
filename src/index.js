import Todo from "./models/todo";
import Project from "./models/project";

const proj = new Project({ title: "Lorem Ipsum" });
proj.save();
proj.buildTodo({ title: "Title", description: "description", priority: "low" }).save();
proj.buildTodo({ title: "Lorem Ipsum", description: "desc", priority: "medium" }).save();

const proj2 = new Project({ title: "Ipsum Lorem" });
proj2.save();
proj2.buildTodo({ title: "Title", description: "description", priority: "low" }).save();

Todo.all[0].delete();
Todo.all[1].delete();
console.table(Todo.all);

localStorage.clear();
