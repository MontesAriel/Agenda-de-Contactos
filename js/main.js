
const nombre = document.querySelector('.nombre');
const numero = document.querySelector('.numero');
const email = document.querySelector('.email');
const btnAgregarTarea = document.querySelector('.btn-agregar-tarea');
const listadoTareas = document.querySelector('.listado-tareas');

const db = window.localStorage;



const guardarContacto = (db, contacto) => {
    
    db.setItem(contacto.id, JSON.stringify(contacto));
    window.location.href = '/'
}

const cargarContactos = (db, parentNode) => {
    let claves = Object.keys(db);

    for(clave of claves) {
        let contacto = JSON.parse(db.getItem(clave))
        crearContacto(parentNode, contacto, db)
    }
}

const crearContacto = (parentNode, contacto, db) => {
    
    const {nombre, numero, email, id} = contacto;

    let divContacto = document.createElement('div');
    let nombreContacto = document.createElement('h3');
    let numeroContacto = document.createElement('p');
    let emailContacto = document.createElement('p');
    let iconoBorrar = document.createElement('svg')

    nombreContacto.innerHTML = nombre;
    numeroContacto.innerHTML = numero;
    emailContacto.innerHTML = email;

    
    iconoBorrar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="50" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" class="icon" />
                                class="icon"
                             </svg>`;

    divContacto.classList.add('tarea');
    

    divContacto.appendChild(nombreContacto);
    divContacto.appendChild(numeroContacto);
    divContacto.appendChild(emailContacto);
    divContacto.appendChild(iconoBorrar);

    parentNode.appendChild(divContacto);

    iconoBorrar.onclick = () => {
        db.removeItem(id);
        window.location.href = '/'
    }
}



btnAgregarTarea.onclick = (e) => {
    let contacto = {
        nombre: nombre.value,
        numero: numero.value,
        email: email.value,
        id: Math.random(1,100),
    }

    if((contacto.nombre === '') || (contacto.numero === '') || (contacto.email === '')) {
        alert('Por favor, ingresar bien los datos')
        e.event.preventDefault()
    }

   guardarContacto(db, contacto)
   
}


cargarContactos(db, listadoTareas)



