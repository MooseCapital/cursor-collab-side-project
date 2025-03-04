import { range } from "lodash-es";
import { userData } from "./userData.js";

export { createGrid };

function createGrid() {
    const grid = document.querySelector("#grid");
    const gridLength = range(1, 401, 1);

    gridLength.map((item, index) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-square");
        gridItem.setAttribute("data-id", `${index + 1}`);
        // gridItem.dataset.id = `${index + 1}`;
        grid.appendChild(gridItem);
    });

    grid.addEventListener("click", (event) => {
        const gridSquare = event.target.closest(".grid-square");
        gridSquare.style.backgroundColor = userData.cursorRGBA;
        console.log(gridSquare.getAttribute("data-id"));
    });
}
