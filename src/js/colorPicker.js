import iro from "@jaames/iro";
import {updateCursor} from "./cursor.js";


const colorPicker = new iro.ColorPicker('#color-picker', {
    width: 200,
    color: "rgba(45, 227, 247, 0.6)",
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

colorPicker.on('color:change', function (color) {
    console.log(color.rgbaString);
    updateCursor(color.rgbaString);
});







