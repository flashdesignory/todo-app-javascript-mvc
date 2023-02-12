import { TodoModel } from "./todo-model.js";
import { TodoTemplate } from "./todo-template.js";
import { TodoView } from "./todo-view.js";
import { TodoController } from "./todo-controller.js";
import { useStorage } from "./use-storage.js";

export class TodoApp {
  constructor({ ref, data = [] }) {
    this.ref = ref;
    this.data = data;

    this.model = new TodoModel(useStorage("todos"), this.data);
    this.template = new TodoTemplate();
    this.view = new TodoView(this.template, this.ref);
    this.controller = new TodoController(this.model, this.view);
  }
}
