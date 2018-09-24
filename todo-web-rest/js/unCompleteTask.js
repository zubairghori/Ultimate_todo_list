
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
            let unCompletedTask = [];
            arr = data.result
            for (var i = 0; i < arr.length; i++) {
                if ( arr[i]['task_done'] === "false") {
                    console.log("complete task", arr[i])
                    unCompletedTask.push(arr[i])
                }
            }
            printToUpcomingTask(unCompletedTask)

        })
    })
    .catch(err => {
        console.log(err);
    });
}


// ===== Printing to DOM =====  

let printToUpcomingTask = (doc) => {
    let todoListCards = document.getElementById('upcomingTask');
    todoListCards.innerHTML = "";
    if (doc.length > 0) {
        doc.map((item) => {
            $(document).ready(function () {
                $('.tooltipped').tooltip();
            });
            console.log(item);

            todoListCards.innerHTML += ` 
    
                <div class="card2">
                    <h5 class="card2-h5">${item.task_title}</h5>
                    <div class="decriptionHeadeing" style="width: auto">${item.task_description}</div>
                </div>
            `;
        })
    } else {
        todoListCards.innerHTML = `<div class="white-text" style="text-decoration: underline; font-size: 1.7em;">SEEMS LIKE YOU HAVE NO UPCOMING TASK...
        </div>`
    }
}
