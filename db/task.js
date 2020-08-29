const task = {
	indexedDB: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
	dataBase: indexedDB.open('tasks', '1.0')
}

