# Todo App MVC

[![Quality Checks](https://github.com/flashdesignory/todo-app-javascript-mvc/actions/workflows/quality.yml/badge.svg)](https://github.com/flashdesignory/todo-app-javascript-mvc/actions/workflows/quality.yml)
[![Test Checks](https://github.com/flashdesignory/todo-app-javascript-mvc/actions/workflows/test.yml/badge.svg)](https://github.com/flashdesignory/todo-app-javascript-mvc/actions/workflows/test.yml)
[![pages-build-deployment](https://github.com/flashdesignory/todo-app-javascript-mvc/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/flashdesignory/todo-app-javascript-mvc/actions/workflows/pages/pages-build-deployment)

## Preview

https://flashdesignory.github.io/todo-app-javascript-mvc/

## Description

A to-do application allows a user to keep track of tasks that need to get done. The user can enter a new task, update an existing task, mark a task as completed, or delete a task. In addition to the basic CRUD operations, the TodoMVC app has some added functionality. The user can select or deselect the currently visible tasks and has the option to remove all completed tasks entirely. In addition, filters are available to change the view to “all”, “active” or “completed” tasks. A status text displays the number of active tasks to complete.

## Architectural design

This application uses JavaScript modules to create a modular system that composes visual and behavioral elements together.
A traditional MVC pattern has been implemented with class based syntax.

In gneeral a class component uses es6 class syntax, which is built upon the JavaScript prototype object that is native to JavaScript.
The prototype object can be accessed by objects through the prototype chain.

## Rendering

Static elements of the of the todo app are hard-coded in the html file to minimize parsing and creation of elements.
Dynamic elements (the todo items) are added to the list element or removed from the list element, without re-rendering the entire list.
Similarely, applying filters will toggle `display:none;` or `display:flex` of the todo items and won't rebuild the list from state.

## State Management

This application uses an in-memory object data structure for the todos.
No persistent storage has been added.

## Keyboard Navigation

As it turns out, Safari does not enable tab highlighting by default. To turn it on:

```bash
Go to “Preferences”
Select the “Advanced” tab
Check “Press Tab to highlight each item on a webpage”
```
