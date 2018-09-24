
// ===== Reading all from DATABASE =====

document.addEventListener("DOMContentLoaded", DataFromServer);

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
                let arr = []
                let completedTask = [];
                arr = data.result
                for (var i = 0; i < arr.length; i++) {
                    if ( arr[i]['task_done'] === "true") {
                        console.log("complete task", arr[i])
                        completedTask.push(arr[i])
                    }
                }
                printToFinishedTask(completedTask)

            })
        })
        .catch(err => {
            console.log(err);
        });
}

// ===== Printing to DOM ===== 

let printToFinishedTask = (doc) => {
console.log(doc.length)
    let todoListCards = document.getElementById('finishedTask');
    todoListCards.innerHTML = "";
    if (doc.length > 0) {
        doc.map((item) => {
            todoListCards.innerHTML += `
    
                                <div class="card1 cyan lighten-1">
                                    <span class="outer white-text" style="text-decoration: line-through;">
                                        <h5 class="card1-h5 white-text">${item.task_title}</h5>
                                    </span>
                                    <div class="decriptionHeadeing white-text" style="width: auto; text-decoration: line-through;">${item.task_description}</div>
                                </div>        
    `
        })
    } else {
        todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO FINISHED TASK...
        </div>`
    }

};