import * as THREE from 'three';
import { camera } from './camera.js';

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0, 70, 40);
directionalLight.castShadow = true; // Aktifkan bayangan untuk cahaya
directionalLight.shadow.mapSize.width = 4048; // Atur ukuran peta bayangan
directionalLight.shadow.mapSize.height = 4048;
directionalLight.shadow.camera.near = 0.5; // Atur rentang bayangan kamera
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

// Loader untuk tekstur
const loader = new THREE.TextureLoader();
const textureFloor = loader.load('textures/floor_texture.png');
const textureCabinet = loader.load('textures/cabinet_texture.png');
const textureLamp = loader.load('textures/lamp_texture.png');
const textureBeanBag = loader.load('textures/beanbag_texture.jpg');

// Lantai
const size = 5;
const thickness = 0.3;
const geometryFloor = new THREE.BoxGeometry(size, thickness, size);
const materialFloor = new THREE.MeshStandardMaterial({ map: textureFloor, side: THREE.DoubleSide });
const floor = new THREE.Mesh(geometryFloor, materialFloor);
floor.position.y = -thickness / 2;
floor.receiveShadow = true;
scene.add(floor);

// Lemari dengan sisi terbuka
const materialCabinet = new THREE.MeshStandardMaterial({ map: textureCabinet });
const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 1.2), materialCabinet);
base.position.set(-1.8, 0.05, -1.8);
base.castShadow = true;
base.receiveShadow = true;

const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.2), materialCabinet);
top.position.set(-1.8, 4.3, -1.8);
top.castShadow = true;
top.receiveShadow = true;

const side1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.3, 1.2), materialCabinet);
side1.position.set(-2.45, 2.15, -1.8);
side1.castShadow = true;
side1.receiveShadow = true;

const side2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.3, 1.2), materialCabinet);
side2.position.set(-1.15, 2.15, -1.8);
side2.castShadow = true;
side2.receiveShadow = true;


const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.35, 0.1), materialCabinet);
back.position.set(-1.8, 2.174, -2.45);
back.castShadow = true;
back.receiveShadow = true;

scene.add(base, top, side1, side2, back);

// Ukuran dan posisi silinder
const cylinderRadius = 0.05;
const cylinderHeight = 1.2; 
const cylinderPositionY = 3.8; 
const cylinderPositionZ = -1.8; 

// Membuat silinder untuk gantungan baju
const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Menggunakan material abu-abu
const hangerCylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Mengatur posisi dan rotasi silinder
hangerCylinder.position.set(-1.8, cylinderPositionY, cylinderPositionZ);
hangerCylinder.rotation.z = Math.PI / 2; // Rotasi silinder agar sesuai dengan posisi horizontal

// Menambahkan silinder ke dalam scene
scene.add(hangerCylinder);

// Mengatur ukuran dan posisi kabinet baru
const cabinetLength = 2.5; // Panjang kabinet baru lebih panjang
const cabinetDepth = 1.2;  // Kedalaman sama seperti lemari

// Geometri untuk kabinet baru
const baseCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.48, 0.1, 1.2), materialCabinet);
baseCabinet.position.set(0, 0.05, -1.8);
baseCabinet.castShadow = true;
baseCabinet.receiveShadow = true;

const topCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.45 + 0.1, 0.1, cabinetDepth), materialCabinet);
topCabinet.position.set(0, 1.15, -1.8);
topCabinet.castShadow = true;
topCabinet.receiveShadow = true;

const backCabinet = new THREE.Mesh(new THREE.BoxGeometry(3.67, 1.2, 0.1), materialCabinet);
backCabinet.position.set(0, 0.6, -2.45);
backCabinet.castShadow = true;
backCabinet.receiveShadow = true;

const sideCabinet1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1, 1.3), materialCabinet);
sideCabinet1.position.set(cabinetLength / 2, 0.6, -1.85);
sideCabinet1.castShadow = true;
sideCabinet1.receiveShadow = true; 

const sideCabinet2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1, 1.3), materialCabinet);
sideCabinet2.position.set(cabinetLength / 2 + 0.12 + 0.12, 0.6, -1.85);
sideCabinet2.castShadow = true;
sideCabinet2.receiveShadow = true;

