import { TodoItem } from "./todo-item.js";

export class TodoList {
  constructor({ ref }) {
    this.ref = ref;

    // refs
    this.list = ref.querySelector(".todo-list-ul");

    // handlers
    this.handleToggle = this.handleToggle.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  bindCallback(name, callback) {
    switch (name) {
      case "onToggle":
        this.onToggle = callback;
        break;
      case "onUpdate":
        this.onUpdate = callback;
        break;
      case "onDelete":
        this.onDelete = callback;
        break;
    }
  }

  // handlers
  handleToggle(id) {
    this.onToggle(id);
  }

  handleUpdate(id, task) {
    this.list.focus();
    this.onUpdate(id, task);
  }

  handleDelete(id) {
    document.getElementById(id).remove();
    this.onDelete(id);
  }

  // methods
  createItem(todo) {
    return TodoItem({
      todo,
      onToggle: this.handleToggle,
      onUpdate: this.handleUpdate,
      onDelete: this.handleDelete,
    });
  }

  update(todos, route) {
    // update todos to show (depending on filter)
    todos.forEach((todo) => {
      const element = document.getElementById(todo.id);
      let shouldShow = true;
      switch (route) {
        case "active":
          shouldShow = !todo.completed;
          break;
        case "completed":
          shouldShow = todo.completed;
          break;
        default:
          shouldShow = true;
      }

      // update task if it changed
      if (element.dataset.task !== todo.task) {
        element.dataset.task = todo.task;
      }

      element.style.display = shouldShow ? "flex" : "none";
    });
  }

  reset() {
    this.list.replaceChildren();
  }

  remove(filter) {
    const elementsToRemove = [...this.ref.querySelectorAll(filter)];
    elementsToRemove.forEach((element) => element.remove());
  }

  add(todo) {
    this.list.prepend(this.createItem(todo));
  }
}
