// cache needed resources
self.addEventListener('install', function (event) {
    console.log('[SW] Install Service Worker!');
    event.waitUntil(
        caches.open('web')
        .then(function (cache) {
            cache.addAll([
                '/',
                '/index.html',
                '/app.webmanifest',
                '/style.css',
                '/app.js',
                '/service-worker.js',
                '/icon-clock.svg',
                '/record.js'
            ]);
        })
    );
});

// return cache resource. if not exist, fetch it
self.addEventListener('fetch', function (event) {
    console.log('[SW] Fetch!', event);
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response)
                return response;
            else
                return fetch(event.request);
        })
    );
});

// click notification to open record page
self.addEventListener('notificationclick', function (event) {
    console.log('[SW] Notification clicked.');
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow('http://127.0.0.1:9487')
    );
});

// reminds user to record every 1 hour
let notificationInterval;
if ('permissions' in navigator) {
    navigator.permissions.query({
        name: 'notifications'
    })
    .then(function (notificationPermission) {
        notificationPermission.onchange = function () {
            if (Notification.permission == 'granted' && notificationInterval == undefined) {
                notificationInterval = setInterval(function () {
                    self.registration.showNotification('Hi from Service Worker', {
                        body: 'service worker!'
                    });
                }, 3600000);
            }
            else if (Notification.permission !== 'granted') {
                if (notificationInterval != undefined) {
                    clearInterval(notificationInterval);
                    notificationInterval = undefined;
                }
                console.log('[SW] Notification permission not granted. This permission is needed for Time Record.');
            }
        };
    });
}

// reset the remind timer
self.addEventListener('message', function (event) {
    if (event.data == 'reset clock' && notificationInterval != undefined) {
        clearInterval(notificationInterval);
        notificationInterval = setInterval(function () {
            self.registration.showNotification('Hi from Service Worker', {
                body: 'service worker!'
            });
        }, 3600000);
    }
});