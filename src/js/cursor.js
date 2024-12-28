import _ from "lodash";


const serverThrottle = _.throttle(({ currentX, currentY }) => console.log({ currentX, currentY }), 500, {
    trailing: true,
});
// const mouseThrottle = _.throttle(mouseMovedOutsideBox, 50,{ trailing: true });

const mouseThrottle = _.throttle(moveCursor, 50,{ trailing: true });
// document.addEventListener("mousemove", mouseThrottle);

const cursor = document.querySelector("#test-cursor");

document.addEventListener('click', mouseThrottle);

const currentPosition = {x: 0, y: 0}; // Current position of the cursor
const targetPosition = {x: 0, y: 0}; // Target position of the cursor

//move cursor logic
function moveCursor(event) {
    targetPosition.x = event.clientX;
    targetPosition.y = event.clientY;
    // console.log(targetPosition)
    startAnimation();
}

let animationInProgress = false;

//-------------------------------------------------------------------------------------------------------------
//animation cursor without time, but does not infinite animate
function animateCursor() {
    // Interpolate position for smooth movement
    currentPosition.x += (targetPosition.x - currentPosition.x) * 0.1;
    currentPosition.y += (targetPosition.y - currentPosition.y) * 0.1;

    // Update the cursor's position using CSS transform
    cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    //translate3d
    // cursor.style.transform = `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`;
    
    
    // Check if the cursor is close enough to the target
    // const distanceX = Math.abs(targetPosition.x - currentPosition.x);
    // const distanceY = Math.abs(targetPosition.y - currentPosition.y);
    const distance = Math.hypot(targetPosition.x - currentPosition.x, targetPosition.y - currentPosition.y);
    
    // Continue the animation loop if cursor is not less than 0.1px to target
    if (distance > 0.2) {
        requestAnimationFrame(animateCursor);
    } else {
        // Snap to exact position and stop the animation
        currentPosition.x = targetPosition.x;
        currentPosition.y = targetPosition.y;
        cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
        //translate3d
        // cursor.style.transform = `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`;
        // Animation complete
        animationInProgress = false;
    }
}

// Start the animation loop
 function startAnimation() {
     if (animationInProgress) return;
     
    animationInProgress = true;
    requestAnimationFrame(animateCursor);
}



//-------------------------------------------------------------------------------------------------------------
//box to limit events unless mouse moves over 20px
let lastOutsideBoxX = 0;
let lastOutsideBoxY = 0;
const threshold = 10; // pixels
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
        moveCursor(event);
        // serverThrottle({ currentX, currentY });
    }
}


//-------------------------------------------------------------------------------------------------------------
// time based animation, is always jumpy since it moves 1px at a time while interpolation moves tiny decimals
/*
// let startTime;
const animationDuration = 250; // Duration in milliseconds
function animateCursor(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / animationDuration, 1);
    
    const easedProgress = easeOutQuad(progress);
    // Interpolate position using the progress
    currentPosition.x = startPosition.x + (targetPosition.x - startPosition.x) * easedProgress;
    currentPosition.y = startPosition.y + (targetPosition.y - startPosition.y) * easedProgress;

    // Update the cursor's position
    cursor.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
    
    if (progress < 1) {
        requestAnimationFrame(animateCursor);
    } else {
        // Animation complete
        startTime = null;
        animationInProgress = false;
    }
    // requestAnimationFrame(animateCursor);
}

// Call startAnimation() when you want to start a new animation
function startAnimation() {
    
    if (animationInProgress) return;
    animationInProgress = true;
    startPosition = { ...currentPosition };
    startTime = null;
    requestAnimationFrame(animateCursor);
}

function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}
*/