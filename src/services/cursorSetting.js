import { myData } from "./userData.js";

export { generateCursorColors, cursorColors, getRandomColorObj, changeCursorColors, setOthersCursor };

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
function generateCursorColors() {
    if (!myData.cursorColor) {
        const colorObj = getRandomColorObj();
        myData.cursorColor = colorObj.name;
        myData.cursorRGBA = colorObj.rgba;
    }
}

function changeCursorColors(cursorColor, cursorRGBA) {
    if (cursorColor) {
        //pass in color from color input here
        myData.cursorColor = cursorColor;
        myData.cursorRGBA = cursorRGBA;
        localStorage.setItem("userData", JSON.stringify(myData));
    }
}

//we have if statement to check if cursor exist, so we dont duplicate
//the issue is, if user clicks show others checkbox, we want ALL others cursors replaced with other style
//meaning, they all exist, and wouldn't change, so we can pass in an argument that defaults to false, but can override this if statement check
function setOthersCursor({ cursorColor, cursorRGBA, id, region, countryCode, flag }) {
    const othersCursorCheckbox = document.querySelector("#othersCursorCheckbox");
    const app = document.querySelector("#app");
    const cursorPath = `${import.meta.env.BASE_URL}/images/bibata-${cursorColor}.svg`;

    if (othersCursorCheckbox.checked && ( !document.querySelector(`.other-cursor[data-id="${id}"]`) ||
        !document.querySelector(`.single-svg-cursor[data-id="${id}"]`)) ) {
            // console.log("checked test. unique");
            const text = region && region.length < 3 ? region : countryCode;

            const containerString = `
                <div class="cursorContainer" data-id="${id}">
                    <img class="other-cursor" src="${cursorPath}" alt="Other users cursor icon" />
                    <div class="cursorFloat" style="background-color: ${cursorRGBA}">${flag} ${text}</div>
                </div> `;

            app.insertAdjacentHTML("beforeend", containerString);
        
    } else if ( !document.querySelector(`.other-cursor[data-id="${id}"]`) || !document.querySelector(`.single-svg-cursor[data-id="${id}"]`) ) {
        
        const containerString = `
              <img class="single-svg-cursor" data-id="${id}" src="${cursorPath}" alt="Other users cursor icon" />
            `
        /* const containerString = `
            <svg class="single-svg-cursor" data-id="${id}" xmlns="http://www.w3.org/2000/svg" width="19.196396" height="23.999937" viewBox="0 0 19.196396 23.999937">
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
            </svg>`; */
            
            app.insertAdjacentHTML("beforeend", containerString);
    }
}

//old location svg, floater replaces this:
/* const svgString = `
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
            </svg>`; */
