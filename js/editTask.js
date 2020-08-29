const editTask = {
	putTask: function(id, title, description) {
		let active = task.dataBase.result;

		let data = active.transaction(['task'], 'readwrite');
		let object = data.objectStore('task');

		let request = object.get(id);

		request.onsuccess = function(e) {
			let result = e.target.result;

			result.description = description.value;

			let requestUpdate = object.put(result);

			request.onerror = function(e) {
				alert(`${requestUpdate.error.name}\n\n${requestUpdate.error.message}`);
			}

			data.oncomplete = function(e) {
				description.disabled = true;
			}
		};
		
	}
}