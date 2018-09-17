
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



function getAllFromDatabase() {
    let todoArray = [];
    var request = database.transaction(["allTodos"], "readwrite")
        .objectStore("allTodos")
        .openCursor()
        .onsuccess = (e) => {
            let cursor = e.target.result;
            if (cursor) {
                if (cursor.value.taskDone) {
                    console.log(cursor.value)
                    todoArray.push(cursor.value);
                }
                cursor.continue();

            } else {
                console.log('No entries');
            }
            console.log(todoArray);
            printItToDom(todoArray);
        }
};


function printItToDom(todosArray) {
    let container = document.getElementById('todoListCards');
    container.innerHTML = '';
    todosArray.map(singleItem => {
        container.innerHTML += `
        <div class"container">

                <div class="row">
                <div class="col s6 m12 l12">
                <div class="card grey lighten-5">
                 

                <div class="card-content black-text z-depth-4 hoverable">
                <span class="card-title">
                    <h5>${singleItem.title}</h5>
                </span>
                <h6>${singleItem.description}</h6>

                </div>

            </div>
        </div>

        </div>
    </div>
</div>
        `
    })

}