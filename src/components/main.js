import "../style.css";
import "../services/router.js";
import { cursorColors, changeCursorColors, setOthersCursor } from "../services/cursorSetting.js";
import { myData, otherUsers } from "../services/userData.js";
import {socket} from "../services/websocket.js";


//to swap cursors from location to regular svg, loop over users, remove old cursor,
// render new cursors, with the checkbox changed it chooses a new svg
document.querySelector("#othersCursorCheckbox").addEventListener("change", () => {
    const otherCursors = document.querySelectorAll(".cursorContainer");
    for (const el of otherCursors) {
        document.querySelector("#app").removeChild(el);
        otherUsers[`${el.dataset.id}`].renderCursor();
    }
});

