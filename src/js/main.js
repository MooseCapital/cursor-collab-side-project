import _ from "lodash";
import iro from '@jaames/iro';
import '../style.css'
import "./webRTC.js";
import "./cursor.js";
import "./colorPicker.js"

const grid = document.querySelector("#grid")
const gridLength = _.range(1, 401, 1);


gridLength.map((item) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-square");
    grid.appendChild(gridItem);
})


//dont send even unless cursor moved so many pixels



