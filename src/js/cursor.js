import _ from "lodash";


// let moveCount = 0;

const mouseThrottle = _.throttle(mouseMovedOutsideBox, 50,{ trailing: true });
document.addEventListener("mousemove", mouseThrottle);

const serverThrottle = _.throttle(({ currentX, currentY }) => console.log({ currentX, currentY }), 500, {
    trailing: true,
});

const cursor = document.querySelector("#test-cursor");

document.addEventListener('click', moveCursor);

const currentPosition = {x: 0, y: 0}; // Current position of the cursor
const targetPosition = {x: 0, y: 0}; // Target position of the cursor
let startPosition = {x: 0, y: 0}; // Target position of the cursor
//move cursor logic
function moveCursor(event) {
    targetPosition.x = event.clientX;
    targetPosition.y = event.clientY;
    console.log(targetPosition)
    startAnimation();
}

//-------------------------------------------------------------------------------------------------------------
//time based solution, no interpolation
//ask gpt for solution about skipping that happens with time, but not with normal interpolation

let startTime;
const animationDuration = 500; // Duration in milliseconds

function animateCursor(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / animationDuration, 1);

    // Interpolate position using the progress
    currentPosition.x = startPosition.x + (targetPosition.x - startPosition.x) * progress;
    currentPosition.y = startPosition.y + (targetPosition.y - startPosition.y) * progress;

    // Update the cursor's position
    cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    
    if (progress < 1) {
        requestAnimationFrame(animateCursor);
    } else {
        // Animation complete
        startTime = null;
    }
    // requestAnimationFrame(animateCursor);
}

function startAnimation() {
    startPosition = { ...currentPosition };
    startTime = null;
    requestAnimationFrame(animateCursor);
}

// Call startAnimation() when you want to start a new animation


//-------------------------------------------------------------------------------------------------------------
//ORIGINAL: animate cursor without a time
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

//-------------------------------------------------------------------------------------------------------------
//animation cursor without time, but does not infinite animate
/* function animateCursor() {
    // Interpolate position for smooth movement
    currentPosition.x += (targetPosition.x - currentPosition.x) * 0.05;
    currentPosition.y += (targetPosition.y - currentPosition.y) * 0.05;

    // Update the cursor's position using CSS transform
    cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    
    // Check if the cursor is close enough to the target
    const distanceX = Math.abs(targetPosition.x - currentPosition.x);
    const distanceY = Math.abs(targetPosition.y - currentPosition.y);
    
    if (currentPosition.x !== targetPosition.x || currentPosition.y !== targetPosition.y) {
        // Continue the animation loop if not close enough
        requestAnimationFrame(animateCursor);
    } else {
        // Snap to exact position and stop the animation
        currentPosition.x = targetPosition.x;
        currentPosition.y = targetPosition.y;
        cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    }
}

// Start the animation loop
 function startAnimation() {
    requestAnimationFrame(animateCursor);
}
*/




//-------------------------------------------------------------------------------------------------------------
//box to limit events unless mouse moves over 20px
let lastOutsideBoxX = 0;
let lastOutsideBoxY = 0;
const threshold = 20; // pixels
function mouseMovedOutsideBox(event) {
    const currentX = event.clientX;
    const currentY = event.clientY;

    const deltaX = currentX - lastOutsideBoxX;
    const deltaY = currentY - lastOutsideBoxY;

    const distanceMoved = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    //only send events if position changed > threshold 10px
    if (distanceMoved >= threshold) {
        // Update position and send to WebSocket
        lastOutsideBoxX = currentX;
        lastOutsideBoxY = currentY;
        // moveCursor(event);
        // serverThrottle({ currentX, currentY });
    }
}


