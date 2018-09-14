
// ========== connection code =========

var database;
var request = indexedDB.open('todo_app_db', 3); // verison

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

function addToDatabase(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
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

function getAllFromDatabase() {
    let table = document.getElementById('todoTable');
    table.innerHTML = "";
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .openCursor()
        .onsuccess = (e) => {
            let cursor = e.target.result;
            if (cursor) {
                table.innerHTML +=
                    `
                        <tr> 
                            <td>${cursor.value.id}</td>   
                            <td colspan="3">${cursor.value.title}</td>
                            <td>${cursor.value.description}</td>
                            <td>
                                <span>
                                    <button onClick="updateDoneStatus(${cursor.value.id})" class="btn btn-success mt-2">
                                    <i class="fa fa-check-circle"></i>
                                    </button>
                                    <button class="btn btn-warning mt-2" onClick="triggerModel(${cursor.value.id});">
                                        <i class="fa fa-pen"></i>
                                    </button>
                                    <button onClick="deleteTodoFromDatabase(${cursor.value.id})" class="btn btn-danger mt-2">
                                        <i class="fa fa-trash-alt"></i>
                                    </button>
                                </span>
                            </td>
                        </tr>
                `;
                cursor.continue();

            } else {
                console.log('No entries');
            }
        }

};

function deleteTodoFromDatabase(id) {
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .delete(id);
    request.onsuccess = () => {
        console.log('Todo deleted!')
        getAllFromDatabase();
    };

};

// function updateATodoInDatabase() {
//     // console.log(e);
//     // e.preventDefault();
//     let id = localStorage.getItem('todoToUpdate');
//     var objectStore = database.transaction(["allTodos"], "readwrite")
//         .objectStore("allTodos");
//     const myDesiredObject = objectStore.get(id);
//     myDesiredObject.onerror = e => console.log('error');

//     myDesiredObject.onsuccess = e => {
//         let updatedDescription = document.getElementById("updateDescription").value;
//         let updatedTitle = document.getElementById("updateTitle").value;

//         todo = e.target.result;
//         console.log(todo);
//         todo.taskDone = true;
//         const requestUpdate = objectStore.put(todo);
//         requestUpdate.onsuccess = e => {
//             getAllFromDatabase();
//         };
//         requestUpdate.onerror = e => console.log('Some error!');
//     }


//     let todoId = localStorage.getItem("todoToUpdate");
//     console.log(todoId);

// };

function updateDoneStatus(id) {
    var objectStore = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos");
    const myDesiredObject = objectStore.get(id);

    myDesiredObject.onerror = e => console.log('error');

    myDesiredObject.onsuccess = e => {
        todo = e.target.result;
        console.log(todo);
        todo.taskDone = true;
        const requestUpdate = objectStore.put(todo);
        requestUpdate.onsuccess = e => {
            getAllFromDatabase();
        };
        requestUpdate.onerror = e => console.log('Some error!');
    }
}

function triggerModel(id) {
    localStorage.setItem("todoToUpdate", id);
    $('#updateModal').modal('show');

}
