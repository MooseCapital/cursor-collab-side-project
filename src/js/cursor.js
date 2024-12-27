import _ from "lodash";

const cursor = document.querySelector("#test-cursor"); // The element representing the cursor

// let moveCount = 0;

const mouseThrottle = _.throttle(
    (event) => {
        /* moveCount++;
        console.log(moveCount); */
        handleMouseMove(event)
    }, 50,{ trailing: true });
document.addEventListener("mousemove", mouseThrottle);

const serverThrottle = _.throttle(({ currentX, currentY }) => console.log({ currentX, currentY }), 250, {
    trailing: true,
});


//start the interval on webrtc connection, we can try to make an interval
/*
document.addEventListener('click', (event) => {
    moveCursor(event.clientX, event.clientY);
});
*/

/* let currentPosition = {x: 0, y: 0}; // Current position of the cursor
let targetPosition = {x: 0, y: 0}; // Target position of the cursor
//move cursor logic
function moveCursor(newX, newY) {
    targetPosition.x = newX;
    targetPosition.y = newY;
} */

/* function animateCursor() {
    // Interpolate position for smooth movement
    currentPosition.x += (targetPosition.x - currentPosition.x) * 0.05; // Adjust "0.1" for speed
    currentPosition.y += (targetPosition.y - currentPosition.y) * 0.05;
    // console.log(currentPosition)
    // Update the cursor's position using CSS transform
    cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    
    // Continue the animation loop
    requestAnimationFrame(animateCursor);
}

// Start the animation loop
requestAnimationFrame(animateCursor); */

// Example: Move the cursor when clicking anywhere on the page


let lastX = 0;
let lastY = 0;
const threshold = 20; // pixels
function handleMouseMove(event) {
    const currentX = event.clientX;
    const currentY = event.clientY;

    const deltaX = currentX - lastX;
    const deltaY = currentY - lastY;

    const distanceMoved = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    //only send events if position changed > threshold 10px
    if (distanceMoved >= threshold) {
        // Update position and send to WebSocket
        lastX = currentX;
        lastY = currentY;
        // serverThrottle({ currentX, currentY });
    }
}


