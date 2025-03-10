// import iro from "@jaames/iro";
import { userData } from "./userData.js";

export {
    setCursor,
    generateCursorColors,
    cursorColors,
    getRandomColorObj,
    changeCursorColors,
    setOthersCursor
};

const cursorColors = [
    { name: "blue", rgba: "rgba(68,255,255,0.6)" },
    { name: "green", rgba: "rgba(91,250,94,0.6)" },
    { name: "orange", rgba: "rgba(255,128,0,0.6)" },
    { name: "purple", rgba: "rgba(173,144,255,0.6)" },
    { name: "red", rgba: "rgba(255,31,31,0.6)" },
    { name: "pink", rgba: "rgba(255,166,250,0.6)" },
];

const getRandomColorObj = () => cursorColors[Math.floor(Math.random() * cursorColors.length)];

//split into 2 functions for color picker and first load
function generateCursorColors(userData) {
    if (!userData.cursorColor) {
        const colorObj = getRandomColorObj();
        userData.cursorColor = colorObj.name;
        userData.cursorRGBA = colorObj.rgba;
    }
}

function changeCursorColors(userData, cursorColor, cursorRGBA) {
    if (cursorColor) {
        //pass in color from color input here
        userData.cursorColor = cursorColor;
        userData.cursorRGBA = cursorRGBA;
        localStorage.setItem("userData", JSON.stringify(userData));
    }
}

