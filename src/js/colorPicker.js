import iro from "@jaames/iro";
import {updateCursor} from "./cursor.js";

let cursorColor = 'rgba(45, 227, 247, 0.5)'

const colorPicker = new iro.ColorPicker('#color-picker', {
    width: 200,
    color: "rgba(45, 227, 247, 0.5)",
    layout: [
        {
            // component: iro.ui.Wheel,
            component: iro.ui.Slider,
            options: {
                sliderType: 'hue'
            }
            
        },
    ]
    
});

colorPicker.on('color:change', (color) => {
    console.log(color.rgbaString);
    cursorColor = color.rgbaString;
    updateCursor(color.rgbaString);
});

export {cursorColor}





