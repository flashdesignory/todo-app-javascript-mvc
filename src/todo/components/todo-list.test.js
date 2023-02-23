import { TodoList } from "./todo-list.js";
import { emptyTodos, mixedTodos, newTodo } from "../test/data.js";
import { createBodyFragment } from "../test/fragments.js";
import { editTodoWithClick } from "../test/snippets.js";

describe("TodoList", () => {
  const getRoute = jest.fn();
  const getTodos = jest.fn();
  const onToggle = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render initial state", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    const listElement = ref.querySelector(".todo-list-ul");
    expect(listElement).toBeTruthy();
  });

  it("should only show active todos on update", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("active");
    getTodos.mockReturnValue([...mixedTodos]);

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.update(getTodos(), getRoute());

    const elements = ref.querySelectorAll('.todo-list-li[style*="display: flex"]');
    expect(elements.length).toEqual(2);
  });

  it("should only show completed todos on update", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("completed");
    getTodos.mockReturnValue([...mixedTodos]);

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.update(getTodos(), getRoute());

    const elements = ref.querySelectorAll('.todo-list-li[style*="display: flex"]');
    expect(elements.length).toEqual(1);
  });

  it("should remove completed todos from the list", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.update(getTodos(), getRoute());

    // before removal
    let elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);

    list.remove('[data-completed="true"]');

    // after removal
    elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(2);
  });

  it("should add a todo to the list", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.update(getTodos(), getRoute());

    // before removal
    let elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);

    list.add({ ...newTodo });

    // after removal
    elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(4);
  });

  it("should empty list on reset", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.update(getTodos(), getRoute());

    // before removal
    let elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);

    list.reset();

    // after removal
    elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(0);
  });

  it("should call onToggle", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.add(mixedTodos[0]);

    const toggleInput = document.querySelector(`#toggle-${mixedTodos[0].id}`);
    expect(toggleInput).toBeTruthy();
    toggleInput.click();
    expect(onToggle).toHaveBeenCalledWith(mixedTodos[0].id);
  });

  it("should call onDelete", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.add(mixedTodos[0]);

    const item = document.getElementById(`${mixedTodos[0].id}`);
    const deleteButton = item.querySelector(".todo-item-button");
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledWith(mixedTodos[0].id);
  });

  it("should call onUpdate", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    const list = new TodoList({ ref });
    list.bindCallback("onToggle", onToggle);
    list.bindCallback("onUpdate", onUpdate);
    list.bindCallback("onDelete", onDelete);

    list.add(mixedTodos[0]);

    const taskInput = document.querySelector(`#task-${mixedTodos[0].id}`);
    editTodoWithClick(taskInput, "Clean Car");
    expect(onUpdate).toHaveBeenCalledWith(mixedTodos[0].id, "Clean Car");
  });
});
