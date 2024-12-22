// import './style.css'
/* document.querySelector('#app').innerHTML = `
  <div>
    test
  </div>
` */

const cursor = document.querySelector("#test-cursor"); // The element representing the cursor
let currentPosition = { x: 0, y: 0 }; // Current position of the cursor
let targetPosition = { x: 0, y: 0 }; // Target position of the cursor

function moveCursor(newX, newY) {
    targetPosition.x = newX;
    targetPosition.y = newY;
}

function animateCursor() {
    // Interpolate position for smooth movement
    currentPosition.x += (targetPosition.x - currentPosition.x) * 0.1; // Adjust "0.1" for speed
    currentPosition.y += (targetPosition.y - currentPosition.y) * 0.1;

    // Update the cursor's position using CSS transform
    cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;

    // Continue the animation loop
    requestAnimationFrame(animateCursor);
}

// Start the animation loop
requestAnimationFrame(animateCursor);

// Example: Move the cursor when clicking anywhere on the page
document.addEventListener('mousemove', (event) => {
    moveCursor(event.clientX, event.clientY);
});





