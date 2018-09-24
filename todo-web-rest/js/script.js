if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registered successfully with scope: ', registration.scope);
    }).catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}


let getData = (todoArray) => {

    let todoCardList = document.getElementById("cardContainer1");
    todoCardList.innerHTML = '';
    todoArray.map((item) => {
        $(document).ready(function () {
            $('.floating-action-btn').floatingActionButton();
        });

        todoCardList.innerHTML +=` 

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

}

// Add todo

var todoArray = [];
let btn = document.querySelector('#add');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    var title = document.querySelector('#input_text').value;
    var description = document.querySelector('#textarea2').value;

    var newTodoObject = {
        title,
        description,
        id,
        done:'false'
    };

    if (newTodoObject.title && newTodoObject.description) {
        todoArray.push(newTodoObject);
        console.log(todoArray)
        getData(todoArray);
    };

    /// post todo on server

    fetch('https://rest-nosql.herokuapp.com/todo/api/v1/tasks', {
        method: 'POST',

        body: JSON.stringify({
            task_title: title,
            task_description: description,
            task_done: 'false',
            task_id: id

        }),
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((formData) => {
            console.log(formData);
        })
        .catch(err => {
            console.log(err);
        });

            /// put todo on server

    
});

// Delete todo

let delTodo = (id) => {
    todoArray = todoArray.filter(singleTodo => singleTodo.id !== id);
    getData(todoArray);

 //delete from server
 const deletefromServer = (req, res, next) => {
    delTodo.remove({
        "_id": req.params.id
    }).then(result => {
        res.status(200).json({
            message: "Todo deleted"
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}
 
};

//Adding todo to complete List
let CompTodo = (title) => {
    document.getElementById("container-card").style.backgroundColor = "PaleGoldenRod ";
    document.getElementById("todo-List").style.textDecoration = "line-through";
    document.getElementById("todo-Des").style.textDecoration = "line-through";
    todoArraytit = todoArray.filter(title=>title);
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    document.getElementById("completed-task").appendChild(li);
};
//Undo completed Task
let unTodo=(title) => {
    document.getElementById("container-card").style.backgroundColor = "white ";
    document.getElementById("todo-List").style.textDecoration = "line-through";
    document.getElementById("todo-List").style.textDecoration = "none";
    document.getElementById("todo-Des").style.textDecoration = "none";

}

