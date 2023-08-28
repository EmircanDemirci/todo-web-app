var form = document.querySelector("#todo-form");
var todoInput = document.querySelector("#todo");
var todoList = document.querySelector(".list-item");
var deleteButton = document.querySelector("#delete");
var lisGroupItem = document.querySelector(".list-group-item");
eventListeners();


function eventListeners(){
    form.addEventListener("submit", onAddingTask);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    todoList.addEventListener("click" , deleteTodo);

}

function deleteTodo(e){
    if(e.target.className === "btn btn-danger"){
        var targetString ="";
        e.target.parentElement.remove();
        const etarget = e.target.parentElement.textContent.split('');
        const target = etarget.slice(0,-6).forEach(function(e){
            targetString += e;
        });
        deleteTodoFromStorage(targetString);
        showAlert("success","Deleted!");
    }


}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    })
    console.log(todos);

    localStorage.setItem("todos" , JSON.stringify(todos));
    
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}

function onAddingTask(e){

    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger" , "Please type something!");
    }
    else{
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success" , "Added!");
    }

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}


function addTodoUI(newTodo){
 /*   /*
        <li class="card-body">
            <p>Evaluate the addition and deletion of user IDs.</p>
            <a class="btn btn-danger" href="#">delete</a>
            <a class="btn btn-success" href="#">completed</a>
        </li>
    */
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.innerHTML = "delete"
    link.className = "btn btn-danger";
    link.id = "delete";

    listItem.className = "list-group-item d-flex justify-content-between p-4 text-light";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`
    alert.textContent = message;
    form.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },2000)
}