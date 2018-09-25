
var database;
var request = indexedDB.open('todo_app_db1', 4); // verison

request.onsuccess = function (e) {
    console.log('Database is connected Succesfully!');
    database = e.target.result;
    getAllFromDatabase();
};

request.onerror = function () {
    console.log('Some Error Occured!');
};


//Read All Data

function getAllFromDatabase() {
    let todoArray = [];
    let completedTask = [];
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .openCursor()
        .onsuccess = (e) => {


            let cursor = e.target.result;
            if (cursor) {
                let newTodoObject = {
                    id: cursor.value.id,
                    title: cursor.value.title,
                    description: cursor.value.description,
                    status: cursor.value.taskDone
                };
                todoArray.push(newTodoObject);
                cursor.continue();
            }
            PrintToDom(todoArray)
        }

};

// ===== Printing to DOM ===== 

function PrintToDom(docs) {
    localStorage.setItem("todoArray", JSON.stringify(docs));
    let finishedTaskContainer = document.getElementById('finishedTask')
    let upcomingTaskContainer = document.getElementById('upcomingTask');
    document.getElementById('finishedTask').innerHTML = "";
    let completedTodo = [];
    let unCompletedTodo = [];
    docs.map(item => {

        if (item.status) {
            completedTodo.push(item);
        } 
    })
console.log(completedTodo);
    // FINISHED TASKS

    if (completedTodo.length > 0) {
        completedTodo.map((item) => {
            $(document).ready(function () {
                $('.tooltipped').tooltip();
            });
            finishedTaskContainer.innerHTML += `
    
                <div class="card1 cyan lighten-1">
                    <span class="outer white-text" style="text-decoration: line-through;">
                        <h5 class="card1-h5 white-text">${item.title}</h5>
                    </span>
                    <div class="decriptionHeadeing white-text" style="width: auto; text-decoration: line-through;">
                        ${item.description}
                        </div>
                        <div class="decriptionHeadeing btn-margin">
                        <button onclick="setIdToLocalStorage(${item.id})" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                            data-position="top">
                            <i class="material-icons">mode_edit</i>
                        </button>
                        <button onclick="deleteTodoFromDatabase(${item.id})" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
                            data-position="top">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
        `
        })
    } else {
        finishedTaskContainer.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO FINISHED TASK...</div>`
    }
}
