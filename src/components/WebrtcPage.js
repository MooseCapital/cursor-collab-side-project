import {createGrid} from "../services/grid.js";
import {setUserData} from "../services/userData.js";

export { WebrtcPage };


const swatchGrid = document.querySelector(".swatchGrid");

function WebrtcPage() {
    console.log("Webrtc page loaded");
    setTimeout(() => {
        createGrid();
        setUserData();
        // swatchGrid.innerHTML = getSwatches();
    }, 0);
    return `
        <div>webrtc</div>
        <div id="grid"></div>
    `;
}
