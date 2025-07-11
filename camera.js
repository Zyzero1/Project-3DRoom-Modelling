import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Mengatur posisi dan arah pandang kamera
camera.position.set(5, 3, 5);
camera.lookAt(0, 2, 0);

// Variabel untuk menyimpan posisi mouse sebelumnya
// let previousMousePosition = {
//     x: 0,
//     y: 0
// };

// Fungsi untuk mengatur pergerakan kamera berdasarkan input keyboard
function handleKeyboardInput(event) {
    const moveSpeed = 0.4; // Kecepatan pergerakan kamera
    
    switch (event.key) {
        case 'w':
            camera.translateZ(-moveSpeed); // Maju
            break;
        case 's':
            camera.translateZ(moveSpeed); // Mundur
            break;
        case 'a':
            camera.translateX(-moveSpeed); // Kiri
            break;
        case 'd':
            camera.translateX(moveSpeed); // Kanan
            break;
        case 'ArrowUp':
            camera.position.y += moveSpeed; // Naik
            break;
        case 'ArrowDown':
            camera.position.y -= moveSpeed; // Turun
            break;
    }
}

// Fungsi untuk mengatur pergerakan kamera berdasarkan input mouse
function handleMouseMove(event) {
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    const rotateSpeed = 0.003; // Kecepatan rotasi kamera

    camera.rotation.y -= deltaMove.x * rotateSpeed;
    camera.rotation.x -= deltaMove.y * rotateSpeed;
    
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

// Panggil fungsi handleKeyboardInput saat tombol ditekan
document.addEventListener('keydown', handleKeyboardInput);

// Panggil fungsi handleMouseMove saat mouse atau touchpad digerakkan
// document.addEventListener('pointermove', handleMouseMove);

// Update posisi mouse sebelumnya saat pointer bergerak
// document.addEventListener('pointermove', (event) => {
//     previousMousePosition = {
//         x: event.clientX,
//         y: event.clientY
//     };
// });