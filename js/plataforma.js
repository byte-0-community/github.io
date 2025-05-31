// Almacenamiento de datos
const miembros = [];
const estadisticas = {
    totalMiembros: 16,
    totalProyectos: 0,
    colaboraciones: 0
};

// Datos de ejemplo de proyectos
const proyectos = [
    {
        id: 1,
        nombre: "Análisis de Vulnerabilidades",
        descripcion: "Proyecto para identificar y documentar vulnerabilidades en sistemas web",
        autor: "@Byte_0",
        estado: "en_progreso",
        colaboradores: ["@CyberHawk", "@Reverser"],
        archivos: []
    },
    {
        id: 2,
        nombre: "Desarrollo de Exploits",
        descripcion: "Desarrollo de exploits para sistemas vulnerables",
        autor: "@CyberHawk",
        estado: "completado",
        colaboradores: ["@Byte_0"],
        archivos: []
    }
];

// Datos de integrantes
const integrantes = [
    {
        id: 1,
        nombre: "@Byte_0",
        especialidad: "Experto en Exploit Development",
        descripcion: "Desarrollo de exploits para sistemas vulnerables",
        avatar: "fa-user-secret"
    },
    {
        id: 2,
        nombre: "@CyberHawk",
        especialidad: "Forensic Analyst",
        descripcion: "Análisis forense de malware y sistemas comprometidos",
        avatar: "fa-shield-alt"
    },
    {
        id: 3,
        nombre: "@Reverser",
        especialidad: "Reverse Engineer",
        descripcion: "Análisis y descompilación de software",
        avatar: "fa-code"
    },
    {
        id: 4,
        nombre: "@BugHunter",
        especialidad: "Bug Bounty Hunter",
        descripcion: "Identificación y reporte de vulnerabilidades",
        avatar: "fa-bug"
    }
];

// Datos por defecto de los miembros
const miembrosPorDefecto = [
    {
        id: 1,
        nombre: "Byte_0",
        especialidad: "Desarrollo de exploits",
        foto: "https://avatars.githubusercontent.com/u/1?v=4",
        proyectos: []
    },
    {
        id: 2,
        nombre: "CyberHawk",
        especialidad: "Análisis forense",
        foto: "https://avatars.githubusercontent.com/u/2?v=4",
        proyectos: []
    },
    // ... más miembros por defecto
];

// Función para mostrar detalles de integrante
function mostrarDetallesIntegrante(integrante) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-avatar">
                    <i class="fas ${integrante.avatar}"></i>
                </div>
                <h2>${integrante.nombre}</h2>
            </div>
            <div class="modal-body">
                <p><strong>Especialidad:</strong> ${integrante.especialidad}</p>
                <p><strong>Descripción:</strong> ${integrante.descripcion}</p>
                <div class="proyectos-asociados">
                    <h3>Proyectos Asociados</h3>
                    <ul>
                        ${proyectos.filter(p => p.autor === integrante.nombre || p.colaboradores.includes(integrante.nombre))
                            .map(p => `<li>${p.nombre} (${p.estado})</li>`)
                            .join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="cerrarModal()">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(tipo, mensaje) {
    const notificacion = document.getElementById(`${tipo}Notification`);
    if (notificacion) {
        notificacion.querySelector('.message').textContent = mensaje;
        notificacion.style.display = 'flex';
        
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 3000);
    }
}

// Función para agregar proyecto
function agregarProyecto() {
    const nombre = prompt('Nombre del proyecto:');
    const descripcion = prompt('Descripción del proyecto:');
    
    if (nombre && descripcion) {
        const nuevoProyecto = {
            id: Date.now(),
            nombre,
            descripcion,
            autor: prompt('Tu nombre de usuario:'),
            estado: 'en_progreso',
            colaboradores: [],
            archivos: []
        };
        
        proyectos.push(nuevoProyecto);
        actualizarProyectos();
        mostrarNotificacion('success', 'Proyecto agregado exitosamente');
    }
}

// Función para actualizar la lista de proyectos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar estadísticas
    actualizarEstadisticas();
    
    // Eventos para las tarjetas del equipo
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            const nombre = card.querySelector('h3').textContent;
            const integrante = integrantes.find(i => i.nombre === nombre);
            if (integrante) {
                mostrarDetallesIntegrante(integrante);
            }
        });
    });
    
    // Evento para el botón de agregar proyecto
    const botonAgregar = document.createElement('button');
    botonAgregar.className = 'boton-agregar';
    botonAgregar.innerHTML = `
        <i class="fas fa-plus"></i>
        Agregar Proyecto
    `;
    botonAgregar.addEventListener('click', agregarProyecto);
    document.querySelector('.projects-container').insertAdjacentElement('afterbegin', botonAgregar);
});

