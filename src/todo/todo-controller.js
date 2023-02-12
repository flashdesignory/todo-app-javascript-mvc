import { useRouter } from "./use-router.js";

export class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.router = useRouter();

    this.update = this.update.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeCompletedItems = this.removeCompletedItems.bind(this);

    this.view.bindCallback("onSubmit", this.addItem);
    this.view.bindCallback("onToggle", this.toggleItem);
    this.view.bindCallback("onUpdate", this.updateItem);
    this.view.bindCallback("onDelete", this.removeItem);
    this.view.bindCallback("onClear", this.removeCompletedItems)

    this.router.initRouter(this.update);
  }

  update() {
    this.view.update(this.model.getTodos(), this.router.getRoute());
  }

  addItem(task) {
    const todo = this.model.addItem(task);
    this.view.addItem({ todo });
    this.update();
  }

  toggleItem(id) {
    this.model.toggleItem(id);
    this.update();
  }

  updateItem(id, task) {
    this.model.updateItem(id, task);
    this.update();
  }

  removeItem(id) {
    this.model.removeItem(id);
    this.update();
  }

  removeCompletedItems() {
    this.model.removeCompletedItems();
    this.update();
  }
}
