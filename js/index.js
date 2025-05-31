// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.innerHTML = `
        <i class="fas ${tipo === 'success' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${mensaje}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animación de entrada para elementos
function iniciarAnimaciones() {
    const elementosAnimados = document.querySelectorAll('.fade-in');
    elementosAnimados.forEach((elemento, index) => {
        setTimeout(() => {
            elemento.classList.add('visible');
        }, 200 * index);
    });
}

// Manejar scroll para mostrar notificaciones
let notificacionMostrada = false;

window.addEventListener('scroll', () => {
    const proyectos = document.querySelector('.projects-section');
    if (proyectos && !notificacionMostrada) {
        const rect = proyectos.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            mostrarNotificacion('Explora nuestros proyectos destacados', 'info');
            notificacionMostrada = true;
        }
    }
});

// Manejar clic en el botón CTA
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarNotificacion('¡Bienvenido a la comunidad!', 'success');
    setTimeout(() => {
        window.location.href = e.target.getAttribute('href');
    }, 1000);
});

// Iniciar animaciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', iniciarAnimaciones);

// Animación de scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observar elementos
const elementsToAnimate = document.querySelectorAll('.fade-in');

elementsToAnimate.forEach((el) => {
    observer.observe(el);
});
