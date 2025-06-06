document.addEventListener('DOMContentLoaded', () => {
    // Configuración de tsParticles (https://particles.js.org/)
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 170 } },
            color: { value: ["#00f7ff", "#ff00f7", "#00ff7f"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true},
            line_linked: { enable: true, distance: 150, color: "#00f7ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 3, direction: "none", random: true, straight: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
});