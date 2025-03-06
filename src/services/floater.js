import { throttle } from "lodash-es";

const mouseThrottle = throttle(moveFloater, 20, { trailing: true });
const currentPosition = { x: 0, y: 0 }; // Current position of the cursor
const targetPosition = { x: 0, y: 0 }; // Target position of the cursor

//uncomment to use floater
// document.addEventListener("mousemove", mouseThrottle);

function moveFloater(event) {
    currentPosition.x = event.clientX;
    currentPosition.y = event.clientY;
    console.log(currentPosition)
    document.querySelector("#cursorFloat").style.transform =
        `translate(${currentPosition.x + 12}px, ${currentPosition.y + 25}px)`;
}

function setUpFLoater() {

}

