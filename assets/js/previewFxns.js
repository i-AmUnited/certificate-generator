document.getElementById("screenshotButton").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    const email = document.querySelector("input[placeholder='Enter your email address...']").value;
    const phone = document.querySelector("input[placeholder='Enter your phone number...']").value;

    const data = { name, email, phone };

    // Your Google Apps Script Web App URL
    const scriptURL = "YOUR_NEW_DEPLOYED_WEB_APP_URL";

    fetch(scriptURL, {
        method: "POST",
        mode: "cors",  // Ensure CORS is enabled
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));

    // Capture high-resolution screenshot
    takeHighResScreenshot();
});

function takeHighResScreenshot() {
    const node = document.getElementById("captureDiv");
    
    const scaleFactor = 3;  // Increase this for even higher resolution

    domtoimage.toPng(node, {
        width: node.offsetWidth * scaleFactor,
        height: node.offsetHeight * scaleFactor,
        style: {
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'top left',
            width: `${node.offsetWidth}px`,
            height: `${node.offsetHeight}px`
        }
    })
    .then(dataUrl => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "certificate-high-res.png";
        link.click();
    })
    .catch(error => console.error("Screenshot failed:", error));
}
