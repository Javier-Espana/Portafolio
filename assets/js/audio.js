// Configuración de sonidos
const sounds = {
    hover: new Howl({
        src: ['../utils/sounds/beam.mp3'],
        volume: 0.3
    }),
    click: new Howl({
        src: ['../utils/sounds/click.mp3'],
        volume: 0.5
    }),
    activate: new Howl({
        src: ['../utils/sounds/activate.wav'],
        volume: 0.4,
        rate: 1.2
    })
};

// Efectos en elementos interactivos
function setupAudioInteractions() {
    // Verifica existencia de elementos antes de agregar eventos
    const hoverElements = document.querySelectorAll('.star, .filter-btn, .legend__item, .bar');
    if (hoverElements.length > 0) {
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => sounds.hover.play());
        });
    }
    
    const clickElements = document.querySelectorAll('.hero__cta, .filter-btn, .close');
    if (clickElements.length > 0) {
        clickElements.forEach(el => {
            el.addEventListener('click', () => sounds.click.play());
        });
    }
    
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


const exploreBtn = document.getElementById('explore-cta');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        sounds.click.play();
        sounds.hover.play(); // suena también el efecto hover
    });
}
