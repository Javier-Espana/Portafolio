import './audio.js';


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
    // Verifica que los elementos existan antes de intentar inicializarlos
    if (document.getElementById('radar-3d')) {
        create3DRadar();
        setupRadarRotation();
        setupCategoryFilters();
    }
    
    createConstellation();
});




