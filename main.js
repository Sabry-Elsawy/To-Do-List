var taskName = document.getElementById("Name");
var btn = document.getElementById("btn");
var display = document.getElementById("data");
var currentIndex = 0;

btn.onclick = function () {
  if (btn.innerHTML == "Add Task") {
    addTask();
  } else {
    updateTask();
  }
  clearData();
};

var list = [];
if (localStorage.getItem("tasks") != null) {
  list = JSON.parse(localStorage.getItem("tasks"));
  displayTask();
}
function addTask() {
  var task = taskName.value;
  list.push(task);
  localStorage.setItem("tasks", JSON.stringify(list));
  displayTask();
}
function displayTask() {
  var cartiona = "";
  for (var i = 0; i < list.length; i++) {
    cartiona += `
        <tr>
        <td>${list[i]}</td>
        <td>
            <button onclick="deleteTask(${i})">delete</button>
            <button onclick="getInfo(${i})">update</button>
        </td>
    </tr>`;
  }
  display.innerHTML = cartiona;
}

function clearData() {
  taskName.value = " ";
}

function deleteTask(index) {
  list.splice(index, 1);
  console.log(list);
  localStorage.setItem("tasks", JSON.stringify(list));
  displayTask();
}

function getInfo(index) {
  currentIndex = index;
  var current = list[index];
  taskName.value = current;
  btn.innerHTML = "update";
}

function updateTask() {
  var task = taskName.value;
  list[currentIndex] = task;
  localStorage.setItem("tasks", JSON.stringify(list));
  displayTask();
  btn.innerHTML = "Add Task";
}

function search(searchText) {
  var cartiona = "";
  for (var i = 0; i < list.length; i++) {
    if (list[i].toLowerCase().includes(searchText.toLowerCase())) {
      cartiona += `
            <tr>
            <td>${list[i]}</td>
            <td>
                <button    onclick="deleteTask(${i})">delete</button>
                <button   onclick="getInfo(${i})">update</button>
            </td>
        </tr>`;
    }
  }
  display.innerHTML = cartiona;
}
