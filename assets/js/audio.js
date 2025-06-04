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
    document.querySelectorAll('.star, .filter-btn, .legend__item, .bar').forEach(el => {
        el.addEventListener('mouseenter', () => sounds.hover.play());
    });
    
    // Clicks importantes
    document.querySelectorAll('.hero__cta, .filter-btn, .close').forEach(el => {
        el.addEventListener('click', () => sounds.click.play());
    });
    
    // Rotación automática
    document.getElementById('toggle-rotation').addEventListener('click', function() {
        sounds.activate.play();
        if (this.classList.contains('active')) {
            sounds.hover.play(); // Sonido adicional al activar
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', setupAudioInteractions);