let appServerKey = 'BPa8duHWL0iVFQHCx6CqInD1vZSUgQ0eCKPHmh6y4OFr_BLS6MOBWjig-RriDqZUTpU4KHwLTDlT5Cktqle1YyQ';
if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
        .then(function (sw) {
            // wait for registration
            console.log('Service Worker registered successfully.');
            return sw;
        })
        .then(async function (registration) {
            await navigator.serviceWorker.ready;
            await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(appServerKey)
            })
            .then(sub => console.log('User is subscribe.'))
            .catch(err => console.log('Failed to subscribe the user:', err));
        })
        .catch(function (error) {
            console.log('Service Worker failed to register.\n', error);
        });
    });
}
else {
    console.log('Your browser doesn\'t support Service Worker.');
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g,'/');
    var rawData = atob(base64);
    var outputArr = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i ){
        outputArr[i] = rawData.charCodeAt(i);
    }
    return outputArr;
}