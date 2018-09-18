// ===== Initialize Firebase ===== 

var config = {
    apiKey: "AIzaSyBbYuPD6csxdy8269dZff2kcrlKM93iKvE",
    authDomain: "firestore-todo-web.firebaseapp.com",
    databaseURL: "https://firestore-todo-web.firebaseio.com",
    projectId: "firestore-todo-web",
    storageBucket: "firestore-todo-web.appspot.com",
    messagingSenderId: "659332649134"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true })
let todoArray = [];

db.collection('todos').get().then((snapshot) => {
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {

        todoArray.push(doc.data());
    });
    getDataFromDatabase(todoArray);
})


let getDataFromDatabase = (doc) => {
    console.log(doc);
    let todoListCards = document.getElementById('todoListCards');
    todoListCards.innerHTML = "";
    doc.map((item) => {

        $(document).ready(function () {
            $('.floating-action-btn').floatingActionButton();
        });
        console.log(item);
        todoListCards.innerHTML +=
            `
                <div class"container">
                <div class="row">
                <div class="col s6 m12 l12">
                <div class="card grey lighten-5">
                 
                <div class="card-content black-text z-depth-4 hoverable">
                <span class="card-title">
                    <h5>${item.Title}</h5>
                </span>
                <h6>${item.Description}</h6>
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
                            <a class="btn-floating yellow right darken-1 tooltipped" data-delay="1000" data-tooltip="Delete" data-position="top">
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
    })

}

// ====== Saving Data =====

let addTaskForm = document.getElementById('addTaskForm');
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Inside addTaskForm')
    let Title = document.getElementById("Title").value;
    let Description = document.getElementById("Description").value;
    db.collection('todos').add({
        Title,
        Description,
        taskDone: false
    })
    Title.value = "";
    Description.value = "";
})


