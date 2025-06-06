import './audio.js';

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
        { name: "JavaScript", level: 5, color: "#F7DF1E", orbitRadius: 120 },
        { name: "React", level: 4, color: "#61DAFB", orbitRadius: 150 },
        { name: "Three.js", level: 3, color: "#049EF4", orbitRadius: 180 }
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

// =====================
// PROYECTOS Y CONSTELACIÓN
// =====================

// Datos de proyectos
const projects = [
    {
        title: "Cyberpunk Dashboard",
        type: "web",
        tech: ["Three.js", "React"],
        video: "assets/utils/videos/demo1.mp4",
        github: "https://github.com/Javier-Espana/Portafolio",
        demo: "https://calicheoficial.lat/23361/Portafolio/index.html",
        description: "Panel de control con visualización 3D de datos.",
        position: { x: 20, y: 30 }
    },
    {
        title: "Neon Runner",
        type: "mobile",
        tech: ["Unity", "C#"],
        video: "assets/utils/videos/demo2.mp4",
        github: "https://github.com/javier-espana/neon-runner",
        demo: "https://neon-runner.demo/",
        description: "Juego móvil estilo endless runner con temática cyberpunk.",
        position: { x: 70, y: 60 }
    },
    {
        title: "HoloChat",
        type: "web",
        tech: ["Vue.js", "Socket.io"],
        video: "assets/utils/videos/demo1.mp4",
        github: "https://github.com/javier-espana/holochat",
        demo: "https://holochat.demo/",
        description: "Chat en tiempo real con interfaz holográfica.",
        position: { x: 40, y: 70 }
    },
    {
        title: "Synthwave Portfolio",
        type: "web",
        tech: ["HTML", "CSS", "JS"],
        video: "assets/utils/videos/demo2.mp4",
        github: "https://github.com/javier-espana/synthwave-portfolio",
        demo: "https://synthwave-portfolio.demo/",
        description: "Portafolio personal con estética synthwave y animaciones.",
        position: { x: 60, y: 20 }
    }
];

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

// Filtros
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.star').forEach(star => {
            star.style.display = filter === 'all' || star.classList.contains(filter)
                ? 'block'
                : 'none';
        });
    });
});

// Modal
function openModal(project) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.description;
    const video = document.getElementById('modal-video');
    video.src = project.video;
    video.poster = `assets/utils/images/${project.type}-placeholder.jpg`;
    document.getElementById('modal-github').href = project.github;
    document.getElementById('modal-demo').href = project.demo;
    modal.style.display = 'block';
}

const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById('project-modal').style.display = 'none';
        document.getElementById('modal-video').pause();
    });
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    createConstellation();
});

// Datos de habilidades (personaliza aquí)
const skillsData = [
    { name: "JavaScript", category: "frontend", level: 90, color: "#F7DF1E" },
    { name: "React", category: "frontend", level: 85, color: "#61DAFB" },
    { name: "Three.js", category: "frontend", level: 75, color: "#049EF4" },
    { name: "Python", category: "backend", level: 80, color: "#3776AB" },
    { name: "Node.js", category: "backend", level: 70, color: "#68A063" },
    { name: "UI/UX", category: "design", level: 65, color: "#FF4081" },
    { name: "TypeScript", category: "frontend", level: 80, color: "#3178C6" },
    { name: "Django", category: "backend", level: 60, color: "#092E20" },
    { name: "Figma", category: "design", level: 60, color: "#A259FF" },
    { name: "Kotlin", category: "mobile", level: 55, color: "#F18E33" },
    { name: "Unity", category: "mobile", level: 50, color: "#222C37" },
    { name: "Vue.js", category: "frontend", level: 60, color: "#42b883" }
];

// Crear radar 3D
async function create3DRadar() {
    const radar = document.getElementById('radar-3d');
    if (!radar) return;
    radar.innerHTML = '';
    const radius = 100;
    skillsData.forEach((skill, i) => {
        // Distribuir puntos en el espacio 3D
        const angle = (i / skillsData.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius * (skill.level / 100);
        const y = Math.sin(angle) * radius * (skill.level / 100);
        const z = (Math.random() - 0.5) * 80;
        const point = document.createElement('div');
        point.className = 'skill-point';
        point.style.background = skill.color;
        point.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        point.title = skill.name;
        // Zoom al hacer click
        point.addEventListener('click', () => {
            radar.style.transform = `translate3d(${-x}px, ${-y}px, ${-z}px) rotateX(20deg) rotateY(30deg)`;
        });
        // Tooltip
        point.addEventListener('mouseenter', showTooltip);
        point.addEventListener('mouseleave', hideTooltip);
        radar.appendChild(point);
        // Líneas de conexión (opcional, simple)
        if (i > 0) {
            const prev = radar.children[i-1];
            const line = document.createElement('div');
            line.className = 'skill-line';
            line.style.position = 'absolute';
            line.style.background = 'rgba(0,247,255,0.3)';
            line.style.width = '2px';
            line.style.height = `${Math.sqrt(Math.pow(x - (Math.cos((i-1)/skillsData.length*2*Math.PI)*radius*(skillsData[i-1].level/100)),2) + Math.pow(y - (Math.sin((i-1)/skillsData.length*2*Math.PI)*radius*(skillsData[i-1].level/100)),2) + Math.pow(z - ((Math.random()-0.5)*80),2))}px`;
            // Para una visualización avanzada, usar SVG o Three.js
            radar.appendChild(line);
        }
    });
    // Añadir datos de GitHub
    if (typeof integrateGitHubData === 'function') {
        await integrateGitHubData();
    }
}

// Rotación con mouse
function setupRadarRotation() {
    const radar = document.getElementById('radar-3d');
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    radar.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        radar.style.transform = `
            rotateX(${20 + deltaY * 0.2}deg) 
            rotateY(${30 + deltaX * 0.2}deg)
        `;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Filtrado por categoría
function setupCategoryFilters() {
    document.querySelectorAll('.legend__item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.skill;
            
            document.querySelectorAll('.skill-point').forEach(point => {
                if (category === 'all' || point.classList.contains(category)) {
                    point.style.display = 'block';
                    point.style.animation = 'highlight 0.5s forwards';
                } else {
                    point.style.display = 'none';
                }
            });
        });
    });
}

// Tooltips
function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    
    document.body.appendChild(tooltip);
    
    const updatePosition = () => {
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 40}px`;
    };
    
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    
    e.target._tooltip = { element: tooltip, update: updatePosition };
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        document.body.removeChild(e.target._tooltip.element);
        window.removeEventListener('scroll', e.target._tooltip.update);
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    create3DRadar();
    setupRadarRotation();
    setupCategoryFilters();
});




//Dodecaedro
const container = document.getElementById('dodecahedron-container');
const scene = new THREE.Scene();
scene.background = null;
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.DodecahedronGeometry(1.5);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff, // cian neón
    wireframe: true,
    emissive: 0x00ffff,
    emissiveIntensity: 0.4
});

const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});