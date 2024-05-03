import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 70, 40);
scene.add(directionalLight);

// Loader untuk tekstur
const loader = new THREE.TextureLoader();
const textureFloor = loader.load('./floor.jpg');
const textureCabinet = loader.load('./kabinet.jpeg');

// Lantai
const size = 5;
const thickness = 0.3;
const geometryFloor = new THREE.BoxGeometry(size, thickness, size);
const materialFloor = new THREE.MeshStandardMaterial({ map: textureFloor, side: THREE.DoubleSide });
const floor = new THREE.Mesh(geometryFloor, materialFloor);
floor.position.y = -thickness / 2;
scene.add(floor);

// Lemari dengan sisi terbuka
const materialCabinet = new THREE.MeshStandardMaterial({ map: textureCabinet });
const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 1.2), materialCabinet);
base.position.set(-1.8, 0.05, -1.8);
const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.2), materialCabinet);
top.position.set(-1.8, 4.3, -1.8);
const side1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.3, 1.2), materialCabinet);
side1.position.set(-2.45, 2.15, -1.8);
const side2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.3, 1.2), materialCabinet);
side2.position.set(-1.15, 2.15, -1.8);
const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.35, 0.1), materialCabinet);
back.position.set(-1.8, 2.174, -2.45);

scene.add(base, top, side1, side2, back);

// Mengatur ukuran dan posisi kabinet baru
const cabinetLength = 2.5; // Panjang kabinet baru lebih panjang
const cabinetDepth = 1.2;  // Kedalaman sama seperti lemari

// Geometri untuk kabinet baru
const baseCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.48, 0.1, 1.2), materialCabinet);
baseCabinet.position.set(0, 0.05, -1.8);

const topCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.4 + 0.1, 0.1, cabinetDepth), materialCabinet);
topCabinet.position.set(0, 1.15, -1.8);

const backCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.65, 1.2, 0.1), materialCabinet);
backCabinet.position.set(0, 0.6, -2.45);

const sideCabinet1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1, 1.3), materialCabinet);
sideCabinet1.position.set(cabinetLength / 2, 0.6, -1.85); 

const sideCabinet2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1, 1.3), materialCabinet);
sideCabinet2.position.set(cabinetLength / 2 + 0.12 + 0.12, 0.6, -1.85); 

const sideCabinet3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 1.3), materialCabinet);
sideCabinet3.position.set(cabinetLength / 2 + 2 * (0.12 + 0.12), 0.6, -1.85); 

// Menambahkan kabinet baru ke scene
scene.add(baseCabinet, topCabinet, backCabinet);
scene.add(sideCabinet1, sideCabinet2, sideCabinet3);

// Penyesuaian posisi kabinet baru relatif terhadap lemari yang ada
baseCabinet.position.x = 2.24 / 3.5 + 0 / 2; // Menyambung di sisi kanan lemari
topCabinet.position.x = 2.21 / 3.5 + 0 / 2;
backCabinet.position.x = 1.6 / -2.3 + cabinetLength / 2;
sideCabinet1.position.x = cabinetLength / 2 + -0.011; 
sideCabinet2.position.x = cabinetLength / 2 + -1.33 + 0.12; 
sideCabinet3.position.x = cabinetLength / 2 + 4.96 * (0.12 + 0.12); 

// Definisi pintu
const doorWidth = 0.1;
const doorHeight = 3.8;
const doorDepth = 1.2;
const geometryDoor = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
const materialDoor = new THREE.MeshStandardMaterial({ map: textureCabinet });

// Group untuk pintu dengan pivot yang tepat
const doorGroup = new THREE.Group();
const door = new THREE.Mesh(geometryDoor, materialDoor);
door.position.set(-doorWidth / 2, 0, 0 / 2);
doorGroup.add(door);
doorGroup.position.set(-2.45 + doorWidth / 2, 2, -0.5);
scene.add(doorGroup);

// Status pintu
let doorOpen = false;
let doorRotationTarget = 0;
const doorRotationSpeed = 1;

// Fungsi untuk membuka dan menutup pintu
function toggleDoor() {
    doorOpen = !doorOpen;
    doorRotationTarget = doorOpen ? -Math.PI / 2 : 0;
}

// Interaksi pintu (misalnya ketika tombol ditekan)
function onKeyPress(event) {
    if (event.key === 'o') {
        if (!doorOpen) {
            toggleDoor();
        }
    } else if (event.key === 'c') { 
        if (doorOpen) {
            toggleDoor();
        }
    }
}

// Panggil fungsi onKeyPress saat tombol ditekan
document.addEventListener('keypress', onKeyPress);

// Fungsi untuk mengatur pergerakan kamera berdasarkan input keyboard
function handleKeyboardInput(event) {
    const moveSpeed = 0.1; // Kecepatan pergerakan kamera

    switch (event.key) {
        case 'w':
            camera.position.z -= moveSpeed; // Maju
            break;
        case 's':
            camera.position.z += moveSpeed; // Mundur
            break;
        case 'a':
            camera.position.x -= moveSpeed; // Kiri
            break;
        case 'd':
            camera.position.x += moveSpeed; // Kanan
            break;
    }
}

// Panggil fungsi handleKeyboardInput saat tombol ditekan
document.addEventListener('keydown', handleKeyboardInput);

// Mengatur posisi kamera
camera.position.set(5, 0.6 * 5, 5);
camera.lookAt(size / 3, 2, size / 3);

function animate() {
    const delta = clock.getDelta(); // Mendapatkan waktu yang berlalu
    if (Math.abs(doorGroup.rotation.y - doorRotationTarget) > 0.01) { // Tambahkan toleransi untuk perbandingan floating-point
        const step = delta * doorRotationSpeed * (doorGroup.rotation.y < doorRotationTarget ? 1 : -1);
        doorGroup.rotation.y += step;
        
        // Pastikan bahwa rotasi tidak melewati target
        if ((step > 0 && doorGroup.rotation.y > doorRotationTarget) || (step < 0 && doorGroup.rotation.y < doorRotationTarget)) {
            doorGroup.rotation.y = doorRotationTarget;
        }
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();