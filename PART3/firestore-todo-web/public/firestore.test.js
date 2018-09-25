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

test('It should read all documents', (done) => {

    db.collection('todos').onSnapshot((snapshot) => {
        let todoArray = [];
        snapshot.docs.forEach(doc => {
            todoArray.push(doc.data());
        });
        expect(todoArray.length).toEqual(5)
        done();
    });

})


//====== Saving Data =====

test('It should add the data', (done) =>{

    db.collection('todos').add({
        Title : "Shopping",
        Description : "Go for shopping on monday",
        taskDone: false
    }).then(res => {
        expect(res.id.length).toEqual(20)
        done();
    })

}) 

// ===== Updating Data =====

test('It should update the data', async (done) => {

    db.collection('todos').doc('1kvs1KVBcc0Gyt8hSihO').update({
        Title: "Go to Library",
        Description: "Go to library",
        taskDone: true
    }).then((res) => {
        expect(200)
        done();
    })
},30000)



// ===== Deleting Data =====


test('It should delete the data', async (done) => {

    db.collection('todos')
        .doc('sRopxDmz9BtHEFHYieQl').delete()
        .then((res) => {
            expect(200)
            done();
        })
}, 30000)