import Model from "./model";
import Todo from "./models/todo";

Model.loadAll();
console.log(new Todo({ title: "Title" }).save());
console.log(new Todo({ description: "description" }).save());
console.table(Todo.all);
localStorage.clear();
