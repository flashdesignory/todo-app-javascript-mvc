import { useSanitizer } from "./use-sanitizer.js";
import { useValidators } from "./use-validators.js";

export class TodoView {
  constructor(template, ref) {
    this.template = template;
    this.ref = ref;

    this.sanitizer = useSanitizer();
    this.validators = useValidators();

    this.form = this.ref.querySelector(".todo-form");
    this.list = this.ref.querySelector(".todo-list-ul");
    this.toggle = this.ref.querySelector("#todo-toggle-element");
    this.filters = this.ref.querySelector(".todo-filters");
    this.statusDisplay = this.ref.querySelector(".todo-status");
    this.clearButton = this.ref.querySelector(".todo-clear-button");
    this.filterButtons = [...this.ref.querySelectorAll(".todo-navigation > li > a")];

    this.update = this.update.bind(this);
    this.addItem = this.addItem.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.form.addEventListener("submit", this.handleSubmit);
    this.toggle.addEventListener("change", this.handleChange);
    this.clearButton.addEventListener("click", this.handleClick);
  }

  bindCallback(name, callback) {
    switch (name) {
      case "onSubmit":
        this.onSubmit = callback;
        break;
      case "onToggle":
        this.onToggle = callback;
        break;
      case "onUpdate":
        this.onUpdate = callback;
        break;
      case "onDelete":
        this.onDelete = callback;
        break;
      case "onClear":
        this.onClear = callback;
        break;
    }
  }

  // handlers
  handleSubmit(e) {
    // trim whitespaces
    const value = e.target.elements["todo-input-element"].value.trim();
    e.preventDefault();

    // enforce 2 chars min
    if (!this.validators.hasValidMin(value, 2)) return;

    // sanitize input and submit
    this.onSubmit(this.sanitizer.sanitize(value));

    e.target.reset();
  }

  handleChange = (e) => {
    // since view doesn't hold data in state, we need to query the DOM.
    const elementsToChange = e.target.checked ? '[data-completed="false"]' : '[data-completed="true"]';
    this.ref.querySelectorAll(elementsToChange).forEach((element) => this.ref.querySelector(`#toggle-${element.id}`).click());
  };

  handleClick() {
    const elementsToChange = '[data-completed="true"]';
    this.ref.querySelectorAll(elementsToChange).forEach((element) => element.remove());
    this.onClear();
  }

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

  addItem({ todo }) {
    const item = this.template.addItem({
      todo,
      onToggle: this.handleToggle,
      onUpdate: this.handleUpdate,
      onDelete: this.handleDelete,
    });

    this.list.prepend(item);
  }

  update(todos, route) {
    // hide toggle and filters if there are no todos
    if (todos.length <= 0) {
      this.toggle.checked = false;
      this.toggle.parentElement.classList.add("hidden");

      this.filters.classList.add("hidden");
      this.statusDisplay.textContent = "";
      return;
    }

    // show toggle and filters and update toggle state
    const visibleTodos = todos.filter((todo) => {
      if (route === "active") return !todo.completed;
      if (route === "completed") return todo.completed;
      return todo;
    });

    this.toggle.disabled = visibleTodos.length === 0;
    this.toggle.checked = visibleTodos.length > 0 && visibleTodos.every((todo) => todo.completed);
    this.toggle.parentElement.classList.remove("hidden");

    // show filters
    this.filters.classList.remove("hidden");

    this.filterButtons.forEach((button) => {
      const filterName = button.href.split("/").slice(-1)[0];
      filterName === route ? button.classList.add("selected") : button.classList.remove("selected");
    });

    // update status text
    const activeTodos = todos.filter((todo) => !todo.completed);
    this.statusDisplay.textContent = `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`;

    // decide which todos to show
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
      element.style.display = shouldShow ? "flex" : "none";
    });
  }
}
