import { throttle } from "lodash-es";
import { gsap } from "gsap";
import {socket} from "./websocket.js";
import {myData} from "./userData.js";
export {moveCursorGsap, initializeCursorEvents}

function initializeCursorEvents(sendPosition) {

    const mouseThrottle = throttle(mouseMovedOutsideBox, 10, { trailing: true });
    document.addEventListener("mousemove", mouseThrottle);
    
    //throttle how often we send server events
    const serverThrottle = throttle(({ currentX, currentY }) => {
        // console.log({ currentX, currentY, id: myData.id })
        // socket.emit("user:position", { x:currentX, y:currentY, id: myData.id });
        sendPosition({ x:currentX, y:currentY });
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
            
            // only throttle our mousemove event, send events to server when we have === 3
            // then clear the events
            serverThrottle({ currentX, currentY });
        }
    }
}

//other users, gsap animate, without requestAnimationFrame
//select with data-id attribute to animate
function moveCursorGsap({x, y, webrtcId}) {
    const user = document.querySelector(`.cursorContainer[data-webrtcid="${webrtcId}"]`) ||
        document.querySelector(`.single-svg-cursor[data-webrtcid="${webrtcId}"]`);
    
    gsap.to(user, {
        x: x,
        y: y,
        // duration: 0.15,
        duration: 0.10,
        ease: "none",
    });
}


//-------------------------------------------------------------------------------------------------------------
