// ========== connection code =========

var database;
var request = indexedDB.open('todo_app_db', 3); // verison

request.onsuccess = function (e) {
    console.log('Database is connected Succesfully!');
    database = e.target.result;
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
    let taskDone = true;
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
        console.log('Written with e => ', e)
    };
    request.onerror = e => console.log('Error with e => ', e);

};
