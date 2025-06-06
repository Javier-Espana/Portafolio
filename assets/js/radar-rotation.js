// Control de auto-rotación y velocidad para el radar 3D
// lastStoppedAngle guarda el ángulo cuando se detiene la rotación
// ROTATION_SPEED se puede ajustar con los botones de speed-control

let rotationInterval;
let rotationAngle = 0;
let lastStoppedAngle = 0;
let ROTATION_SPEED = 0.3; // Grados por frame

function startAutoRotation() {
    const radar = document.getElementById('radar-3d');
    rotationInterval = setInterval(() => {
        rotationAngle += ROTATION_SPEED;
        radar.style.transform = `rotateX(20deg) rotateY(${rotationAngle}deg)`;
    }, 30); // ~60 FPS
}

function stopAutoRotation() {
    clearInterval(rotationInterval);
    // Guarda el ángulo actual para continuar después
    lastStoppedAngle = rotationAngle;
}

// Modifica setupRotationControl en radar-rotation.js
function setupRotationControl() {
    const toggleBtn = document.getElementById('toggle-rotation');
    if (!toggleBtn) return; // Verifica si existe
    
    toggleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            rotationAngle = lastStoppedAngle || 0;
            startAutoRotation();
        } else {
            stopAutoRotation();
        }
    });
}

// Controles de velocidad
function setupSpeedControl() {
    document.querySelectorAll('#speed-control button').forEach(btn => {
        btn.addEventListener('click', () => {
            ROTATION_SPEED = parseFloat(btn.dataset.speed);
            if (typeof sounds !== 'undefined' && sounds.click) sounds.click.play();
        });
    });
}

// Integración con el control por ratón existente
function setupRadarRotation() {
    const radar = document.getElementById('radar-3d');
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let manualRotation = false;

    radar.addEventListener('mousedown', (e) => {
        isDragging = true;
        manualRotation = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
        stopAutoRotation();
        document.getElementById('toggle-rotation').classList.remove('active');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMousePos.x;
        rotationAngle += deltaX * 0.3;
        lastStoppedAngle = rotationAngle;
        radar.style.transform = `rotateX(20deg) rotateY(${rotationAngle}deg)`;
        prevMousePos = { x: e.clientX, y: e.clientY };
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        setTimeout(() => manualRotation = false, 2000);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupRotationControl();
    setupRadarRotation();
    setupSpeedControl();
});