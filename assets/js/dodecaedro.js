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