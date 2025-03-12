import "../style.css";
import { createGrid } from "../services/grid.js";
import "../services/router.js";
import { cursorColors, setCursor, changeCursorColors, setOthersCursor } from "../services/cursorSetting.js";
import { myData, otherUsers } from "../services/userData.js";

//to do
// move common page functions, and import into page
/*
document.querySelector("#app").innerHTML = layout();

function layout() {
    return `
    <header>
        <h1>Cursor collaboration</h1>
        <a href="/cursor-collab-side-project/#/websocket">WebSocket</a>
        <a href="/cursor-collab-side-project/#/webrtc">WebRTC</a>
        <a href="/cursor-collab-side-project/#/colors">Colors</a>
<!--         <button onclick="navigate('/websocket')">WebSocket</button> -->
<!--           <button onclick="navigate('/webrtc')">WebRTC</button> -->
<!--           <button onclick="navigate('/colors')">Colors</button> -->

      </header>

      <main>
      </main>
`;
}
*/
document.querySelector("#myCursorCheckbox").addEventListener("change", () => {
    setCursor({ cursorColor: myData.cursorColor, cursorRGBA: myData.cursorRGBA });
});

//when swapping from location to regular cursors for others, loop over them
//remove the old one first because setOthersCursor allows 1 per id at a time
// render new cursors, with checkbox changed it chooses a new svg
document.querySelector("#othersCursorCheckbox").addEventListener("change", () => {
    const otherCursors = document.querySelectorAll(".other-cursors");
    for (const el of otherCursors) {
        document.querySelector("#app").removeChild(el);
        // el.remove();
        otherUsers[`${el.dataset.id}`].renderCursor();
    }
});

const swatchGrid = document.querySelector(".swatchGrid");
swatchGrid.innerHTML = getSwatches();

swatchGrid.addEventListener("click", (e) => {
    if (e.target.closest(".swatch")) {
        const swatch = e.target.closest(".swatch");

        changeCursorColors(myData, swatch.dataset.color, swatch.dataset.rgba);
        setTimeout(() => {
            setCursor({ cursorColor: swatch.dataset.color, cursorRGBA: swatch.dataset.rgba });
        }, 0);

        swatchGrid.innerHTML = getSwatches();
    }
});

function getSwatches() {
    let swatches = "";
    cursorColors.map((color) => {
        const currentSwatch = myData.cursorColor === color.name ? "currentSwatch" : "";
        swatches += `<div class="swatch ${currentSwatch}" data-color="${color.name}" data-rgba="${color.rgba}"  style="background: ${color.rgba}"></div>`;
    });
    return swatches;
}
