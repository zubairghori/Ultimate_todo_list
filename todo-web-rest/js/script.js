document.addEventListener("DOMContentLoaded", ready);
var todoArray = [];

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registered successfully with scope: ', registration.scope);
    }).catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

function ready() {
    DataFromServer()
}

function DataFromServer() {
    // getData(todoArray);
    fetch('https://rest-nosql.herokuapp.com/todo/api/v1/tasks', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((formData) => {
            formData.json().then(data => {
                console.log("alldata", data.result[0])
                this.todoArray = data.result
                getData(this.todoArray)
            })
        })
        .catch(err => {
            console.log(err);
        });
}


let getData = (todoArray) => {
    let completedTask = [];
    let unCompletedTask = [];
    for (var i = 0; i < todoArray.length; i++) {
        if (todoArray[i]['task_done'] === "false") {
            unCompletedTask.push(todoArray[i]);
        } else {
            completedTask.push(todoArray[i]);
        }
    }
    console.log("unCompletedTaska:", unCompletedTask)
    console.log("completedTask:", completedTask)

    printToUpcomingTask(unCompletedTask);
    printToFinishedTask(completedTask);

}

// ===== Printing to DOM ===== 

let printToUpcomingTask = (doc) => {
    let todoListCards = document.getElementById('upcomingTask');
    document.getElementById('upcomingTask').innerHTML = "";
    if (doc.length > 0) {

        doc.map((item) => {
            $(document).ready(function () {
                $('.tooltipped').tooltip();
            });
            console.log(item);

            todoListCards.innerHTML += ` 

            <div class="card2">
                <h5 class="card2-h5">${item.task_title}</h5>
                <div class="decriptionHeadeing" style="width: auto">${item.task_description}</div>
                <div class="decriptionHeadeing btn-margin">
                    <button onclick="setIdToLocalStorage('${item.task_id}')" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                        data-position="top">
                        <i class="material-icons">mode_edit</i>
                    </button>
                    <button onclick="deleteThisTaskFromDatabase('${item.task_id}')" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
                        data-position="top">
                        <i class="material-icons">delete</i>
                    </button> 
                </div>
            </div>
        `;
        })
    } else {
        todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO UPCOMING TASK...
        </div>`
    }


}

let printToFinishedTask = (doc) => {
    let todoListCards = document.getElementById('finishedTask');
    document.getElementById('finishedTask').innerHTML = "";

    if (doc.length > 0) {
        doc.map((item) => {
            todoListCards.innerHTML += `
    
                                <div class="card1 cyan lighten-1">
                                    <span class="outer white-text" style="text-decoration: line-through;">
                                        <h5 class="card1-h5 white-text">${item.task_title}</h5>
                                    </span>
                                    <div class="decriptionHeadeing white-text" style="width: auto; text-decoration: line-through;">
                                        ${item.task_description}
                                        </div>
                                        <div class="decriptionHeadeing btn-margin">
                                        <button onclick="setIdToLocalStorage('${item.task_id}')" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                                            data-position="top">
                                            <i class="material-icons">mode_edit</i>
                                        </button>
                                        <button onclick="deleteThisTaskFromDatabase('${item.task_id}')" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
                                            data-position="top">
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </div>
                                </div>
    
            
    `
        })
    } else {
        todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO FINISHED TASK...
        </div>`
    }
}


//delete todo
function deleteThisTaskFromDatabase(id) {
    delTodo(id)
}

//edit todo

document.getElementById("updateTaskForm").addEventListener('submit', (e) => {
    e.preventDefault();
    let task_title = document.getElementById("updateTitle").value;
    let task_description = document.getElementById("updateDescription").value;
    let doneStatus = document.getElementById('checkbox');
    console.log(doneStatus);
    document.getElementById("updateTitle").value = "";
    document.getElementById("updateDescription").value = "";
    let task_id = localStorage.getItem('id');
    console.log({ task_id, task_title, task_description });

    fetch('https://rest-nosql.herokuapp.com/todo/api/v1/tasks/'+task_id, {
        method: 'PUT',
        body: JSON.stringify({
            task_title: task_title,
            task_description: task_description,
            task_done: doneStatus.checked ? "true" : "false",
            task_id: task_id

        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((formData) => {
            let index = todoArray.findIndex((item) =>{
                return item.task_id == task_id
            })
            var obj = {
                task_title: task_title,
                task_description: task_description,
                task_done: doneStatus.checked ? "true" : "false",
                task_id: task_id
            };
            this.todoArray[index] = obj
                getData(this.todoArray)
        })
        .catch(err => {
            console.log(err);
        });
    
    // db.collection('todos').doc(id).update({
    //     Title: updatedTitle,
    //     Description: updatedDescription,
    //     taskDone: doneStatus.checked ? true : false
    // }).then(() => console.log('data updated'))
    //     .catch((error) => console.log('error: ', error))

});

// Add todo


let addTaskForm = document.getElementById('addTaskForm');
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let task_title = document.getElementById("title").value;
    let task_description = document.getElementById("description").value;
    let task_id = Math.floor(Math.random() * Math.floor(100000)).toString()
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";


    var newTodoObject = {
        task_title: task_title,
        task_description: task_description,
        task_done: 'false',
        task_id: task_id
    };
    if (newTodoObject.title && newTodoObject.description) {

    };

    /// post todo on server

    fetch('https://rest-nosql.herokuapp.com/todo/api/v1/tasks', {
        method: 'POST',

        body: JSON.stringify({
            task_title: task_title,
            task_description: task_description,
            task_done: 'false',
            task_id: task_id

        }),
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((formData) => {
            console.log("added", this.todoArray)
            this.todoArray.push(newTodoObject);
            getData(this.todoArray);
        })
        .catch(err => {
            console.log(err);
        });

})

// Delete todo
let delTodo = (id) => {
    fetch('https://rest-nosql.herokuapp.com/todo/api/v1/tasks/'+id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((formData) => {
            let updated = todoArray.filter(singleTodo => singleTodo.task_id != id);
            console.log("deleted", updated)
            this.todoArray = updated
            getData(this.todoArray);

        })
        .catch(err => {
            console.log(err);
        });

};

//Adding todo to complete List
let CompTodo = (title) => {
    document.getElementById("container-card").style.backgroundColor = "PaleGoldenRod ";
    document.getElementById("todo-List").style.textDecoration = "line-through";
    document.getElementById("todo-Des").style.textDecoration = "line-through";
    todoArraytit = todoArray.filter(title => title);
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    document.getElementById("completed-task").appendChild(li);
};
//Undo completed Task
let unTodo = (title) => {
    document.getElementById("container-card").style.backgroundColor = "white ";
    document.getElementById("todo-List").style.textDecoration = "line-through";
    document.getElementById("todo-List").style.textDecoration = "none";
    document.getElementById("todo-Des").style.textDecoration = "none";

}

const setIdToLocalStorage = (id) => {
    const ourDesiredTodo = this.todoArray.filter(item => item.task_id == id);
    console.log(ourDesiredTodo,id,this.todoArray);
    if (ourDesiredTodo.length > 0) {
        console.log('inside it')
        document.getElementById('updateTitle').value = ourDesiredTodo[0].task_title;
        document.getElementById('updateDescription').value = ourDesiredTodo[0].task_description;
        localStorage.setItem('id', id);
    };

};