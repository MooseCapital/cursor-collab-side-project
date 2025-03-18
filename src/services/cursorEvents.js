import { throttle } from "lodash-es";
import { gsap } from "gsap";
import {socket} from "./websocket.js";
import {myData} from "./userData.js";
export {moveCursorGsap}


//throttle mouse events for 25ms, don't run until cursorEvents moved outside of box
const mouseThrottle = throttle(mouseMovedOutsideBox, 10, { trailing: true });
document.addEventListener("mousemove", mouseThrottle);

//throttle how often we send server events
const serverThrottle = throttle(({ currentX, currentY }) => {
    // console.log({ currentX, currentY, id: myData.id })
    socket.emit("user:position", { x:currentX, y:currentY, id: myData.id });
}, 100, { trailing: true, });

//position of last mouse event outside of box
let lastOutsideBoxX = 0;
let lastOutsideBoxY = 0;
const threshold = 5; //pixel amount for threshold box

//only send events if position changed > threshold 10px
function mouseMovedOutsideBox(event) {
    const {clientX: currentX, clientY: currentY} = event;
    
    const deltaX = currentX - lastOutsideBoxX;
    const deltaY = currentY - lastOutsideBoxY;
    
    const distanceMoved = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distanceMoved >= threshold) {
        lastOutsideBoxX = currentX;
        lastOutsideBoxY = currentY;
        
        // Update position and send to WebSocket
        //animate other cursor when moving to simulate test movement
        serverThrottle({ currentX, currentY });
    }
}

//other users, gsap animate, without requestAnimationFrame
//select with data-id attribute to animate
function moveCursorGsap({x, y, id}) {
    // console.log("moveCursorGsap", userX, userY, id)
    //add latency to duration to have accurate animation time
    const user = document.querySelector(`.cursorContainer[data-id="${id}"]`) ||
        document.querySelector(`.single-svg-cursor[data-id="${id}"]`);
    
    gsap.to(user, {
        x: x,
        y: y,
        // duration: 0.15,
        duration: 0.10,
        ease: "none",
    });
}




//-------------------------------------------------------------------------------------------------------------

//move cursorEvents always, no box to limit events
let animationInProgress = false;
const targetPosition = { x: 0, y: 0 };
const myCurrentPosition = { x: 0, y: 0 };

function moveCursorLinear(event) {
    targetPosition.x = event.clientX;
    targetPosition.y = event.clientY;
    console.log(targetPosition);
    // startAnimation();
}

//linear interpolation, animation cursorEvents without time
function animateCursor() {
    // Interpolate position for smooth movement
    myCurrentPosition.x += (targetPosition.x - myCurrentPosition.x) * 0.1;
    myCurrentPosition.y += (targetPosition.y - myCurrentPosition.y) * 0.1;

    // Update the cursorEvents's position using CSS transform or translate 3d or needs more performance
    // cursorEvents.style.transform = `translate(${myCurrentPosition.x}px, ${myCurrentPosition.y}px)`;
    cursorEvents.style.transform = `translate3d(${myCurrentPosition.x}px, ${myCurrentPosition.y}px, 0)`;

    // Check if the cursorEvents is close enough to the target
    const distance = Math.hypot(targetPosition.x - myCurrentPosition.x, targetPosition.y - myCurrentPosition.y);

    // Continue the animation loop if cursorEvents is not less than 0.1px to target
    if (distance > 0.2) {
        requestAnimationFrame(animateCursor);
    } else {
        // Snap to exact position and stop the animation
        myCurrentPosition.x = targetPosition.x;
        myCurrentPosition.y = targetPosition.y;
        // cursorEvents.style.transform = `translate(${myCurrentPosition.x}px, ${myCurrentPosition.y}px)`;
        cursorEvents.style.transform = `translate3d(${myCurrentPosition.x}px, ${myCurrentPosition.y}px, 0)`;

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