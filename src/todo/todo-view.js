import { TodoControls } from "./components/todo-controls.js";
import { TodoFilters } from "./components/todo-filters.js";
import { TodoList } from "./components/todo-list.js";

export class TodoView {
  constructor(template, ref) {
    this.template = template;
    this.ref = ref;

    this.update = this.update.bind(this);
    this.addItem = this.addItem.bind(this);

    this.controls = new TodoControls({ ref });
    this.filters = new TodoFilters({ ref });
    this.list = new TodoList({ ref });
  }

  bindCallback(name, callback) {
    switch (name) {
      case "onSubmit":
        this.controls.bindCallback(name, callback);
        break;
      case "onToggle":
      case "onUpdate":
      case "onDelete":
        this.list.bindCallback(name, callback);
        break;
      case "onClear":
        this.filters.bindCallback(name, callback);
        break;
    }
  }

  addItem(todo) {
    this.list.add(todo);
  }

  removeCompletedItems() {
    const elementsToChange = '[data-completed="true"]';
    this.list.remove(elementsToChange);
  }

  update(todos, route) {
    this.controls.update(todos, route);
    this.filters.update(todos, route);
    this.list.update(todos, route);
  }
}
