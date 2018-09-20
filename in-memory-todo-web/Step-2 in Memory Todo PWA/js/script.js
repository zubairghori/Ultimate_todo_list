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

    let todoCardList = document.getElementById("cardContainer");
    todoCardList.innerHTML = '';
    todoArray.map((item) => {
        $(document).ready(function () {
            $('.floating-action-btn').floatingActionButton();
        });

        todoCardList.innerHTML += `
    <div class="container"">
    <div class="row">
        <div class="col s6 m12 l12">
  
            <div class="card grey lighten-5" id="card1">
                <div class="card-content black-text z-depth-4 hoverable">
                    <span class="card-title">
                        <h5 id="todo-List">${item.title}</h5>
                    </span>
                    <h6 id="todo-Des">${item.description}</h6>
  
                    <!-- Floating Action Button at the end of the card -->
  
                    <div class="floating-action-btn">
                        <a class="btn-floating btn-small blue-grey lighten-2 right">
                            <i class="large material-icons">more_vert</i>
                        </a>
                        <ul>
                            <li>
                                <button onclick="CompTodo('${item.title}');" class="btn-floating green right tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit" data-position="top" id="CompBtn">
                                    <i class="material-icons" >done</i>
                                </button>
                            </li>
                            <li>
                                <button onclick="delTodo('${item.id}');" class="btn-floating red right darken-1 tooltipped" data-delay="1000" data-tooltip="Delete" data-position="top" id="delBtn">
                                    <i class="material-icons" id="del">delete</i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
  
    `;

    })

}

// Add todo

var todoArray = [];
let btn = document.querySelector('#add');

btn.addEventListener('click', () => {
    let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    var title = document.querySelector('#input_text').value;
    var description = document.querySelector('#textarea2').value;

    var newTodoObject = {
        title,
        description,
        id
    };

    if (newTodoObject.title && newTodoObject.description) {
        todoArray.push(newTodoObject);
        console.log(todoArray)
        getData(todoArray);
    };
    todoArraytit = todoArray.filter(title =>title);
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    document.getElementById("uncompleted-task").appendChild(li);

});

// Delete todo

let delTodo = (id)=> {
    todoArray = todoArray.filter(singleTodo => singleTodo.id !== id);
    getData(todoArray);
};  

//Adding todo to complete List
let CompTodo = (title)=> {
    todoArraytit = todoArray.filter(title =>title);
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    document.getElementById("completed-task").appendChild(li);
  }; 