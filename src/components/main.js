import "../style.css";
import { createGrid } from "../services/grid.js";
import "../services/router.js";
import { cursorColors, setCursor, changeCursorColors, setOthersCursor } from "../services/cursorSetting.js";
import { myData, otherUsers } from "../services/userData.js";


document.querySelector("#myCursorCheckbox").addEventListener("change", () => {
    setCursor({ cursorColor: myData.cursorColor, cursorRGBA: myData.cursorRGBA });
});

//to swap cursors from location to regular svg, loop over users, remove old cursor,
// render new cursors, with the checkbox changed it chooses a new svg
document.querySelector("#othersCursorCheckbox").addEventListener("change", () => {
    const otherCursors = document.querySelectorAll(".other-cursors");
    for (const el of otherCursors) {
        document.querySelector("#app").removeChild(el);
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
        //emit color change to ws
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