function setCursor({ cursorColor, cursorRGBA, }) {
    const myCursorCheckbox = document.querySelector("#myCursorCheckbox");

    //we combine function for setting our cursor and other users cursors
    //we must identify who is running the function to apply to us, or whichever users cursor
    if (myCursorCheckbox.checked) {
        const text = userData.region && userData.region.length < 3 ? userData.region : userData.countryCode;

        const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="51" viewBox="0 0 70 51">
              <path d="m 17.289555,12.591263 -0.0015,-0.0013 -0.0016,-0.0014 L 5.759437,
                2.370346 C 5.214821,1.872439 4.67901,1.471068 4.164547,1.215153 3.661648,0.964989 3.063331,0.797236 2.465876,0.961997 1.823272,
                1.139207 1.4205,1.630363 1.196844,2.18767 0.98076103,2.726114 0.89521003,3.400914 0.89521003,4.165489 v 15.470608 0.0065 l 9.5e-5,
                0.0065 c 0.01274,0.874886 0.51891797,1.820757 1.10537697,2.458043 0.30512,0.33165 0.68668,0.641604 1.124187,0.826544 0.447269,
                0.189048 1.005439,0.264562 1.558585,0.01496 0.45124,-0.203581 0.864281,-0.613905 1.199311,-0.972411 0.192481,-0.206004 0.418865,
                -0.463299 0.650767,-0.726912 0.176357,-0.200317 0.355821,-0.40432 0.526016,-0.59221 0.859299,-0.948293 1.823706,-1.878893 2.962732,
                -2.392744 1.142923,-0.515643 2.490586,-0.635285 3.770635,-0.659403 0.315536,-0.006 0.620013,-0.0062 0.914907,
                -0.0064 h 0.0014 0.0024 c 0.290786,-2.1e-4 0.576938,-4.21e-4 0.840025,-0.007 0.481203,-0.0119 1.05119,-0.04318 1.48658,
                -0.225277 1.04624,-0.437812 1.284366,-1.58421 1.261301,-2.362835 -0.02443,-0.826649 -0.335231,-1.808645 -1.01001,
                -2.412334 z" fill="${cursorRGBA}" stroke="#000000" stroke-width="1.79042" />
              
              <rect x="12" y="23" width="55" height="27" fill="${cursorRGBA}" rx="4" />
              <text x="16" y="42"  font-family="Arial" font-size="16" font-weight="300" fill="black">${userData.flag} ${text}</text>
            </svg>
          `;

        const encodedSVG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
        //cursor is the same, we just set it to us, or the other users with id
        document.body.style.cursor = `url("${encodedSVG}") 0 0, auto`;
    } else {
        //regular cursor here
        const cursorPath = `${import.meta.env.BASE_URL}/images/bibata-${cursorColor}.svg`;
        document.body.style.cursor = `url(${cursorPath}) 0 0, auto`;
    }
}

//check if cursor exist so we don't duplicate, setting our own cursor doesn't have this since theres only 1
//can be css query selector check with data-id
function setOthersCursor({ cursorColor, cursorRGBA, id, region, countryCode, flag }) {
    const othersCursorCheckbox = document.querySelector("#othersCursorCheckbox");
    const app = document.querySelector("#app");
    
    if (othersCursorCheckbox.checked) {
        console.log('checked')
        //get other users data
        const text = region && region.length < 3 ? region : countryCode;

        const svgString = `
            <svg class="other-cursors" data-id="${id}" xmlns="http://www.w3.org/2000/svg" width="70" height="51" viewBox="0 0 70 51">
              <path d="m 17.289555,12.591263 -0.0015,-0.0013 -0.0016,-0.0014 L 5.759437,
                2.370346 C 5.214821,1.872439 4.67901,1.471068 4.164547,1.215153 3.661648,0.964989 3.063331,0.797236 2.465876,0.961997 1.823272,
                1.139207 1.4205,1.630363 1.196844,2.18767 0.98076103,2.726114 0.89521003,3.400914 0.89521003,4.165489 v 15.470608 0.0065 l 9.5e-5,
                0.0065 c 0.01274,0.874886 0.51891797,1.820757 1.10537697,2.458043 0.30512,0.33165 0.68668,0.641604 1.124187,0.826544 0.447269,
                0.189048 1.005439,0.264562 1.558585,0.01496 0.45124,-0.203581 0.864281,-0.613905 1.199311,-0.972411 0.192481,-0.206004 0.418865,
                -0.463299 0.650767,-0.726912 0.176357,-0.200317 0.355821,-0.40432 0.526016,-0.59221 0.859299,-0.948293 1.823706,-1.878893 2.962732,
                -2.392744 1.142923,-0.515643 2.490586,-0.635285 3.770635,-0.659403 0.315536,-0.006 0.620013,-0.0062 0.914907,
                -0.0064 h 0.0014 0.0024 c 0.290786,-2.1e-4 0.576938,-4.21e-4 0.840025,-0.007 0.481203,-0.0119 1.05119,-0.04318 1.48658,
                -0.225277 1.04624,-0.437812 1.284366,-1.58421 1.261301,-2.362835 -0.02443,-0.826649 -0.335231,-1.808645 -1.01001,
                -2.412334 z" fill="${cursorRGBA}" stroke="#000000" stroke-width="1.79042" />
              
              <rect x="12" y="23" width="55" height="27" fill="${cursorRGBA}" rx="4" />
              <text x="16" y="42"  font-family="Arial" font-size="16" font-weight="300" fill="black">${flag} ${text}</text>
            </svg>
          `;

        // const encodedSVG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
        //cursor is the same, we just set it to us, or the other users with id
        // document.body.style.cursor = `url("${encodedSVG}") 0 0, auto`;

        app.insertAdjacentHTML("beforeend", svgString);
    } else {
        const cursorPath = `${import.meta.env.BASE_URL}/images/bibata-${cursorColor}.svg`;
        
        app.insertAdjacentHTML("beforeend",`
        <img class="other-cursors" data-id="${id}" src="${cursorPath}" alt="Other users cursor icon" />
      `);
    }
}


/* code to set custom color inside cursor instead of presets

const colorPicker = new iro.ColorPicker("#color-picker", {
    width: 200,
    color: `${cursorColor}`,
    layout: [
        {
            // component: iro.ui.Wheel,
            component: iro.ui.Slider,
            options: {
                sliderType: "hue",
            },
        },
    ],
});

function updateCursor(color) {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="19.196396" height="23.999937"
        viewBox="0 0 19.196396 23.999937" fill="none"><path d="m 17.289555,12.591263 -0.0015,-0.0013 -0.0016,-0.0014 L 5.759437,
        2.370346 C 5.214821,1.872439 4.67901,1.471068 4.164547,1.215153 3.661648,0.964989 3.063331,0.797236 2.465876,0.961997 1.823272,
        1.139207 1.4205,1.630363 1.196844,2.18767 0.98076103,2.726114 0.89521003,3.400914 0.89521003,4.165489 v 15.470608 0.0065 l 9.5e-5,
        0.0065 c 0.01274,0.874886 0.51891797,1.820757 1.10537697,2.458043 0.30512,0.33165 0.68668,0.641604 1.124187,0.826544 0.447269,
        0.189048 1.005439,0.264562 1.558585,0.01496 0.45124,-0.203581 0.864281,-0.613905 1.199311,-0.972411 0.192481,-0.206004 0.418865,
        -0.463299 0.650767,-0.726912 0.176357,-0.200317 0.355821,-0.40432 0.526016,-0.59221 0.859299,-0.948293 1.823706,-1.878893 2.962732,
        -2.392744 1.142923,-0.515643 2.490586,-0.635285 3.770635,-0.659403 0.315536,-0.006 0.620013,-0.0062 0.914907,
        -0.0064 h 0.0014 0.0024 c 0.290786,-2.1e-4 0.576938,-4.21e-4 0.840025,-0.007 0.481203,-0.0119 1.05119,-0.04318 1.48658,
        -0.225277 1.04624,-0.437812 1.284366,-1.58421 1.261301,-2.362835 -0.02443,-0.826649 -0.335231,-1.808645 -1.01001,
        -2.412334 z" fill="${color}" stroke="#000000" stroke-width="1.79042" /></svg>`;

    // let encodeSVG = encodeURIComponent(svgString);
    document.body.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svgString)} ") 0 0, auto`;
}
// updateCursor(cursorColor);
const colorThrottle = throttle((color) => {
    cursorColor = color.rgbaString;
    updateCursor(color.rgbaString);
}, 500, { trailing: false, leading: true });

// colorPicker.on("color:change", (color) => colorThrottle(color));

colorPicker.on("color:change", (color) => {
    // console.log(color.rgbaString);
    cursorColor = color.rgbaString;
    updateCursor(color.rgbaString);
});
*/
