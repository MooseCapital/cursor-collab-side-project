import { createGrid } from "../services/grid.js";

export { ColorsPage };
//when visiting, now change the users cursor, and check if it reverts to css when changing pages
function ColorsPage() {
    console.log("color page loaded");
    setTimeout(() => createGrid(), 0);

    return `
        <div id="grid"></div>
    
          <h2 id="latency">
            50<span>MS Latency</span>
          </h2>
        
          <div id="color-picker"></div>
    
    `;
}
