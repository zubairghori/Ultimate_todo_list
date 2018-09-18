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

// ===== Reading all from DATABASE =====

db.collection('todos').orderBy('Title').onSnapshot((snapshot) => {
    let todoArray = [];
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        let todo = {
            id: doc.id,
            ...doc.data()
        };
        if(doc){
            if(!doc.data().taskDone){
            todoArray.push(todo);
        }
    }
    });
    printToDOM(todoArray);
})
// ===== Printing to DOM =====  

let printToDOM = (doc) => {
    let todoListCards = document.getElementById('todoListCards');
    todoListCards.innerHTML = "";
    doc.map((item) => {
        $(document).ready(function () {
            $('.floating-action-btn').floatingActionButton();
        });

        $(document).ready(function () {
            $('.tooltipped').tooltip();
        });

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
        </div>
        </div>
        </div>
        </div>
        </div>
        `;
    })
};