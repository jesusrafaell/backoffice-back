const notesList = document.querySelector('#notes');
const notesList2 = document.querySelector('#solicitudes');
const solicitudesTrabajando = document.querySelector('#histotico');
const solicitudesTrabajando2 = document.querySelector('#histoticoDife');
const dashData = document.querySelector('#dashdata');
const diferido = document.querySelector('#diferido');
const diferidoTrabajando = document.querySelector('#diferidoTrabajando');

let savedId = '';

const noteUI = (note) => {
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note.id}">delete</button>
              <button class="btn btn-secondary update" data-id="${note.id}">update</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>
`;
	const btnDelete = div.querySelector('.delete');
	const btnUpdate = div.querySelector('.update');

	btnDelete.addEventListener('click', () => deleteNote(btnDelete.dataset.id));

	btnUpdate.addEventListener('click', () => {
		socket.emit('client:getnote', btnUpdate.dataset.id);
	});

	return div;
};

const solicUI = (note) => {
	if ((note.leng = 0)) {
		const div = document.createElement('div');
		div.innerHTML = '';
		return div;
	}
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.id}</h1>
      </div>
      <p>${note.code}</p>
  </div>
`;

	return div;
};

const solicTrabajandoUI = (note) => {
	// console.log(!note);

	if (!note) {
		const div = document.createElement('div');
		div.innerHTML = '';
		return div;
	}
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.id}</h1>
		  <div>
              <button class="btn btn-danger disconect" data-id="${note.id}">disconect</button>
          </div>
          
      </div>
      <p>${note.code}</p>
  </div>
`;
	const btnDisconet = div.querySelector('.disconect');
	btnDisconet.addEventListener('click', () => disconect());

	return div;
};

const solicitudesTrabajandoUI = (note) => {
	console.log(note);

	if ((note.leng = 0)) {
		const div = document.createElement('div');
		div.innerHTML = '';
		return div;
	}
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">Solicitud tomada por ${note.name} ${note.last_name}</h1>
          
      </div>
      <p>Codigo de Solicitud: ${note.code}</p>
  </div>
`;

	return div;
};

const renderDiferidoUI = (note) => {
	// console.log('Diferidos', note);

	if (!note) {
		const div = document.createElement('div');
		div.innerHTML = '';
		return div;
	}
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.id}</h1>
		  <div>
              <button class="btn btn-danger Tomar" data-id="${note.id}">Tomar</button>
          </div>
          
      </div>
      <p>${note.code}</p>
  </div>
`;
	const btnTomar = div.querySelector('.Tomar');
	btnTomar.addEventListener('click', () => Toma(btnTomar.dataset.id));

	return div;
};

const renderDiferidoTrabajandoUI = (note) => {
	// console.log('Diferido tomado', note);

	if (!note) {
		const div = document.createElement('div');
		div.innerHTML = '';
		return div;
	}
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.id}</h1>
		  <div>
              <button class="btn btn-danger disconect" data-id="${note.id}">disconect</button>
          </div>
          
      </div>
      <p>${note.code}</p>
  </div>
`;
	const btnDisconet = div.querySelector('.disconect');
	btnDisconet.addEventListener('click', () => disconect());

	return div;
};

const dashUI = (data) => {
	// console.log(data);
	const { diferidos, diferidosTranbajando, solicitudes, solicitudesTrabajando } = data;

	const div = document.createElement('div');
	div.innerHTML = `
  <div class="mb-2">
  	<div class="d-flex justify-content-between">
          <h1 class="card-title h3">D</h1>
		  <h1 class="card-title h3">DT</h1>
		  <h1 class="card-title h3">S</h1>
		  <h1 class="card-title h3">ST</h1>
      </div>
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${diferidos}</h1>
		  <h1 class="card-title h3">${diferidosTranbajando}</h1>
		  <h1 class="card-title h3">${solicitudes}</h1>
		  <h1 class="card-title h3">${solicitudesTrabajando}</h1>
      </div>
      
  </div>
`;

	return div;
};

const renderNotes = (notes) => {
	savedId = '';
	notesList.innerHTML = '';
	// console.log(notes);
	notes.forEach((note) => {
		notesList.append(noteUI(note));
	});
};

//Solicitudes
const renderSolic = (solicitudes) => {
	savedId = '';
	notesList.innerHTML = '';
	// console.log(solicitudes);
	solicitudes.forEach((note) => {
		notesList.append(solicUI(note));
	});
};

//Solicitud Trabajndo
const renderSolicTrabajando = (solicitudes) => {
	if (solicitudes.code !== 400) {
		savedId = '';
		notesList2.innerHTML = '';
		console.log(solicitudes.code);

		notesList2.append(solicTrabajandoUI(solicitudes));
	} else {
		// console.log('No hay Solicitudes');
		alert('No hay Solicitudes');
	}
};

//Solicitudes Trabajndo
const renderSolicitudesTrabajando = (solicitudes) => {
	savedId = '';
	solicitudesTrabajando.innerHTML = '';
	// console.log(solicitudes);
	solicitudes.forEach((note) => {
		solicitudesTrabajando.append(solicitudesTrabajandoUI(note));
	});
};

//Solicitudes Diferidas Trabajndo
const renderSolicitudesDIferidasTrabajando = (solicitudes) => {
	savedId = '';
	solicitudesTrabajando2.innerHTML = '';
	// console.log(solicitudes);
	solicitudes.forEach((note) => {
		solicitudesTrabajando2.append(solicitudesTrabajandoUI(note));
	});
};

//Diferidos
const renderDiferido = (data) => {
	savedId = '';
	diferido.innerHTML = '';
	// console.log(solicitudes);
	data.forEach((note) => {
		diferido.append(renderDiferidoUI(note));
	});
};

//Diferido Trabajndo
const renderDiferidoTrabajando = (solicitudes) => {
	// console.log(solicitudes);
	savedId = '';
	diferidoTrabajando.innerHTML = '';

	diferidoTrabajando.append(renderDiferidoTrabajandoUI(solicitudes));
};

//dashdata 4 cuadras de datas
const renderDashData = (data) => {
	savedId = '';
	dashData.innerHTML = '';
	// console.log(solicitudes);

	dashData.append(dashUI(data));
};

const appendNote = (note) => {
	notesList.append(noteUI(note));
};
