
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
                  'main.js'
                  ];


self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("[ServiceWorker] installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log("[ServiceWorker] Activated");
})

self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fectching", event.request.url);
});



self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    var title = 'network message';
    var body = 'Push message Received';
    //var icon = 'https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Fsmall-n-flat-icons-by-paomedia%2Fsign-check-icon.html&psig=AFQjCNGPrcKjoCDflK_V6EqJMQnPqmWwbg&ust=1497603025665408',
    //var icon = 'your-first-pwapp-master/final/images/icons/icon-144x144.png',
    var icon = 'sign-check-icon.png';
    var tag = 'push-notification'
    //body: 'Timestamp is set to "01 Jan 2000 00:00:00".',


    event.waitUntil(

      self.registration.showNotification(title, {
          body: body,
          icon: icon,
          tag: tag
      })
    );
});


Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status)
    });


self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);

    event.notification.close();



    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});
