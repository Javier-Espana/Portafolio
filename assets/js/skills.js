// Datos de habilidades (personaliza aquí)
const skillsData = [
    { name: "JS", category: "frontend", level: 90, color: "#F7DF1E" },
    { name: "React", category: "frontend", level: 85, color: "#61DAFB" },
    { name: "Python", category: "backend", level: 80, color: "#3776AB" },
    { name: "TypeScript", category: "frontend", level: 80, color: "#3178C6" },
    { name: "Kotlin", category: "mobile", level: 55, color: "#F18E33" },
    { name: "Vue.js", category: "frontend", level: 60, color: "#42b883" }

];

function setupRadarRotation() {
    const radar = document.getElementById('radar-3d');
    if (!radar) return; // Verifica existencia
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    radar.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    // Resto del código...
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