const sideCabinet3 = new THREE.Mesh(new THREE.BoxGeometry(0.17, 1.2, 1.3), materialCabinet);
sideCabinet3.position.set(cabinetLength / 2 + 2 * (0.12 + 0.12), 0.6, -1.85);
sideCabinet3.castShadow = true;
sideCabinet3.receiveShadow = true;

// Menambahkan kabinet baru ke scene
scene.add(baseCabinet, topCabinet, backCabinet);
scene.add(sideCabinet1, sideCabinet2, sideCabinet3);

// Penyesuaian posisi kabinet baru relatif terhadap lemari yang ada
baseCabinet.position.x = 2.24 / 3.5 + 0 / 2; // Menyambung di sisi kanan lemari
topCabinet.position.x = 2.21 / 3.5 + 0 / 2;
backCabinet.position.x = 1.6 / -2.3 + cabinetLength / 2;
sideCabinet1.position.x = cabinetLength / 1.97 + -0.011; 
sideCabinet2.position.x = cabinetLength / 1.98 + -1.33 + 0.12; 
sideCabinet3.position.x = cabinetLength / 1.962 + 4.96 * (0.12 + 0.11); 

// Definisi pintu
const doorWidth = 0.06;
const doorHeight = 4.27;
const doorDepth = 1.35;
const geometryDoor = new THREE.BoxGeometry(doorDepth, doorHeight, doorWidth);
const materialDoor = new THREE.MeshStandardMaterial({ map: textureCabinet });

// Group untuk pintu dengan pivot yang tepat
const doorGroup = new THREE.Group();
const door = new THREE.Mesh(geometryDoor, materialDoor);
door.position.set(doorDepth / 2, 0.214, 0);
door.castShadow = true;
door.receiveShadow = true;
doorGroup.add(door);
doorGroup.position.set(-2.50 + doorWidth / 2, 2, -1.17);
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

// Membuat bean bag dengan cekungan di dalamnya
const beanBagSize = 1;
const beanBagSegments = 64;

// Geometri untuk bean bag
const beanBagGeometry = new THREE.SphereGeometry(beanBagSize, beanBagSegments, beanBagSegments);

// Fungsi untuk membuat kerutan halus pada bean bag
function createBeanBagKerutan(geometry) {
    const position = geometry.attributes.position;
    const vector = new THREE.Vector3();
    const center = new THREE.Vector3(0, 0, 0);

    for (let i = 0; i < position.count; i++) {
        vector.fromBufferAttribute(position, i);
        
        // Menambahkan kerutan yang halus pada setiap titik
        const noiseX = 0.05 * (Math.random() - 0.6);
        const noiseY = 0.03 * (Math.random() - 0.5);
        const noiseZ = 0 * (Math.random() - 0.5);
        vector.x += noiseX;
        vector.y += noiseY;
        vector.z += noiseZ;

        // Memastikan posisi titik tetap berada di dalam batas bean bag
        const distanceFromCenter = vector.distanceTo(center);
        if (distanceFromCenter > beanBagSize) {
            // Geser titik kembali ke permukaan bean bag
            vector.sub(center).normalize().multiplyScalar(beanBagSize).add(center);
        }
        
        position.setXYZ(i, vector.x, vector.y, vector.z);
    }
    
    position.needsUpdate = true;
    geometry.computeVertexNormals();
}
createBeanBagKerutan(beanBagGeometry);

