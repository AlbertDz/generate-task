const deleteTask = {
	delete: function(id) {
		const listTasks = document.getElementById('list');
		let descriptionTask = document.querySelector('.description-task');
		let active = task.dataBase.result;

		let data = active.transaction(['task'], 'readwrite');
		let object = data.objectStore('task');

		// let index = object.index('by_id');
		// let request = index.get(id);
		let request = object.delete(id);

		request.onsuccess = function(e) {
			descriptionTask.innerHTML = '';

			getTasks.getAll(listTasks);
		}
	}
}