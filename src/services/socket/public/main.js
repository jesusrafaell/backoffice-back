const noteForm = document.querySelector('#noteForm');
const atrabajar = document.querySelector('#atrabajar');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

noteForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (savedId) {
		updateNote(savedId, title.value, description.value);
	} else {
		saveNote(title.value, description.value);
	}

	title.value = '';
	description.value = '';

	title.focus();
});

atrabajar.addEventListener('submit', (e) => {
	e.preventDefault();

	Pide();
});
