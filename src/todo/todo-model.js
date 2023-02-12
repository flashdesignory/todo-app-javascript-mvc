// eslint-disable-next-line no-unused-vars
import { Todo, Partial, Storage } from "./types.js";

/**
 * Function that returns a unique string.
 *
 * @returns {string} A unique id.
 */
const uuid = () => crypto.randomUUID();

/**
 * Function that creates a todo, based on the task input.
 *
 * @param {string} task
 * @returns {Todo} A Todo item.
 */
const create = (task) => ({
  id: uuid(),
  task,
  completed: false,
});

/**
 * Function that updates a todo with a Partial.
 *
 * @param {Todo} item
 * @param {Partial} partial
 * @returns {Todo} A Todo item.
 */
const update = (item, { task, completed }) => ({
  ...item,
  task: task === undefined ? item.task : task,
  completed: completed === undefined ? item.completed : completed,
});

export class TodoModel {
  /**
   * @param {Storage} storage
   * @param {Array<Todo>} initialTodos
   */
  constructor(storage, initialTodos = []) {
    this.storage = storage;

    // assign initial todos, if passed in
    initialTodos.forEach((todo) => this.storage.setValue(todo.id, todo));

    // bindings
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.removeCompletedItems = this.removeCompletedItems.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

  /**
   * Create a new todo and add to state.
   *
   * @param {string} task
   * @returns {Todo} A Todo item.
   */
  addItem(task) {
    const todo = create(task);
    this.storage.setValue(todo.id, todo);
    return todo;
  }
  /**
   * Update a todo with given input.
   *
   * @param {string} id
   * @param {string} task
   * @returns {Todo | undefined} A Todo item.
   */
  updateItem(id, task) {
    let todo = this.storage.getValue(id);
    if (!todo) return;

    todo = update(todo, { task });
    this.storage.setValue(todo.id, todo);
    return todo;
  }

  /**
   * Remove a Todo from local state.
   *
   * @param {string} id
   * @returns {Todo | undefined} A Todo item.
   */
  removeItem(id) {
    const todo = this.storage.deleteValue(id);
    return todo;
  }

  /**
   * Togles a Todo's complete flag.
   *
   * @param {string} id
   * @returns {Todo | undefined} A Todo item.
   */
  toggleItem(id) {
    let todo = this.storage.getValue(id);
    if (!todo) return;

    todo = update(todo, { completed: !todo.completed });
    this.storage.setValue(todo.id, todo);
    return todo;
  }

  /**
   * Removes all items.
   */
  removeAllItems() {
    this.storage.removeAllValues();
  }

  /**
   * Removes all completed items.
   */
  removeCompletedItems() {
    this.getTodos().forEach((todo) => {
      if (todo.completed) this.storage.deleteValue(todo.id);
    });
  }

  /**
   *
   * @returns {Array.<Todo>} A copy of the state.
   */
  getTodos() {
    return [...this.storage.getAllValues()];
  }
}
