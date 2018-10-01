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

    let todoCardList = document.getElementById("upcomingTask");
    todoCardList.innerHTML = '';
    todoArray.map((item, index) => {
        $(document).ready(function () {
            $('.floating-action-btn').floatingActionButton();
        });

        if(todoArray.length>0)
        {todoCardList.innerHTML +=` 
        <div class="card2" id="card-container">
            <h5 class="card2-h5" id="title" required>${item.title}</h5>
            <div class="decriptionHeadeing" style="width: auto" id="description">${item.description}</div>
            <div class="decriptionHeadeing btn-margin">
            <button onclick="compTodo('${item.title}', '${item.id}', '${index}');" class="waves-effect waves-light btn green darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
            data-position="top" id='complete'>
            <i class="material-icons">check</i>
        </button> 
                <button onclick="changeTodo('${item.title}', '${item.id}', '${index}');" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                    data-position="top" id='editButton'>
                    <i class="material-icons">mode_edit</i>
                </button>
                <button onclick="delTodo('${item.id}');" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
                    data-position="top" id='deleteButton'>
                    <i class="material-icons">delete</i>
                </button> 
            </div>
        </div>
    `;
    }
    })

}
//edit todo
let changeTodo = (title, id, index) => {
    document.getElementById("updateTaskForm").addEventListener('submit', (e) => {
        e.preventDefault();
        let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
        let title = document.getElementById("updateTitle").value;
        let description = document.getElementById("updateDescription").value;
        let doneStatus = 'false'
        console.log(doneStatus);
        console.log({ id, title,description });

    var newTodoObject = {
        title,
        description,
        id,
        done:"false",
    };

todoArray.splice(index,1, newTodoObject)
        getData(todoArray);
    
})
};
// Add todo

var todoArray = new Array();
let btn = document.querySelector('#add');
var editItem = {}
var editIndex = -1;
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
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    document.getElementById("uncompleted-task").appendChild(li);

});

// Delete todo

let delTodo = (id) => {
    todoArray = todoArray.filter(singleTodo => singleTodo.id !== id);
    getData(todoArray);
};



let compTodo=(title, id, index) => {
console.log(index)
    
let compBtn= document.querySelector('#complete')
compBtn.addEventListener('click',(e) =>{
e.preventDefault();
let todoListCards = document.getElementById('finishedTask');
document.getElementById('finishedTask').innerHTML = "";

if (todoArray.length > 0) {
    todoArray.map((item) => {
        todoListCards.innerHTML += `

                            <div class="card1 cyan lighten-1">
                                <span class="outer white-text" style="text-decoration: line-through;">
                                    <h5 class="card1-h5 white-text">${item.title}</h5>
                                </span>
                                <div class="decriptionHeadeing white-text" style="width: auto; text-decoration: line-through;">
                                    ${item.description}
                                    </div>
                                    <div class="decriptionHeadeing btn-margin">
                                    <button onclick="changeTodo('${item.title}', '${item.id}', '${index}');" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                                    data-position="top" id='editButton'>
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button onclick="delTodofromComp('${item.id}');" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
                                    data-position="top" id='deleteButton'>
                                        <i class="material-icons">delete</i>
                                    </button>
                                </div>
                            </div>

        
`;
document.getElementById("upcomingTask").innerHTML='SEEMS LIKE YOU HAVE NO UPCOMING TASK...'
    })
} else {
    todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO FINISHED TASK...
    </div>`}

})
var li = document.createElement("li");
var t = document.createTextNode(title);
li.appendChild(t);
document.getElementById("completed-task").appendChild(li);
var ul= document.getElementById("completed-task");
ul.removeChild(ul.firstChild);
document.getElementById("uncompleted-task").remove();
}
if(todoArray.length<0) {
    todoCardList.innerHTML=`<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO UPCOMING TASK...
    </div>`
}

 
  

//Delete Todo from Completed
let delTodofromComp = (id) => {
    document.getElementById("finishedTask").innerHTML='SEEMS LIKE YOU HAVE NO FINISHED TASK...'
};
