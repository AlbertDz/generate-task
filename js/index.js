const homeBx = document.querySelector('.homeBx');
const newBx = document.querySelector('.newBx');
const tasksBx = document.querySelector('.tasksBx');
const error = document.querySelector('.error');
const title = document.querySelector('.title');
const description = document.querySelector('.description');

const homeClick = document.getElementById('home-click');
const newClick = document.getElementById('new-click');
const tasksClick = document.getElementById('tasks-click');
const form = document.getElementById('form-task');
const listTasks = document.getElementById('list');
const file = document.getElementById('file');

window.addEventListener('load', function(e) {
	task.dataBase.onupgradeneeded = function(e) {
		let active = task.dataBase.result;

		let object = active.createObjectStore('task', {keyPath: 'id'});
		object.createIndex('by_title', 'title', {unique: false});
		object.createIndex('by_description', 'description', {unique: false});
	};

	task.dataBase.onsuccess = function(e) {
		alert('Base de datos cargada exitosamente');
	};

	task.dataBase.onerror = function(e) {
		alert('Error cargando la base de datos');
	};

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		if (this.title.value !== '' && this.task.value !== '') {
			addTask.add(this.title, this.task);
		} else {
			error.style.display = 'block';
			setTimeout(function() {
				error.style.display = 'none';
			},3000)
		}
	});

	homeClick.addEventListener('click', function(e) {
		actualLink(e);
		actualBx(homeBx);
	});

	newClick.addEventListener('click', function(e) {
		actualLink(e);
		actualBx(newBx);
	});

	tasksClick.addEventListener('click', function(e) {
		actualLink(e);
		actualBx(tasksBx);

		getTasks.getAll(listTasks);
	});

	function actualLink(e) {
		document.querySelector('.actual').classList.remove('actual');
		e.target.classList.add('actual');
	};

	function actualBx(contentBx) {
		document.querySelector('.actualBx').classList.remove('actualBx');
		contentBx.classList.add('actualBx');
	};
	
	file.addEventListener('change', function(e) {
	    let data = e.target.files[0];

	    let titleFile = data.name.split('.');
	    title.value = titleFile[0];

	    const reader = new FileReader();
	    reader.readAsText(data);
	    reader.onload = function(e) {
	    	description.value = event.target.result;
	    };
	});
});