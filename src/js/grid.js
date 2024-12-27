import _ from "lodash";
import {cursorColor} from "./colorPicker.js";

const grid = document.querySelector("#grid");
const gridLength = _.range(1, 401, 1);

gridLength.map((item, index) => {
    
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-square");
    gridItem.setAttribute("data-id", `${index + 1}`);
    // gridItem.dataset.id = `${index + 1}`;
    grid.appendChild(gridItem);
});

grid.addEventListener("click", (event) => {
    const gridSquare = event.target.closest(".grid-square");
    gridSquare.style.backgroundColor = cursorColor;
    console.log(gridSquare.getAttribute("data-id"));
    
    
})





// const gridSquares = document.querySelectorAll(".grid-square");
/* for (const square of gridSquares) {
    square.addEventListener("mouseenter", (event) => {
        event.target.style.backgroundColor = cursorColor
        console.log(event.target)
    })
} */

/* gridSquares.forEach((square) => {
    square.addEventListener("mouseenter", (event) => {
        console.log(event)
    })
}) */
