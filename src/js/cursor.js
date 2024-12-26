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

/* function updateCursor(color) {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="19.196396" height="23.999937"
        viewBox="0 0 19.196396 23.999937" fill="none"><path d="m 17.289555,12.591263 -0.0015,-0.0013 -0.0016,-0.0014 L 5.759437,
        2.370346 C 5.214821,1.872439 4.67901,1.471068 4.164547,1.215153 3.661648,0.964989 3.063331,0.797236 2.465876,0.961997 1.823272,
        1.139207 1.4205,1.630363 1.196844,2.18767 0.98076103,2.726114 0.89521003,3.400914 0.89521003,4.165489 v 15.470608 0.0065 l 9.5e-5,
        0.0065 c 0.01274,0.874886 0.51891797,1.820757 1.10537697,2.458043 0.30512,0.33165 0.68668,0.641604 1.124187,0.826544 0.447269,
        0.189048 1.005439,0.264562 1.558585,0.01496 0.45124,-0.203581 0.864281,-0.613905 1.199311,-0.972411 0.192481,-0.206004 0.418865,
        -0.463299 0.650767,-0.726912 0.176357,-0.200317 0.355821,-0.40432 0.526016,-0.59221 0.859299,-0.948293 1.823706,-1.878893 2.962732,
        -2.392744 1.142923,-0.515643 2.490586,-0.635285 3.770635,-0.659403 0.315536,-0.006 0.620013,-0.0062 0.914907,
        -0.0064 h 0.0014 0.0024 c 0.290786,-2.1e-4 0.576938,-4.21e-4 0.840025,-0.007 0.481203,-0.0119 1.05119,-0.04318 1.48658,
        -0.225277 1.04624,-0.437812 1.284366,-1.58421 1.261301,-2.362835 -0.02443,-0.826649 -0.335231,-1.808645 -1.01001,
        -2.412334 z" fill="${color}" stroke="#000000" stroke-width="1.79042" /></svg>`;

    // let encodeSVG = encodeURIComponent(svgString);
    document.body.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svgString)} ") 0 0, auto`;
} */

// export { updateCursor };
