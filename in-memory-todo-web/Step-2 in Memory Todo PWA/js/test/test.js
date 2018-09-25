
//checking SW in Browser
test('Checking Service Worker Availibility', (done) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registered successfully with scope: ', registration.scope);
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
    
        expect(console.log('SW register'))
        done();
    });
//installing SW test
test('Install SW',(done) =>{
    self.addEventListener('install', function(e) {
        console.log('[ServiceWorker] Install');
        e.waitUntil(
          caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
          })
        );
      });
      expect(console.log('SW Install'))
      done();
})

//Activating SW test
test('Activate SW',(done) =>{
    self.addEventListener('activate', function(e) {
        console.log('[ServiceWorker] Activate');
        e.waitUntil(
          caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
              if (key !== cacheName) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
              }
              
            }));
          })
        );
        return self.clients.claim();
      });
      expect(console.log('SW Activate'))
      done();
})



//Adding Todo Test
test('It should add the data', (done) =>{
    var todoArray = [];
    var newTodoObject = {
        title : "Read a book",
        description: "Read a book related to programming",
        id: 1,
        done: false
    };

        todoArray.push(newTodoObject);
    expect(200)
    done()
});




