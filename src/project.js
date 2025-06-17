export function createProject(title, description,dueDate) {
  return {
    title,
    description,
    dueDate,
    todos: [],
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  };
}