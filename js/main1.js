let todoList = {
  todos: JSON.parse(localStorage.getItem("todos")) || [
    {
      todoText: "Take out the trash",
      completed: false
    },
    {
      todoText: "Read one chapter",
      completed: false
    }
  ],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleComplete: function(position) {
    this.todos[position].completed = !this.todos[position].completed;
  },
  toggleAll: function() {
    let completedTodos = 0;
    let totalTodos = this.todos.length;

    this.todos.forEach( todo => {
      todo.completed ? completedTodos++ : null
    })

    this.todos.forEach( todo => {
      if( completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    })
  }
}

const handlers = {  
  addTodo: function() {
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    views.displayTodos();    
  },
  showEditModal: function(position) {
    modal.style.display = "block";

    const newText = document.querySelector("#edit-text");
    newText.value = todoList.todos[position].todoText; 

    const button = document.getElementById("edit");
    button.addEventListener("click", function() {
      
    todoList.changeTodo(position, newText.value)
    handlers.closeModal();
    views.displayTodos();
    });
  }, 
  deleteTodo: function(position) {    
    todoList.deleteTodo(position);    
    views.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedInput = document.getElementById("toggleCompletedInput");
    todoList.toggleComplete(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = "";
    views.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    views.displayTodos();
  },
  closeModal: function() {
    modal.style.display = "none";
  },
  updateSavedData: function() {
    localStorage.setItem("todos", JSON.stringify(todoList.todos))
  }
}

const views = {
  displayTodos: function() {
    let todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";

    todoList.todos.forEach( (todo, i) => {     
      let newLi = document.createElement("li");
      newLi.id = i;            
      newLi.appendChild(this.createDiv(todo));
      newLi.appendChild(this.createDeleteButton());
      newLi.appendChild(this.createEditButton());
      todoUl.appendChild(newLi);
    }, this);
    handlers.updateSavedData();
  },
  createDiv: function(todo) {
    let div = document.createElement("div");      
    div.textContent = todo.todoText;

    div.addEventListener("click", function() {
      this.classList.toggle("task-complete")
      todo.completed = !todo.completed;      
      handlers.updateSavedData();
    });
    
    if( todo.completed ) {
      div.classList.add("task-complete");        
    } else {
      div.classList.remove("task-complete");       
    }

    return div;
  },
  createDeleteButton: function() {
    let button = document.createElement("i");
    button.classList = "deleteButton fas fa-trash-alt" 
    return button;
  },
  createShowEditModal: function() {
    let button = document.createElement("i");
    button.classList = "showEditModal far fa-edit" 
    return button;
  },
  createEditButton: function() {
    let button = document.createElement("i");
    button.classList = "showEditModal far fa-edit" 
    return button;
  },
  setUpEventListeners: function() {
    let todoUl = document.querySelector("ul");
    todoUl.addEventListener("click", function(event) {
      const elementClicked = event.target;

      if( elementClicked.className.includes("deleteButton")) {        
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if( elementClicked.className.includes("showEditModal") ) {       
        handlers.showEditModal(parseInt(elementClicked.parentNode.id))
      }
    })
  }  
}

views.setUpEventListeners();
views.displayTodos();

const modal = document.getElementById("myModal");

window.onclick = function(event) {
  if (event.target == modal) {
    handlers.closeModal();
  }
}
