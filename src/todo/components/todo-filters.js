export class TodoFilters {
  constructor({ ref }) {
    this.ref = ref;

    // refs
    this.filters = this.ref.querySelector(".todo-filters");
    this.statusDisplay = this.ref.querySelector(".todo-status");
    this.clearButton = this.ref.querySelector(".todo-clear-button");
    this.filterButtons = [...this.ref.querySelectorAll(".todo-navigation > li > a")];

    // bindings
    this.handleClick = this.handleClick.bind(this);

    // add listeners
    this.clearButton.addEventListener("click", this.handleClick);
  }

  bindCallback(name, callback) {
    switch (name) {
      case "onClear":
        this.onClear = callback;
        break;
    }
  }

  // handlers
  handleClick() {
    this.onClear();
  }

  // methods
  update(todos, route) {
    // hide filters if there are no todos
    if (todos.length <= 0) {
      this.filters.classList.add("hidden");
      this.statusDisplay.textContent = "0 items left!";
      this.clearButton.disabled = true;
      return;
    }

    // show filters
    this.filters.classList.remove("hidden");

    this.filterButtons.forEach((button) => {
      const filterName = button.href.split("/").slice(-1)[0];
      filterName === route ? button.classList.add("selected") : button.classList.remove("selected");
    });

    // update status text
    const activeTodos = todos.filter((todo) => !todo.completed);
    this.statusDisplay.textContent = `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`;

    // update clearButton
    this.clearButton.disabled = activeTodos.length === todos.length;
  }
}