// Fungsi untuk membuat cekungan di bagian atas bean bag
function createBeanBagCekungan(geometry) {
    const position = geometry.attributes.position;
    const vector = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
        vector.fromBufferAttribute(position, i);
        
        // Menerapkan cekungan hanya pada bagian atas bean bag
        const dipCenter = new THREE.Vector3(0.58, 0.6 * beanBagSize, 0); 
        const distance = vector.distanceTo(dipCenter);
        
        // Radius cekungan lebih besar untuk membuat cekungan lebih lebar
        if (distance < 0.63 * beanBagSize) {
            // Menggunakan interpolasi linear untuk membuat tepi yang tumpul
            let cekunganFactor = 0.67 - Math.pow(distance / (0.8 * beanBagSize), 1.7);
            if (distance > 0.5 * beanBagSize) {
                const t = (distance - 0.5 * beanBagSize) / (0.6 * beanBagSize - 0.5 * beanBagSize);
                cekunganFactor = THREE.MathUtils.lerp(cekunganFactor, 0, t);
            }
            vector.y -= cekunganFactor * 1.5 * beanBagSize; // Sesuaikan kedalaman cekungan

            // Menambahkan kerutan di sekitar cekungan
            const noise = 0.03 * (Math.random() - 2);
            vector.x += noise;
            vector.z += noise;
        }

        // Mengubah posisi titik pada bagian atas agar lebih kurus
        if (vector.y < 1 * beanBagSize) {
            const t = (vector.y - 0.2 * beanBagSize) / (2 * beanBagSize - 0 * beanBagSize);
            vector.x *= 1 - 0.5 * t; 
            vector.z *= 1 - 0.3 * t; 
        }
        
        position.setXYZ(i, vector.x, vector.y, vector.z);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
}

createBeanBagCekungan(beanBagGeometry);

// Material bean bag
const beanBagMaterial = new THREE.MeshStandardMaterial({ 
    map: textureBeanBag, 
});
const beanBag = new THREE.Mesh(beanBagGeometry, beanBagMaterial);
beanBag.position.set(-1.3, 0.85 / 1.5, 1.55); // Posisi bean bag
beanBag.scale.set(0.9, 0.85, 0.97); // Skala untuk memperlebar bean bag di sumbu x dan z
beanBag.castShadow = true;
beanBag.receiveShadow = true;
scene.add(beanBag);

// Material putih mengkilat untuk alas dan batang lampu
const ceramicMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.2
});

// Membuat alas lampu tidur
const lampBaseGeometry = new THREE.SphereGeometry(0.23, 5, 32, 32);
const lampBase = new THREE.Mesh(lampBaseGeometry, ceramicMaterial);
lampBase.position.set(1.5, 1.4, -1.85);
lampBase.castShadow = true;
lampBase.receiveShadow = true;
scene.add(lampBase);

// Batang lampu tidur
const lampStemGeometry = new THREE.CylinderGeometry(0.04, 0.07, 0.33, 64);
const lampStem = new THREE.Mesh(lampStemGeometry, ceramicMaterial);
lampStem.position.set(1.5, 1.77, -1.85);
lampStem.castShadow = true;
lampStem.receiveShadow = true;
scene.add(lampStem);

// Kap lampu tidur
const lampShadeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.7, 64);
const lampShadeMaterial = new THREE.MeshPhongMaterial({ 
    map: textureLamp,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8, 
    emissive: 0x444444, // Memberikan efek cahaya dari dalam
    emissiveIntensity: 0.8 // Intensitas cahaya yang dipancarkan dari dalam kap lampu
});
const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
lampShade.position.set(1.5, 2.29, -1.85); // Menetapkan posisi kap lampu tidur
lampShade.castShadow = false;
lampShade.receiveShadow = true;
scene.add(lampShade);

// Cahaya lampu tidur
const lampLight = new THREE.PointLight(0xffff00, 10, 7);
lampLight.position.set(1.5, 3.5, -1.85);
lampLight.castShadow = true;
scene.add(lampLight);

// Variabel untuk menyimpan posisi awal mouse saat menggerakkan objek
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Fungsi untuk menangani pergerakan mouse
function onMouseMove(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const rotationSpeed = 0.01;

        // Menggunakan quaternions untuk rotasi yang lebih stabil
        const quaternionX = new THREE.Quaternion();
        const quaternionY = new THREE.Quaternion();

        quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), deltaMove.y * rotationSpeed);
        quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), deltaMove.x * rotationSpeed);

        scene.quaternion.multiplyQuaternions(quaternionY, scene.quaternion);
        scene.quaternion.multiplyQuaternions(quaternionX, scene.quaternion);

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

// Fungsi untuk menangani saat mouse ditekan
function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

// Fungsi untuk menangani saat mouse dilepas
function onMouseUp() {
    isDragging = false;
}

// Menambahkan event listener untuk mouse
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

// Fungsi untuk melakukan animasi
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