let request = indexedDB.open('recordDB'), db, todayId = 0;
request.onerror = function (event) {
    console.log('Database error: ' + event.target.errorCode);
};
request.onsuccess = function (event) {
    db = request.result;
};
request.onupgradeneeded = function (event) {
    let _db = event.target.result;
    let objectStore;
    if (!_db.objectStoreNames.contains('records'))
        objectStore = _db.createObjectStore('records', {keyPath: 'timecode'});
};

function addRecord(record) {
    if (!db instanceof IDBDatabase || typeof(record) != "string")
        return;
    // key: month day year id
    let rt = db.transaction(['records'], 'readwrite')
        .objectStore('records')
        .add({
            timecode: Date().match(/[A-Za-z]+ \d+ \d+ /)[0] + (todayId++),
            time: Date(),
            record: record
        });
    rt.onsuccess = function (event) {
        console.log('write data successfully');
    };
    rt.onerror = function (event) {
        console.log('write data error');
    };
}

document.getElementById('submit').addEventListener('click', function () {
    addRecord(document.getElementById('text').value);
    document.getElementById('text').value = '';
});

document.getElementById('save').addEventListener('click', function () {
    if (!db instanceof IDBDatabase)
        return;
    let records = [];
    db.transaction(['records'], 'readonly').objectStore('records').openCursor().onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            records.push(cursor.value);
            cursor.continue();
        }
        else {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([JSON.stringify(records)], {type: 'text/plain'}));
            a.download = 'records.txt';
            a.click();
            URL.revokeObjectURL(a.href);
        }
    };
});

document.getElementById('clear').addEventListener('click', function () {
    console.log('deleting data');
    db.transaction(['records'], 'readwrite').objectStore('records').clear();
});

document.getElementById('reset').addEventListener('click', function () {
    navigator.serviceWorker.ready
    .then(function (registration) {
        registration.active.postMessage('reset clock');
    });
});