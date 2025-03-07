import { throttle } from "lodash-es";
import { gsap } from "gsap";

const cursor = document.querySelector(".test-cursor");
const floater = document.querySelector(".cursorFloat");
const cursorContainer = document.querySelector(".cursorContainer");

// positions of our cursor
const myCurrentPosition = { x: 0, y: 0 };

//other users position
const targetPosition = { x: 0, y: 0 };

//position of last mouse event outside of box
let lastOutsideBoxX = 0;
let lastOutsideBoxY = 0;

//pixel amount for threshold box
const threshold = 10;

//throttle mouse events, don't run until cursor moved outside of box
const mouseThrottle = throttle(mouseMovedOutsideBox, 50, { trailing: true });
document.addEventListener("mousemove", mouseThrottle);

//gsap animate, without requestAnimationFrame
function moveCursorGsap(event) {
    targetPosition.x = event.clientX;
    targetPosition.y = event.clientY;
    // console.log(targetPosition);
    
    gsap.to(cursorContainer, {
    // gsap.to(cursor, {
        x: targetPosition.x,
        y: targetPosition.y,
        duration: 0.25,
        // ease: "power1.out"
        ease: "none",
    });
}



//throttle how often we send server events
const serverThrottle = throttle(({ currentX, currentY }) => console.log({ currentX, currentY }), 250, {
    trailing: true,
});

//box to limit events unless mouse moves over that
function mouseMovedOutsideBox(event) {
    const currentX = event.clientX;
    const currentY = event.clientY;

    const deltaX = currentX - lastOutsideBoxX;
    const deltaY = currentY - lastOutsideBoxY;
    
    //sync our floater to cursor
    // moveFloaterGsap(currentX, currentY);
    
    const distanceMoved = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    //only send events if position changed > threshold 10px
    if (distanceMoved >= threshold) {
        // Update position and send to WebSocket
        lastOutsideBoxX = currentX;
        lastOutsideBoxY = currentY;
        
        // moveCursorGsap(event);
        // moveCursorLinear(event);
        // serverThrottle({ currentX, currentY });
    }
}

function moveFloaterGsap(currentX, currentY) {
    gsap.to(floater, {
        x: currentX + 12,
        y: currentY + 25,
        duration: 0.05,
        ease: "none",
    });
}


//-------------------------------------------------------------------------------------------------------------
//move cursor always, no box to limit events
let animationInProgress = false;

function moveCursorLinear(event) {
    targetPosition.x = event.clientX;
    targetPosition.y = event.clientY;
    console.log(targetPosition);
    startAnimation();
}

//linear interpolation, animation cursor without time
function animateCursor() {
    // Interpolate position for smooth movement
    myCurrentPosition.x += (targetPosition.x - myCurrentPosition.x) * 0.1;
    myCurrentPosition.y += (targetPosition.y - myCurrentPosition.y) * 0.1;

    // Update the cursor's position using CSS transform or translate 3d or needs more performance
    cursor.style.transform = `translate(${myCurrentPosition.x}px, ${myCurrentPosition.y}px)`;
    // cursor.style.transform = `translate3d(${myCurrentPosition.x}px, ${myCurrentPosition.y}px, 0)`;

    // Check if the cursor is close enough to the target
    const distance = Math.hypot(targetPosition.x - myCurrentPosition.x, targetPosition.y - myCurrentPosition.y);

    // Continue the animation loop if cursor is not less than 0.1px to target
    if (distance > 0.2) {
        requestAnimationFrame(animateCursor);
    } else {
        // Snap to exact position and stop the animation
        myCurrentPosition.x = targetPosition.x;
        myCurrentPosition.y = targetPosition.y;
        cursor.style.transform = `translate(${myCurrentPosition.x}px, ${myCurrentPosition.y}px)`;
        // cursor.style.transform = `translate3d(${myCurrentPosition.x}px, ${myCurrentPosition.y}px, 0)`;

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