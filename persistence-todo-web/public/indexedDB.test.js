var indexedDB = require("fake-indexeddb");
var IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

var request = indexedDB.open("test", 3);

//===== Add and Read Data =====

test('Test1 [It should add and read data]', (done) => {
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

test('Test2 [It should add and read data]', async () => {

    request.onupgradeneeded = function () {
        var db = request.result;
        var store = db.createObjectStore('allTodos', { keyPath: "id", autoIncrement: true })
        store.createIndex("todos", "todos", { unique: false });

        store.add({ title: "Reading", description: "Read a book related to programming", taskDone: false });

        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction("allTodos", "readwrite");

            tx.objectStore("allTodos").index("todos").get("Reading").addEventListener("success", function (event) {
                console.log("From index:", event.target.result);
            });
            tx.objectStore("allTodos").openCursor(IDBKeyRange.lowerBound(200000)).onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    cursor.continue();
                }
            };
            tx.oncomplete = function (res) {
                expect(res.title).toEqual("Reading");
            };
        };
    }
}, 10000)

//===== Delete Data =====

test('Test3 [it should delete data]', async (done) => {
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

test('Test4 [it should delete data]', async (done) => {
    await new Promise(resolve => {
        request = indexedDB.open("test", 3);

        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction("allTodos", "readwrite")
                .objectStore("allTodos")
                .delete(2)

                .onsuccess = () => {
                    expect(undefined);
                };
            done();
        }
    })
});

//===== Update Data =====

test('Test5 [It should update data]', async (done) => {
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

test('Test6 [It should update data]', async (done) => {
    await new Promise(resolve => {
        request = indexedDB.open("test", 3);

        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction("allTodos", "readwrite");
            tx.objectStore("allTodos").put({ title: "Shopping", description: "Go for shopping", taskDone: true });
            tx.objectStore("allTodos").get(2).onsuccess = (res) => {
                expect(undefined);
                done();
            }
        };
    })
});