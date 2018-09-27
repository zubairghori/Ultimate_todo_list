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
    let finishedtask = [];
    snapshot.docs.forEach(doc => {
        let todo = {
            id: doc.id,
            ...doc.data()
        };
        if (doc) {
            if (doc.data().taskDone === false) {
                todoArray.push(todo);
            }
        }
    });
    printToUpcomingTask(todoArray);
})


// ===== Printing to DOM =====  

let printToUpcomingTask = (doc) => {
    let todoListCards = document.getElementById('upcomingTask');
    todoListCards.innerHTML = "";
    if (doc.length > 0) {
        doc.map((item) => {
            $(document).ready(function () {
                $('.tooltipped').tooltip();
            });
            
            todoListCards.innerHTML += ` 
    
                <div class="card2">
                    <h5 class="card2-h5">${item.Title}</h5>
                    <div class="decriptionHeadeing" style="width: auto">${item.Description}</div>
                </div>
            `;
        })
    } else {
        todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO UPCOMING TASK...
        </div>`
    }
}
