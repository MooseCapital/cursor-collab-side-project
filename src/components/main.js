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

//we are now not setting 1(our cursor) , but all, so we need to loop over them when selected
//find users user with the id in loop, then get that users id and run cursors again, while box is not checked
document.querySelector("#othersCursorCheckbox").addEventListener("change", () => {
    const otherCursors = document.querySelectorAll(".other-cursors");
    const app = document.querySelector("#app");
    for (const el of otherCursors) {
        app.removeChild(el);
        otherUsers[`${el.dataset.id}`].renderCursor();
        
    }

    /*   setOthersCursor({
            cursorColor: this.userColor,
            cursorRGBA: this.userRGBA,
            id: this.id,
            region: this.region,
            countryCode: this.countryCode,
            flag: this.flag,
            swapCursors: true,
        }); */
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
