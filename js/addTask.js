const addTask = {
	add: function(title, description) {
		const idTask = Math.random().toString(36).substring(2);
		const success = document.querySelector('.success');

		let active = task.dataBase.result;

		let data = active.transaction(['task'], 'readwrite');
		let object = data.objectStore('task');

		let request = object.put({
			id: idTask,
			title: title.value,
			description: description.value
		});

		request.onerror = function(e) {
			alert(`${request.error.name}\n\n${request.error.message}`);
		}

		data.oncomplete = function(e) {
			title.value = '';
			description.value = '';

			success.style.display = 'block';
			setTimeout(function() {
				success.style.display = 'none';
			},2000)
		}
	}
}