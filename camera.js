import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Mengatur posisi dan arah pandang kamera
camera.position.set(5, 3, 5);
camera.lookAt(0, 2, 0);

// Fungsi untuk mengatur pergerakan kamera berdasarkan input keyboard
function handleKeyboardInput(event) {
    const moveSpeed = 0.1; // Kecepatan pergerakan kamera
    
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
                
// Panggil fungsi handleKeyboardInput saat tombol ditekan
document.addEventListener('keydown', handleKeyboardInput);