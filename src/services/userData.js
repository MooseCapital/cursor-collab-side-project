import flag from "country-code-emoji";
import { getRandomColorObj, setCursor, generateCursorColors, setOthersCursor } from "./cursorSetting.js";
import { nanoid } from "nanoid";
export { myData, setUserData, otherUsers, User };

const myData = JSON.parse(localStorage.getItem("userData")) || {};
const otherUsers = {};

async function setUserData() {
    try {
        await getLocationData();
        
        if(!myData.flag) myData.flag = flag(myData?.countryCode);
        if(!myData.id) myData.id = nanoid();

        generateCursorColors(myData);

        setCursor({ cursorColor: myData.cursorColor, cursorRGBA: myData.cursorRGBA });

        localStorage.setItem("userData", JSON.stringify(myData));
    } catch (err) {
        console.log(err);
    }
}

async function getLocationData() {
    try {
        if (!myData?.query) {
            const res = await fetch("http://ip-api.com/json");
            const data = await res.json();

            for (const prop in data) {
                myData[prop] = data[prop];
            }

            console.log(myData, "inside function");
        } else {
            // console.log("not fetched");
        }
    } catch (e) {
        //toast popup
        console.log("fetch error", e);
    }
}

//generate colors for business case when users see black cursor as their own
//otherwise, send the users colors
class User {
    constructor({ id, cursorColor, cursorRGBA, flag, countryCode, region }) {
        const colorObj = getRandomColorObj();
        this.id = id;
        this.cursorColor = cursorColor || colorObj.name;
        this.cursorRGBA = cursorRGBA || colorObj.rgba;
        this.flag = flag;
        this.countryCode = countryCode;
        this.region = region;
        this.renderCursor();
        otherUsers[this.id] = this;
    }
    //this is the prototype, use for shared methods or default property values until the user sets
    renderCursor() {
        setOthersCursor({
            cursorColor: this.cursorColor,
            cursorRGBA: this.cursorRGBA,
            id: this.id,
            region: this.region,
            countryCode: this.countryCode,
            flag: this.flag,
        });
    }
}
/* new User({
    id: 1234,
    cursorColor: "purple",
    cursorRGBA: "rgba(173,144,255,0.6)",
    flag: "🇷🇸",
    countryCode: "RS",
    region: "RS",
}); */

// addNewUser(1234)
