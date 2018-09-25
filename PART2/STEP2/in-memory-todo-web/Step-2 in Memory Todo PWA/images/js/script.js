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
    todoArray.map((item, index) => {
        $(document).ready(function () {
            $('.floating-action-btn').floatingActionButton();
        });

        todoCardList.innerHTML +=` 
        <div class="upcoming" id="upcomingTodo">Upcoming</div>
        <div class="card2">
            <h5 class="card2-h5" id="title" required>${item.title}</h5>
            <div class="decriptionHeadeing" style="width: auto" id="description">${item.description}</div>
            <div class="decriptionHeadeing btn-margin">
            <button onclick="compTodo('${item.title}', '${item.id}', '${index}');" class="waves-effect waves-light btn green darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Complete"
            data-position="top" id="complete">
            <i class="material-icons" id='completed'>check</i>
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

    })

}

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


//edit todo
let changeTodo = (title, id, index) => {
    console.log({title});
    console.log({id, index});
    editItem =     todoArray[index];
    editIndex =  index;
    let editBtn = document.querySelector('#update');
    editBtn.addEventListener('click', (e) => {
    e.preventDefault();
  ;
 
    // var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    var id = id;
    var title = document.getElementById('updateTitle').value;
    var description = document.getElementById('updateDescription').value;
    var newTodoObject = {
        title,
        description,
        id,
        done:'false'
    };

todoArray.splice(index,1, newTodoObject)
        getData(todoArray);
    
})
};

let compTodo=(title, id, index) => {
console.log(index)
    
let compBtn= document.querySelector('#complete')
compBtn.addEventListener('click',(e) =>{
e.preventDefault();
    document.getElementById("title").style.textDecoration = "line-through";
    document.getElementById("description").style.textDecoration = "line-through";
    document.getElementById('cardContainer1').style.backgroundColor= "LightSkyBlue";
    document.getElementById('upcomingTodo').innerText= "Finished";
    document.getElementById('deleteButton').style.cssFloat="right";
    document.getElementById('complete').remove();
    document.getElementById('editButton').remove();
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    document.getElementById("completed-task").appendChild(li);
    document.getElementById("uncompleted-task").remove();
  

})

}