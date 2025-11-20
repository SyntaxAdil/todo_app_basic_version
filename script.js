// variables
const todoInput = document.getElementById("todo-input");
const todoAddBtn = document.getElementById("todo-add-btn");
const taskContainer = document.getElementById("task-container");
const noTodoMssg = document.getElementById("noTodoMssg");

// date generate
const dateVar = new Date();
let todayDate = `${dateVar.getDate()} ${dateVar.toLocaleString("en-us", {
  month: "short",
})} ${dateVar.getFullYear()}`;

// task array

let taskslist = JSON.parse(localStorage.getItem("taskslist")) || [];

//   array / tasks sort according time

taskslist.sort((a, b) => {
  let timeA = new Date(`1320-12-10 ${a.time}`);
  let timeB = new Date(`1320-12-10 ${b.time}`);
  return timeA - timeB;
});

//   show noTodo
function noTodo() {
  if (taskslist.length === 0) {
    noTodoMssg.style.display = "block";
  } else {
    noTodoMssg.style.display = "none";
  }
}

//   Add id to every task

let id = 0;
taskslist.forEach((items) => {
  if (items.id === undefined) {
    items.id = id;
    id++;
  } else {
    id = Math.max(id, items.id + 1);
  }
});

// render tasks dynamically

function renderTaks(tasks) {
  noTodo();
  taskContainer.innerHTML = tasks
    .map(
      (task) =>
        `
                <div class="todo-card"  data-id="${task.id}">
                    <h3 class="todo-title" >${task.todo}</h3>
                    <p class="todo-date"> <b class="todo-time">${task.time} </b> - ${task.date} </p>
                    <span class="todo-dlt-btn"> <i class="fa-solid fa-close"></i> </span>
                </div>

                `
    )
    .join("");
}

//   initially display all the todo
renderTaks(taskslist);

//   add todo

todoAddBtn.addEventListener("click", (e) => {
  const inputValue = todoInput.value.trim();
  if (!inputValue) {
    alert("Enter any task");
    return;
  }

  // Time update
  let currentTime = new Date().toLocaleTimeString();

  taskslist.unshift({
    todo: inputValue,
    date: todayDate,
    time: currentTime,
    id: id++,
  });
  localStorage.setItem("taskslist", JSON.stringify(taskslist));
  renderTaks(taskslist);

  document.getElementById("todo-form").reset();
});
//   key events

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    todoAddBtn.click();
  }
});

//   delete funcitonality
taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-dlt-btn")) {
    const dltTodo = Number(e.target.parentElement.getAttribute("data-id"));
    taskslist = taskslist.filter((i) => i.id !== dltTodo);
    localStorage.setItem("taskslist", JSON.stringify(taskslist));
    renderTaks(taskslist);
  }
});
