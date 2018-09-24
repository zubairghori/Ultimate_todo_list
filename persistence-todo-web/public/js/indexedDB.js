// ========== connection code =========

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

// ============ creating a store ============ 

request.onupgradeneeded = function (e) {
    database = e.target.result;
    if (!database.objectStoreNames.contains('allTodos')) {
        var os = database.createObjectStore('allTodos', { keyPath: "id", autoIncrement: true })
    };
};

// ============ event handlers ==============

document.getElementById('AddTodoForm').addEventListener('submit', addToDatabase);

// ========= Functions =========


//Add Data

function addToDatabase(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    let taskDone = false;
    const todo = {
        title,
        description,
        taskDone
    };

    //  writing to DB

    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .add(todo);

    request.onsuccess = e => {
        getAllFromDatabase();
        console.log('Written with e => ', e)
    };
    request.onerror = e => console.log('Error with e => ', e);

};

//Read All Data

function getAllFromDatabase() {
    let todoArray = [];
    let completedTask = [];
    let unCompletedTask = [];
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
    document.getElementById('upcomingTask').innerHTML = "";
    document.getElementById('finishedTask').innerHTML = "";
    let completedTodo = [];
    let unCompletedTodo = [];
    docs.map(item => {

        if (item.status) {
            completedTodo.push(item);
        } else {
            unCompletedTodo.push(item);
        }
    })

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

// UPCOMING TASKS

    if (unCompletedTodo.length > 0) {

        unCompletedTodo.map((item) => {
            $(document).ready(function () {
                $('.tooltipped').tooltip();
            });

            upcomingTaskContainer.innerHTML += ` 

            <div class="card2">
                <h5 class="card2-h5">${item.title}</h5>
                <div class="decriptionHeadeing" style="width: auto">${item.description}</div>
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
        `;
        })
    } else {
        upcomingTaskContainer.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO UPCOMING TASK...
        </div>`
    }

}

// Delete data

function deleteTodoFromDatabase(id) {
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .delete(id);
    request.onsuccess = () => {
        getAllFromDatabase();
    };

};

// Update data

function updateATodoInDatabase() {

    let id = localStorage.getItem('todoToUpdate');
    var objectStore = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos");
    const myDesiredObject = objectStore.get(Number(id));
    myDesiredObject.onerror = e => console.log('error');

    myDesiredObject.onsuccess = function (event) {

        let updatedDescription = document.getElementById("updateDescription").value;
        let updatedTitle = document.getElementById("updateTitle").value;
        let doneStatus = document.getElementById('checkbox');
        document.getElementById("updateDescription").value = "";
        document.getElementById("updateTitle").value = "";

        todo = event.target.result;
        todo.title = updatedTitle;
        todo.description = updatedDescription;
        todo.taskDone = doneStatus.checked ? true : false;

        const requestUpdate = objectStore.put(todo);
        requestUpdate.onsuccess = e => {
            getAllFromDatabase();
        };
        requestUpdate.onerror = e => console.log('Some error!');
    }
};

function setIdToLocalStorage(id) {
    localStorage.setItem("todoToUpdate", id);
    const todoArray = JSON.parse(localStorage.getItem('todoArray'));
    const ourDesiredTodo = todoArray.filter(item => item.id === Number(id));
    if (ourDesiredTodo) {
        document.getElementById('updateTitle').value = ourDesiredTodo[0].title;
        document.getElementById('updateDescription').value = ourDesiredTodo[0].description;
        localStorage.setItem('id', id);
    };
}