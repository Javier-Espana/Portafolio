// Efecto máquina de escribir para el hero subtitle
document.addEventListener('DOMContentLoaded', () => {
    const phrases = ["Ingeniero de software", "Creador de realidades digitales"];
    const typeSpeed = 100; // ms por letra
    const deleteSpeed = 50;
    const pauseBetween = 1500;

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const el = document.getElementById("typewriter");
    if (!el) return;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        if (isDeleting) {
            currentCharIndex--;
            el.textContent = currentPhrase.substring(0, currentCharIndex);
        } else {
            currentCharIndex++;
            el.textContent = currentPhrase.substring(0, currentCharIndex);
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, pauseBetween);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }

        setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }

    type();
});

// Sistema Solar de Habilidades
document.addEventListener('DOMContentLoaded', () => {
    const planetsContainer = document.querySelector('.planets-container');
    if (!planetsContainer) return;

    const skills = [
        { name: "Python", level: 5, color: "#3776AB", orbitRadius: 90 },
        { name: "JavaScript", level: 4, color: "#F7DF1E", orbitRadius: 120 },
        { name: "React", level: 4, color: "#61DAFB", orbitRadius: 150 },
        { name: "Java", level: 5, color: "#FF0000", orbitRadius: 180 },
        { name: "Kotlin", level: 4, color: "#3CB043", orbitRadius: 130 }
    ];

    skills.forEach((skill, index) => {
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.style.width = `${20 + skill.level * 5}px`;
        planet.style.height = `${20 + skill.level * 5}px`;
        planet.style.setProperty('--planet-color', skill.color);
        planet.style.setProperty('--orbit-radius', skill.orbitRadius + 'px');
        planet.style.animation = `orbit ${8 + index * 2}s linear infinite`;
        planet.style.animationDelay = `${index * 0.5}s`;
        planet.style.top = '50%';
        planet.style.left = '50%';
        planet.style.transform = `rotate(0deg) translateX(${skill.orbitRadius}px) rotate(0deg)`;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `${skill.name}: ${'★'.repeat(skill.level)}`;
        tooltip.style.color = skill.color;
        planet.appendChild(tooltip);

        planet.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        planet.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        planetsContainer.appendChild(planet);
    });
});


// Efecto de distorsión para foto (Canvas API)
const photo = document.getElementById('distorted-photo');
if (photo) {
    const img = photo.querySelector('img');
    let canvas = null;
    let isPixelated = false;

    function pixelateImage(mouseX, mouseY) {
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.style.width = img.width + 'px';
            canvas.style.height = img.height + 'px';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            photo.appendChild(canvas);
        }
        const ctx = canvas.getContext('2d');
        // Nivel de pixelado depende de la posición del mouse
        const rect = photo.getBoundingClientRect();
        const relX = mouseX - rect.left;
        const relY = mouseY - rect.top;
        // Pixel size: más cerca del centro, más pixelado
        const maxPixel = 24;
        const minPixel = 4;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dist = Math.sqrt(Math.pow(relX - centerX, 2) + Math.pow(relY - centerY, 2));
        const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const pixelSize = Math.round(maxPixel - (maxPixel - minPixel) * (dist / maxDist));
        // Dibujar pixelado
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let w = canvas.width;
        let h = canvas.height;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, w / pixelSize, h / pixelSize);
        ctx.drawImage(canvas, 0, 0, w / pixelSize, h / pixelSize, 0, 0, w, h);
        canvas.style.opacity = '1';
        isPixelated = true;
    }

    photo.addEventListener('mousemove', (e) => {
        pixelateImage(e.clientX, e.clientY);
    });
    photo.addEventListener('mouseleave', () => {
        if (canvas) {
            canvas.style.opacity = '0';
        }
        isPixelated = false;
    });
    photo.addEventListener('mouseenter', (e) => {
        pixelateImage(e.clientX, e.clientY);
    });
}

// Generar constelación
function createConstellation() {
    const container = document.getElementById('constellation');
    if (!container) return;
    container.innerHTML = '';
    projects.forEach(project => {
        const star = document.createElement('div');
        star.className = `star ${project.type}`;
        star.style.left = `${project.position.x}%`;
        star.style.top = `${project.position.y}%`;
        star.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
        star.title = project.title;
        star.addEventListener('click', () => openModal(project));
        container.appendChild(star);

        // Efecto de sonido al pasar el mouse (requiere Howler.js y el archivo de sonido)
        if (typeof Howl !== 'undefined') {
            star.addEventListener('mouseenter', () => {
                const sound = new Howl({ src: ['assets/utils/sounds/hover-star.mp3'] });
                sound.play();
            });
        }
    });
}

document.getElementById('explore-cta').addEventListener('click', function(e) {
    e.preventDefault();
    const aboutSection = document.querySelector('.about');
    aboutSection.scrollIntoView({
        behavior: 'smooth'
    });
    
    const sound = new Howl({ src: ['assets/sounds/click.mp3'] });
    sound.play();
});