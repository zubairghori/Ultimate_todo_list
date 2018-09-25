var indexedDB = require("fake-indexeddb");
var IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

var request = indexedDB.open("test", 3);

//===== Add and Read Data =====

test('It should add and read data', (done) => {
    request.onupgradeneeded = function () {
        var db = request.result;
        var store = db.createObjectStore('allTodos', { keyPath: "id", autoIncrement: true })
        store.createIndex("todos", "todos", { unique: false });

        store.add({ title: "Shopping", description: "Go for shopping on monday", taskDone: true });

        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction("allTodos", "readwrite");

            tx.objectStore("allTodos").index("todos").get("Shopping").addEventListener("success", function (event) {
                console.log("From index:", event.target.result);
            });
            tx.objectStore("allTodos").openCursor(IDBKeyRange.lowerBound(200000)).onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    cursor.continue();
                }
            };
            tx.oncomplete = function (res) {
                expect(res.taskDone).toBeTruthy
                done();
            };
        };
    }
})

//===== Delete Data =====

test('it should delete data', async (done) => {
    await new Promise(resolve => {
        request = indexedDB.open("test", 3);

        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction("allTodos", "readwrite")
                .objectStore("allTodos")
                .delete(1)
                .onsuccess = () => {
                    expect(200)
                };
            done();
        }
    })
});


//===== Update Data =====

test('It should update data', async (done) => {
    await new Promise(resolve => {
        request = indexedDB.open("test", 3);

        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction("allTodos", "readwrite");
            tx.objectStore("allTodos").put({ title: "Read a book", description: "Read a book related to programming", taskDone: false });
            tx.objectStore("allTodos").get(1).onsuccess = (res) => {
                expect(res.taskDone).toBeFalsy
                done();
            }
        };
    })
});