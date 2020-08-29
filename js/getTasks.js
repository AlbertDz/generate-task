const getTasks = {
	getAll: function(listTasks) {
		const titleClick = document.getElementsByClassName('title-click');
		let elements = [];
		let active = task.dataBase.result;

		let data = active.transaction(['task'], 'readonly');
		let object = data.objectStore('task');

		object.openCursor().onsuccess = function(e) {
			let result = e.target.result;

			if (result === null)
				return;

			elements.push(result.value);
			result.continue();
		}

		data.oncomplete = function(e) {
			let titleTask = '';

			for (let i in elements) {
				titleTask += `<li class="title-click" id="${elements[i].id}">${elements[i].title}</li>`;
			}

			listTasks.innerHTML = titleTask;

			getTasks.clickTask(titleClick);
		}
	},
	clickTask: function(listTasks) {
		for (let i=0;i<listTasks.length; i++) {
			listTasks[i].addEventListener('click', function(e) {
				getTasks.getTask(e.target.id);
			})
		}
	},
	getTask: function(id) {
		let descriptionTask = document.querySelector('.description-task');
		let active = task.dataBase.result;

		let data = active.transaction(['task'], 'readonly');
		let object = data.objectStore('task');

		let request = object.get(id);

		request.onsuccess = function(e) {
			let result = request.result;

			if (result !== undefined) {
				descriptionTask.innerHTML = `
					<div class="header-task">
						<p class="title-task">${result.title}</p>
						<div class="options-task">
							<span title="Delete" class="circle delete">
								<img src="img/icon-delete.png" id="${result.id}">
							</span>
							<span title="Edit" class="circle edit">
								<img src="img/icon-edit.png">
							</span>
							<span title="Save" class="circle save-task">
								<img src="img/icon-save.png" id="${result.id}">
							</span>
						</div>
					</div>
					<textarea id="task" class="description" disabled>${result.description}</textarea>
				`;
			}

			const edit = document.querySelector('.edit');
			const save = document.querySelector('.save-task');
			const del = document.querySelector('.delete');

			const taskContent = document.getElementById('task');

			del.addEventListener('click', function(e) {
				deleteTask.delete(e.target.id);
			});

			edit.addEventListener('click', function(e) {
				taskContent.disabled = false;
			});

			save.addEventListener('click', function(e) {
				editTask.putTask(e.target.id, result.title, taskContent);
			});
		}
	}
}