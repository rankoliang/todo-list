// import Project from "./javascript/models/project";
import project_controller from "./javascript/controllers/project_controller";

// localStorage.clear();

// const project = Project.create({ title: "Lorem Ipsum" });

// project.todos.create({
//   title: "Title",
//   description: "description",
//   priority: "low",
// });

// project.todos.create({
//   title: "Lorem Ipsum",
//   description: "desc",
//   priority: "medium",
// });

// const todos = Project.create({ title: "Project 2" }).todos;

// todos.create({
//   title: "Go trick or treating",
//   description: "Boo",
//   priority: "high",
//   dueDate: new Date(2021, 10 - 1, 31),
// });

project_controller.index();
