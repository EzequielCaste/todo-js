const todoList = document.querySelector("#todo-list");
const userInput = document.querySelector("#input");

let todoArray = JSON.parse(localStorage.getItem("todos")) || [
  {
    text: "Take out the trash",
    isComplete: false
  },
  {
    text: "Read one chapter",
    isComplete: false
  }
];

function Todo(item) {
  this.text = item;
  this.isComplete = false;  
}

renderList();

function renderList() {
  todoArray.forEach((element, i) => {
    createNode(element, i);
  });
}

function setComplete(id) {
  event.target.classList.toggle("task-complete");
  todoArray[id].isComplete = !todoArray[id].isComplete;
  saveToLocalStorage();  
}

function createNode(todo, index) {
   
  let newLi = document.createElement("li");
  newLi.setAttribute("id", index);

  let textDiv = document.createElement("div");
  textDiv.setAttribute("onclick", `setComplete(${index})`);
  let btnDiv = document.createElement("div");

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("onclick", `deleteTodo(${index})`);
  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
  let editBtn = document.createElement("button");
  editBtn.innerHTML = "<i class='far fa-edit'></i>";
  editBtn.setAttribute("onclick", `openEdit(${index})`);

  textDiv.innerText = todo.text;
  todo.isComplete ? textDiv.classList.add("task-complete") : null
  btnDiv.appendChild(deleteBtn);  
  btnDiv.appendChild(editBtn);

  newLi.appendChild(textDiv);
  newLi.appendChild(btnDiv);

  todoList.appendChild(newLi);
}

function addTodo() {  
  let todo = new Todo(userInput.value);
  todoArray.push(todo);  
  createNode(todo, todoArray.length-1);
  saveToLocalStorage();
  userInput.value = "";
}
function deleteTodo(id) {
  document.getElementById(id).remove();
  
  todoArray.splice(id, 1)
  //id == 0 ? todoArray.splice(id, 1) : todoArray.splice(id-1, 1)
  saveToLocalStorage();
}



function saveToLocalStorage() {  
  localStorage.setItem("todos", JSON.stringify(todoArray))
}

const modal = document.getElementById("myModal");
const editButton = document.querySelector("#edit");
const cancelButton = document.querySelector("#cancel");
const newText = document.querySelector("#edit-text");

cancelButton.addEventListener("click", closeModal);
editButton.addEventListener("click", function() {
  const index = newText.getAttribute("name");
  todoArray[index].text = newText.value;
  closeModal();
  saveToLocalStorage();
  document.querySelectorAll("li").forEach(node => node.remove())
  renderList();
  
} );

function openEdit(id) {
  modal.style.display = "block";  
  newText.value = todoArray[id].text;    
  newText.setAttribute("name", id)
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}
function closeModal() {
  modal.style.display = "none";
}