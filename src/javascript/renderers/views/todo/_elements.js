import TodoPartial from "./_partial";

function _todo_elements(todos) {
  return todos.map((todo) => new TodoPartial({ todo }).partial);
}

export default _todo_elements;
