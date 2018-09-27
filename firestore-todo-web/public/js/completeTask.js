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
            if (doc.data().taskDone === true) {
                todoArray.push(todo);
            }
        }
    });
    printToFinishedTask(todoArray);
})

// ===== Printing to DOM ===== 

let printToFinishedTask = (doc) => {

    let todoListCards = document.getElementById('finishedTask');
    todoListCards.innerHTML = "";
    if (doc.length > 0) {
        doc.map((item) => {
            todoListCards.innerHTML += `
    
                                <div class="card1 cyan lighten-1">
                                    <span class="outer white-text" style="text-decoration: line-through;">
                                        <h5 class="card1-h5 white-text">${item.Title}</h5>
                                    </span>
                                    <div class="decriptionHeadeing white-text" style="width: auto; text-decoration: line-through;">${item.Description}</div>
                                </div>        
    `
        })
    } else {
        todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO FINISHED TASK...
        </div>`
    }

};