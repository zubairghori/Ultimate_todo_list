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
    let todoListCards = document.getElementById('todoListCards');
    todoListCards.innerHTML = "";
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .openCursor()
        .onsuccess = (e) => {
            let cursor = e.target.result;
            console.log(cursor);
            if (cursor) {
                $(document).ready(function () {
                    $('.floating-action-btn').floatingActionButton();
                });
                todoListCards.innerHTML +=
                    `
                <div class"container">

                <div class="row">
                <div class="col s6 m12 l12">
                <div class="card grey lighten-5">
                 

                <div class="card-content black-text z-depth-4 hoverable">
                <span class="card-title">
                    <h5>${cursor.value.title}</h5>
                </span>
                <h6>${cursor.value.description}</h6>

                <!-- Floating Action Button at the end of card-->

                <div class="floating-action-btn">
                    <a class="btn-floating btn-small blue-grey lighten-2 right">
                        <i class="large material-icons">more_vert</i>
                    </a>
                    <ul>
                        <li>
                            <a class="btn-floating btn red right tooltipped modal-trigger" href="#modal2" data-delay="1000" data-tooltip="Edit" data-position="top">
                                <i class="material-icons">mode_edit</i>
                            </a>
                        </li>
                        <li>
                            <a onclick="deleteTodoFromDatabase(${cursor.value.id})" class="btn-floating yellow right darken-1 tooltipped" data-delay="1000" data-tooltip="Delete" data-position="top">
                                <i class="material-icons">delete</i>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        </div>
    </div>
</div>
`;
                cursor.continue();

            } else {
                console.log('No entries');
            }
        }
};

// Delete data

function deleteTodoFromDatabase(id) {
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .delete(id);
    request.onsuccess = () => {
        console.log('Todo deleted!')
        getAllFromDatabase();
    };

};
