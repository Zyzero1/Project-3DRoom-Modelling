import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 70, 40);  // Menyesuaikan posisi sesuai kebutuhan
scene.add(directionalLight);

// Loader untuk tekstur
const loader = new THREE.TextureLoader();
const texture = loader.load('./floor.jpg', function(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);  // Mengulang tekstur di lantai
    texture.needsUpdate = true; // Memastikan tekstur di-update setelah dimuat
});

// Lantai dengan ketebalan
const size = 5;  // Mengatur panjang dan lebar lantai
const thickness = 0.3;  // Ketebalan lantai
const geometryFloor = new THREE.BoxGeometry(size, thickness, size);
const materialFloor = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide
});
const floor = new THREE.Mesh(geometryFloor, materialFloor);
floor.position.y = -thickness / 2; // Posisikan lantai agar 'dasarnya' berada di y = 0
scene.add(floor);

const textureCabinet = loader.load('./kabinet.jpeg');  
const geometryCabinet = new THREE.BoxGeometry(1.5, 4, 1.3);  // Lebar, tinggi, kedalaman
const materialCabinet = new THREE.MeshStandardMaterial({ map: textureCabinet, color: 0xffffff, emissive: 0x777777 });
const cabinet = new THREE.Mesh(geometryCabinet, materialCabinet);
cabinet.position.set(-1.75, 2, -1.75);  // Posisikan di sudut lantai
scene.add(cabinet);

// Ruang dalam pada lemari
const frameThickness = 0.1;  
const frameColor = 0x333333;  
const innerWidth = 1.5 - 2 * frameThickness;  // Lebar ruang dalam
const innerHeight = 4 - 2 * frameThickness;  // Tinggi ruang dalam
const innerDepth = 1.5 - 2 * frameThickness;  // Kedalaman ruang dalam
const geometryFrame = new THREE.BoxGeometry(innerWidth, innerHeight, innerDepth);
const materialFrame = new THREE.MeshStandardMaterial({ color: frameColor });
const frame = new THREE.Mesh(geometryFrame, materialFrame);
frame.position.set(-1.75, 2, -1.75);  
scene.add(frame);

// Mengatur posisi kamera
camera.position.set(5, 0.6 * 5, 5);  // Posisi kamera dari sudut atas
camera.lookAt(size / 3, 2, size / 3);  // Kamera melihat ke tengah lantai

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();