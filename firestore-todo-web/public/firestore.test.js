let firebase = require('firebase');

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


//===== Reading all from DATABASE =====  

test('Test1 [It should read all documents]', (done) => {
    db.collection('todos').onSnapshot((snapshot) => {
        let todoArray = [];
        snapshot.docs.forEach(doc => {
            todoArray.push(doc.data());
        });
        expect(todoArray.length).toEqual(21)
        done();
    });
})

test('Test2 [It should read all documents]', (done) => {
    db.collection('todos').onSnapshot((snapshot) => {
        let todoArray = [];
        snapshot.docs.forEach(doc => {
            todoArray.push(doc.data());
        });
        expect.arrayContaining(todoArray);
        done();
    });
})

//====== Saving Data =====

test('Test3 [It should add the data]', (done) => {
    db.collection('todos').add({
        Title: "Shopping",
        Description: "Go for shopping on monday",
        taskDone: false
    }).then(res => {
        expect(res.id.length).toEqual(20)
        done();
    })
})

test('Test4 [It should add the data]', (done) => {
    db.collection('todos').add({
        Title: "Homework",
        Description: "Complete the homework",
        taskDone: true
    }).then((docRef) => {
        expect(console.log(docRef.id));
        done();
    })
})

// ===== Updating Data =====

test('Test5 [It should update the data]', async (done) => {
    await new Promise(response => {
        db.collection('todos').doc('4I1y8ynwJSR3lIYvGjY4').update({
            Title: "Go to Library",
            Description: "Go to library",
            taskDone: true
        }).then((res) => {
            expect(200)
            done();
        })
    })
})

test('Test6 [It should update the data]', async (done) => {
    await new Promise(response => {
        let updateTodo = (todoId) => {
            db.collection('todos').doc(todoId).update({
                Title: "Go to Library",
                Description: "Go to library",
                taskDone: true
            })
        }
        expect(updateTodo("HIdGE9L48rGoLoprXpMp")).toBeUndefined();
        done();
    })
})

// ===== Deleting Data =====

test('Test7 [It should delete the data]', async (done) => {
    await new Promise(response => {
        db.collection('todos')
            .doc('4I1y8ynwJSR3lIYvGjY4').delete()
            .then((res) => {
                expect(200)
                done();
            })
    })
})

test('Test8 [It should delete the data]', async (done) => {
    await new Promise(response => {
        let deletTodo = (todoId) => {
            db.collection('todos')
                .doc(todoId).delete()
        }
        expect(deletTodo('HIdGE9L48rGoLoprXpMp')).toBeUndefined();
        done();
    })
})