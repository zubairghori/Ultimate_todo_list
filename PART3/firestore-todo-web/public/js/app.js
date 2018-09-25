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
db.enablePersistence()
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            console.log('failed');

        } else if (err.code == 'unimplemented') {
            console.log('unimplemented')
        }
    });

// ===== Reading all from DATABASE =====  

db.collection('todos').orderBy('Title').onSnapshot((snapshot) => {
    let todoArray = [];
    let completedTask = [];
    let unCompletedTask = [];
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        let todo = {
            id: doc.id,
            status: doc.data().taskDone,
            ...doc.data()
        };
        todoArray.push(todo);
    });
    for (var i = 0; i < todoArray.length; i++) {
        if (todoArray[i]['taskDone'] === false) {
            unCompletedTask.push(todoArray[i]);
        } else {
            completedTask.push(todoArray[i]);
        }
    }
    console.log("unCompletedTaska:", unCompletedTask)
    console.log("completedTask:", completedTask)

    printToUpcomingTask(unCompletedTask);
    printToFinishedTask(completedTask);


    localStorage.setItem("todoArray", JSON.stringify(todoArray));
})


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
                <h5 class="card2-h5">${item.Title}</h5>
                <div class="decriptionHeadeing" style="width: auto">${item.Description}</div>
                <div class="decriptionHeadeing btn-margin">
                    <button onclick="setIdToLocalStorage('${item.id}')" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                        data-position="top">
                        <i class="material-icons">mode_edit</i>
                    </button>
                    <button onclick="deleteThisTaskFromDatabase('${item.id}')" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
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
                                        <h5 class="card1-h5 white-text">${item.Title}</h5>
                                    </span>
                                    <div class="decriptionHeadeing white-text" style="width: auto; text-decoration: line-through;">
                                        ${item.Description}
                                        </div>
                                        <div class="decriptionHeadeing btn-margin">
                                        <button onclick="setIdToLocalStorage('${item.id}')" href="#modal2" class="waves-effect waves-light btn red white-text tooltipped modal-trigger" data-delay="1000" data-tooltip="Edit"
                                            data-position="top">
                                            <i class="material-icons">mode_edit</i>
                                        </button>
                                        <button onclick="deleteThisTaskFromDatabase('${item.id}')" class="waves-effect waves-light btn yellow darken-1 white-text tooltipped" data-delay="1000" data-tooltip="Delete"
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
// ====== Saving Data =====

let addTaskForm = document.getElementById('addTaskForm');
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let Title = document.getElementById("title").value;
    let Description = document.getElementById("description").value;
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    db.collection('todos').add({
        Title,
        Description,
        taskDone: false
    })

})

// ===== Updating Data =====

document.getElementById("updateTaskForm").addEventListener('submit', (e) => {
    e.preventDefault();
    let updatedTitle = document.getElementById("updateTitle").value;
    let updatedDescription = document.getElementById("updateDescription").value;
    let doneStatus = document.getElementById('checkbox');
    console.log(doneStatus);
    document.getElementById("updateTitle").value = "";
    document.getElementById("updateDescription").value = "";
    let id = localStorage.getItem('id');
    console.log({ id, updatedTitle, updatedDescription });
    db.collection('todos').doc(id).update({
        Title: updatedTitle,
        Description: updatedDescription,
        taskDone: doneStatus.checked ? true : false
    }).then(() => console.log('data updated'))
        .catch((error) => console.log('error: ', error))

});

const setIdToLocalStorage = (id) => {
    // console.log(id);
    console.log(id);
    const todoArray = JSON.parse(localStorage.getItem('todoArray'));
    console.log(todoArray);
    const ourDesiredTodo = todoArray.filter(item => item.id === id);
    console.log(ourDesiredTodo);
    if (ourDesiredTodo) {
        console.log('inside it')
        console.log(ourDesiredTodo[0])
        document.getElementById('updateTitle').value = ourDesiredTodo[0].Title;
        document.getElementById('updateDescription').value = ourDesiredTodo[0].Description;
        localStorage.setItem('id', id);
    };

};


// ===== Deleting Data =====

let deleteThisTaskFromDatabase = (id) => {
    db.collection('todos')
        .doc(id).delete();
};


