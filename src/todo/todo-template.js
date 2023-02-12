import { TodoItem } from "./todo-item.js";
export class TodoTemplate {
  addItem({ todo, onToggle, onUpdate, onDelete }) {
    const item = TodoItem({ todo, onToggle, onUpdate, onDelete });
    return item;
  }
}
