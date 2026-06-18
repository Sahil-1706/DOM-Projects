# Task Manager Application

## Overview

A Task Manager Application built using HTML, CSS, and Vanilla JavaScript. The application allows users to manage their tasks efficiently with features like task creation, editing, deletion, completion tracking, filtering, searching, theme switching, and local storage persistence.

---

## Features

* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as Completed or Pending
* Search tasks by title or description
* Filter tasks by status
* Filter tasks by category
* Dark / Light theme toggle
* Local Storage support

---

## Browser Rendering Pipeline

When a browser loads a webpage, it follows these steps:

```text
HTML
 ↓
Parsing
 ↓
Tokenization
 ↓
DOM Tree

CSS
 ↓
Parsing
 ↓
CSSOM Tree

DOM Tree + CSSOM Tree
 ↓
Render Tree
 ↓
Layout
 ↓
Paint
```

### DOM Tree

The browser parses HTML and creates a tree-like structure called the DOM (Document Object Model).

### CSSOM Tree

The browser parses CSS and creates a CSS Object Model containing all styles.

### Render Tree

The DOM Tree and CSSOM Tree are combined to create the Render Tree, which is used to display elements on the screen.

---

## DOM Manipulation Used

The application dynamically updates the UI using:

* `querySelector()`
* `addEventListener()`
* `classList`
* `innerHTML`
* Dynamic rendering of task cards

---

## Local Storage

Tasks and theme preferences are stored in Local Storage so that data remains available after refreshing the page.

Example:

```js
localStorage.setItem("tasksList", JSON.stringify(tasksArr));
localStorage.getItem("tasksList");
```

---

## How to Run

1. Clone the repository.
2. Open the project folder.
3. Run `index.html` in your browser.

---

## Author

Sahil Anurag
