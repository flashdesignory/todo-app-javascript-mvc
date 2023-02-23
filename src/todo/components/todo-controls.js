import { useSanitizer } from "../hooks/use-sanitizer.js";
import { useValidators } from "../hooks/use-validators.js";

export class TodoControls {
  constructor({ ref }) {
    this.ref = ref;

    this.sanitizer = useSanitizer();
    this.validators = useValidators();

    // refs
    this.form = this.ref.querySelector(".todo-form");
    this.toggle = this.ref.querySelector("#todo-toggle-element");

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // add listeners
    this.form.addEventListener("submit", this.handleSubmit);
    this.toggle.addEventListener("change", this.handleChange);
  }

  bindCallback(name, callback) {
    switch (name) {
      case "onSubmit":
        this.onSubmit = callback;
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

  handleChange(e) {
    const elementsToChange = e.target.checked ? '[data-completed="false"]' : '[data-completed="true"]';
    this.ref.querySelectorAll(elementsToChange).forEach((element) => this.ref.querySelector(`#toggle-${element.id}`).click());
  }

  // methods
  update(todos, route) {
    // hide toggle if there are no todos
    if (todos.length <= 0) {
      this.toggle.checked = false;
      this.toggle.parentElement.classList.add("hidden");
      return;
    }

    // show toggle and update toggle state
    const visibleTodos = todos.filter((todo) => {
      if (route === "active") return !todo.completed;
      if (route === "completed") return todo.completed;
      return todo;
    });

    this.toggle.disabled = visibleTodos.length === 0;
    this.toggle.checked = visibleTodos.length > 0 && visibleTodos.every((todo) => todo.completed);
    this.toggle.parentElement.classList.remove("hidden");
  }
}
