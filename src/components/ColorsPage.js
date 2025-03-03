export { ColorsPage };

function ColorsPage() {
    console.log("color page loaded");

    return `
        <div id="grid"></div>
    
          <h2 id="latency">
            50<span>MS Latency</span>
          </h2>
        
          <div id="color-picker"></div>
    
    `;
}
