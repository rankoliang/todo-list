import todoNewButton from "./_new_button";
import _todo_elements from "./_elements";

function todoIndex(todos) {
  return [..._todo_elements(todos), todoNewButton(todos.build({}))];
}

export default todoIndex;
