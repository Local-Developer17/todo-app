import { todoList } from "../index.js";
import { input } from "../index.js";
export function renderTodo(todo) {
  const html = `<div class="to-do__item flex justify-between h-12 bg-[#25273c] border-solid border-b-2 border-[#393a4c]  todo-item">
              <div class="submit-btn flex p-1.5 border-solid border-[#393a4c] border-2 size-7 rounded-2xl mx-5 self-center hover:cursor-pointer "></div>
              <p class="text-[#d2d3db] self-center mr-auto ">${todo}</p>
              <img class="cross p-3 cursor-pointer" src="./images/icon-cross.svg" alt="cross" />
            </div>`;
  todoList.insertAdjacentHTML("afterbegin", html);

  return (input.value = "");
}
