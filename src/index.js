import Todo from "./models/todo";

const todo1 = new Todo({ title: "Title", description: "description", priority: "low" });
todo1.save();
const todo2 = new Todo({ title: "Lorem Ipsum", description: "desc", priority: "medium" });
todo2.save();
todo1.update({ title: 1 });
console.table(Todo.all);
