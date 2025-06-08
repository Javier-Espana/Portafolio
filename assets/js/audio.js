// Configuración de sonidos
const sounds = {
    hover: new Howl({
        src: ['assets/utils/sounds/beam.mp3'],
        volume: 0.7
    }),
    click: new Howl({
        src: ['assets/utils/sounds/click.mp3'],
        volume: 0.8
    }),
    activate: new Howl({
        src: ['assets/utils/sounds/activate.wav'],
        volume: 0.4,
        rate: 1.2
    }),
    background: new Howl({
        src: ['assets/utils/sounds/cancion.mp3'], 
        volume: 0.9,  
        loop: true
    })
};

// Efectos en elementos interactivos
function setupAudioInteractions() {
    // Inicia la canción de fondo
    sounds.background.play();

    const hoverElements = document.querySelectorAll('.star, .filter-btn, .legend__item, .bar');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => sounds.hover.play());
    });

    const clickElements = document.querySelectorAll('.hero__cta, .filter-btn, .close');
    clickElements.forEach(el => {
        el.addEventListener('click', () => sounds.click.play());
    });

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
