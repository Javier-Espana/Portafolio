// Configuración de sonidos
const sounds = {
    hover: new Howl({
        src: ['assets/sounds/hover.wav'],
        volume: 0.3
    }),
    click: new Howl({
        src: ['assets/sounds/click.wav'],
        volume: 0.5
    }),
    activate: new Howl({
        src: ['assets/sounds/activate.wav'],
        volume: 0.4,
        rate: 1.2
    })
};

// Efectos en elementos interactivos
function setupAudioInteractions() {
    // Hover en estrellas/botones
    const hoverElements = document.querySelectorAll('.star, .filter-btn, .legend__item, .bar');
    if (hoverElements.length) {
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => sounds.hover.play());
        });
    }
    
    // Clicks importantes
    const clickElements = document.querySelectorAll('.hero__cta, .filter-btn, .close');
    if (clickElements.length) {
        clickElements.forEach(el => {
            el.addEventListener('click', () => sounds.click.play());
        });
    }
    
    // Rotación automática - Añade verificación de existencia
    const rotationToggle = document.getElementById('toggle-rotation');
    if (rotationToggle) {
        rotationToggle.addEventListener('click', function() {
            sounds.activate.play();
            if (this.classList.contains('active')) {
                sounds.hover.play();
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', setupAudioInteractions);