// Inicialización de la sección del equipo
document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        integrantes.forEach(integrante => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <div class="team-avatar">
                    <i class="fas ${integrante.avatar}"></i>
                </div>
                <h3>${integrante.nombre}</h3>
                <p>${integrante.especialidad}</p>
                <p>${integrante.descripcion}</p>
            `;
            
            card.addEventListener('click', () => {
                mostrarDetallesIntegrante(integrante);
            });
            
            teamGrid.appendChild(card);
        });
    }
});

// Funciones de utilidad
function mostrarNotificacion(tipo, mensaje) {
    const notificacion = document.getElementById(`${tipo}Notification`);
    const mensajeElement = notificacion.querySelector('.message');
    
    mensajeElement.textContent = mensaje;
    notificacion.classList.add('active');
    
    setTimeout(() => {
        notificacion.classList.remove('active');
    }, 3000);
}

function actualizarEstadisticas() {
    const totalTrabajos = alumnos.reduce((total, alumno) => total + alumno.trabajos.length, 0);
    const trabajosCompletados = alumnos.reduce((total, alumno) => 
        total + (alumno.trabajos.length > 0 ? 1 : 0), 0);
    
    estadisticas.totalTrabajos = totalTrabajos;
    estadisticas.trabajosCompletados = trabajosCompletados;
    
    document.querySelectorAll('.stat-value').forEach(stat => {
        const label = stat.nextElementSibling.textContent;
        switch (label) {
            case 'Trabajos Totales':
                stat.textContent = totalTrabajos;
                break;
            case 'Trabajos Completados':
                stat.textContent = trabajosCompletados;
                break;
        }
    });
}

// Inicialización de datos
function inicializarMiembros() {
    // Cargar miembros por defecto si no hay datos guardados
    const datosGuardados = localStorage.getItem('plataformaMiembros');
    if (!datosGuardados) {
        miembros.push(...miembrosPorDefecto);
        guardarDatos();
    } else {
        const parsed = JSON.parse(datosGuardados);
        for (const m of miembrosPorDefecto) {
            const encontrado = parsed.find(x => x.id === m.id);
            if (encontrado) {
                miembros.push(encontrado);
            } else {
                miembros.push(m);
            }
        }
    }
    actualizarEstadisticas();
}

// Cargar datos desde localStorage
function cargarDatos() {
    const datos = localStorage.getItem('plataformaProyectos');
    if (datos) {
        const parsed = JSON.parse(datos);
        for (const p of proyectos) {
            const encontrado = parsed.find(x => x.id === p.id);
            if (encontrado) {
                p.nombre = encontrado.nombre;
                p.descripcion = encontrado.descripcion;
                p.estado = encontrado.estado;
                p.colaboradores = encontrado.colaboradores;
                p.archivos = encontrado.archivos;
            }
        }
    }
}

// Guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('plataformaProyectos', JSON.stringify(proyectos));
    actualizarEstadisticas();
}

// Crear tarjeta de proyecto
function crearProyectoCard(proyecto) {
    const card = document.createElement('div');
    card.className = 'proyecto-card';
    card.innerHTML = `
        <div class="proyecto-header">
            <i class="fas fa-project-diagram"></i>
            <h3>${proyecto.nombre}</h3>
        </div>
        <p>${proyecto.descripcion}</p>
        <div class="proyecto-info">
            <div class="autor">
                <i class="fas fa-user"></i>
                <span>${proyecto.autor}</span>
            </div>
            <div class="estado">
                <i class="fas fa-circle"></i>
                <span class="estado-text">${proyecto.estado}</span>
            </div>
        </div>
        <div class="colaboradores">
            <i class="fas fa-users"></i>
            <span>Colaboradores: ${proyecto.colaboradores.join(', ')}</span>
        </div>
        <div class="archivos-list">
            <h4>Archivos:</h4>
            <ul>
                ${proyecto.archivos.map(archivo => `<li>${archivo}</li>`).join('')}
            </ul>
        </div>
        <div class="proyecto-actions">
            <button onclick="agregarArchivo(${proyecto.id})">Agregar Archivo</button>
            <button onclick="eliminarProyecto(${proyecto.id})">Eliminar</button>
        </div>
    `;

    // Event listeners para actualizar datos
    card.querySelector('h3').addEventListener('click', () => {
        mostrarModal(proyecto);
            alumno.trabajos.push({ nombre: file.name, data: ev.target.result });
            guardarDatos();
            mostrarNotificacion('success', 'Trabajo subido correctamente');
            actualizarTrabajos(card, alumno);
        }
        reader.readAsDataURL(file);
        trabajoInput.value = '';
    });

    // Manejar eliminación de trabajos
    card.querySelectorAll('.eliminar-trabajo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const index = e.target.dataset.index;
            const trabajo = alumnos.find(a => a.id == id).trabajos[index];
            
            if (confirm(`¿Estás seguro de eliminar el trabajo "${trabajo.nombre}"?`)) {
                alumnos.find(a => a.id == id).trabajos.splice(index, 1);
                guardarDatos();
                mostrarNotificacion('success', 'Trabajo eliminado correctamente');
                actualizarTrabajos(card, alumnos.find(a => a.id == id));
            }
        });
    });

    return card;


// Actualizar lista de trabajos
function actualizarTrabajos(card, alumno) {
    const trabajosList = card.querySelector('.trabajos-list ul');
    trabajosList.innerHTML = '';
    
    if (alumno.trabajos.length === 0) {
        trabajosList.textContent = 'No hay trabajos subidos.';
        return;
    }

    alumno.trabajos.forEach((trabajo, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = trabajo.data;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = trabajo.nombre;

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'eliminar-trabajo';
        btnEliminar.dataset.id = alumno.id;
        btnEliminar.dataset.index = i;
        btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';
        
        li.appendChild(a);
        li.appendChild(btnEliminar);
        trabajosList.appendChild(li);
    });
}

// Cargar página
function cargarPagina() {
    inicializarAlumnos();
    cargarDatos();
    const container = document.getElementById('alumnosContainer');
    container.innerHTML = '';
    
    // Mostrar tarjetas de carga mientras se cargan los datos
    for (let i = 0; i < estadisticas.totalAlumnos; i++) {
        const card = document.createElement('div');
        card.className = 'alumno-card loading';
        container.appendChild(card);
    }
    
    // Reemplazar tarjetas de carga con las reales después de 500ms
    setTimeout(() => {
        container.innerHTML = '';
        alumnos.forEach(alumno => {
            const card = crearAlumnoCard(alumno);
            container.appendChild(card);
        });
    }, 500);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', cargarPagina);
