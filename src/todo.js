export function createToDo(title, description, dueDate, priority, checklist = false) {
  return {
    title,
    description,
    dueDate,
    priority,
    checklist,
    toggleChecklist() {
      this.checklist = !this.checklist;
    }
  };
}