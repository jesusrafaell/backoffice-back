const socket = io.connect();

/**
 * create a new note
 * @param {string} title a title for a new note
 * @param {string} description a description for a new note
 */
const saveNote = (title, description) => {
	socket.emit('client:newnote', {
		title,
		description,
	});
};

/**
 * delete a note based on an Id
 * @param {string} id a note ID
 */
const deleteNote = (id) => {
	socket.emit('client:deletenote', id);
};

/**
 *
 * @param {string} id note ID
 * @param {string} title note title
 * @param {string} description note description
 */
const updateNote = (id, title, description) => {
	socket.emit('client:updatenote', {
		id,
		title,
		description,
	});
};

socket.on('server:loadnotes', renderNotes);

//Solicitude
socket.on('server:solicitudes', renderSolic);

//Solicitud Trabajando
socket.on('server:atrabajar', renderSolicTrabajando);

//Solicitudes Trabajando incluso con Diferidos
socket.on('server:solicitudesTrabajando', renderSolicitudesTrabajando);
socket.on('server:diferidoTranbajando', renderSolicitudesDIferidasTrabajando);

//DashData
socket.on('server:dashdata', renderDashData);

//Diferidos
socket.on('server:loadDiferidos', renderDiferido);

//Diferidos Trabajando
socket.on('server:diferidostomado', renderDiferidoTrabajando);

//Pedir uno
const Pide = () => {
	socket.emit('client:atrabajar', {
		name: 'Aldrin ',
		last_name: 'Mendoza',
		cedula: '20489083',
	});
};

//Tomar diferido
const Toma = (id) => {
	socket.emit(
		'cliente:trabanjandoDiferido',
		{
			name: 'Aldrin ',
			last_name: 'Mendoza',
			cedula: '20489083',
		},
		id
	);
};

//Disconect
const disconect = () => {
	socket.emit('cliente:disconnect');
};

// socket.on('server:newnote', appendNote);

socket.on('server:selectednote', (note) => {
	const title = document.getElementById('id');
	const description = document.getElementById('description');

	title.value = note.title;
	description.value = note.description;

	savedId = note.id;
});

// socket.on('server:solicitudes', (solicitudes) => {
// 	const title = document.getElementById('id');
// 	const description = document.getElementById('description');

// 	title.value = solicitudes.title;
// 	description.value = note.description;

// 	savedId = note.id;
// });
