export const todoList = document.querySelector(".to-do");
export const input = document.getElementsByTagName("input")[0];
const form = document.querySelector("form");
const categories = [...document.querySelector(".categories").children];
const main = document.querySelector(".main");
const state = document.querySelector(".state");

categories.forEach((child) => child.classList.add("cursor-pointer"));
import { renderTodo } from "./node-modules/renderTodo(todo).js";

class Item {
  constructor(content, isCompleted) {
    this.content = content;
    this.isCompleted = isCompleted;
  }
}

class App {
  allTodos = JSON.parse(localStorage.getItem("todos")) || [];
  constructor() {
    form.onsubmit = this.getInput.bind(this);
    main.onclick = this.checkBtn.bind(this);
    todoList.onclick = this.removeTodo.bind(this);
    state.onclick = this.stateful.bind(this);
    this.allTodos.forEach((todo) => renderTodo(todo.content));
    this.checkBox();
    this.itemsLeft(this.allTodos.filter((todo) => !todo.isCompleted).length);
  }
  getInput(e) {
    e.preventDefault();
    if (input.value == "") return alert("Please Input a value");
    else this.createTodo(input.value);
  }
  removeTodo(e) {
    e.preventDefault();
    const cross = e.target.closest(".cross");
    if (!cross) return;
    const todoP = e.target.previousElementSibling.textContent;
    todoList.removeChild(cross.parentNode);
    const curIndex = this.allTodos.findIndex((todo) => todo.content == todoP);
    this.allTodos.splice(curIndex, 1);
    this.itemsLeft(this.allTodos.filter((todo) => !todo.isCompleted).length);
    return localStorage.setItem("todos", JSON.stringify(this.allTodos));
  }
  createTodo(value) {
    this.todo = new Item(value, false);
    this.allTodos.push(this.todo);
    this.itemsLeft(this.allTodos.filter((todo) => !todo.isCompleted).length);
    renderTodo(this.todo.content);
    localStorage.setItem("todos", JSON.stringify(this.allTodos));
    return document.querySelector(".submit-btn").classList.add("cursor-pointer");
  }
  checkBtn(e) {
    e.preventDefault();
    const submitBtn = e.target.closest(".submit-btn");

    if (!submitBtn) return;
    //check:
    const check = document.createElement("img");
    check.setAttribute("src", "./images/icon-check.svg");
    ["bg-gradient-to-r", "from-[#57ddff]", "to-[#c058f3]"].forEach((cl) => submitBtn.classList.add(cl));
    const todoP = e.target.nextElementSibling?.textContent;
    const checked = document.createElement("s");
    ["self-center", "mr-auto", "text-[#4d5066]"].forEach((cl) => checked.classList.add(cl));
    checked.textContent = todoP;
    e.target.nextElementSibling.appendChild(document.createElement("s"));
    const curTodo = this.allTodos.find((todo) => todo?.content == todoP);
    if (curTodo) curTodo.isCompleted = true;
    submitBtn.children.length == 0 && submitBtn.appendChild(check);
    this.itemsLeft(this.allTodos.filter((todo) => !todo.isCompleted).length);
    submitBtn.style.pointerEvents = "none";
    e.target.nextElementSibling.replaceWith(checked);
    return localStorage.setItem("todos", JSON.stringify(this.allTodos));
  }
  clearToDo(input) {
    input == 2 && document.querySelectorAll(".to-do__item").forEach((todo) => todoList.removeChild(todo));
    if (input == 1) {
      this.clearToDo(2);
      this.allTodos = this.allTodos.filter((todo) => !todo.isCompleted);
      return this.allTodos.forEach((todo) => renderTodo(todo.content));
    }
  }
  stateful(e) {
    if (!e.target) return;

    //Completed Button:
    if (e.target.closest(".completed")) {
      if (this.allTodos.filter((todo) => todo.isCompleted).length == 0) return;
      this.clearToDo(2);
      this.allTodos.forEach((todo) => todo.isCompleted && renderTodo(todo.content));
      return this.checkBox();
    }
    //Activate Button:
    if (e.target.closest(".active")) {
      if (this.allTodos.filter((todo) => !todo.isCompleted).length == 0) return;
      this.clearToDo(2);
      this.allTodos.forEach((todo) => !todo.isCompleted && renderTodo(todo.content));
    }
    //All Button:
    if (e.target.closest(".all")) {
      if (this.allTodos.length == 0) return;
      this.clearToDo(2);
      this.allTodos.forEach((todo) => renderTodo(todo.content));
      return this.checkBox();
    }
    //Clear Button:
    e.target.closest(".clear") && this.clearToDo(1);
  }
  itemsLeft(items) {
    document.querySelector(".items").textContent = `${items} items left`;
  }
  checkBox() {
    return document.querySelectorAll(".submit-btn").forEach((btn) => {
      const todo = this.allTodos.find((td) => btn.nextElementSibling.textContent == td.content);
      const checked = document.createElement("s");
      ["self-center", "mr-auto", "text-[#4d5066]"].forEach((cl) => checked.classList.add(cl));
      checked.textContent = btn.nextElementSibling.textContent;
      if (todo.isCompleted) {
        const check = document.createElement("img");
        check.setAttribute("src", "./images/icon-check.svg");
        btn.appendChild(check);
        ["bg-gradient-to-r", "from-[#57ddff]", "to-[#c058f3]"].forEach((cl) => btn.classList.add(cl));
        btn.style.pointerEvents = "none";
        btn.nextElementSibling.replaceWith(checked);
        return localStorage.setItem("todos", JSON.stringify(this.allTodos));
      } else return;
    });
  }
}

const app = new App();
