document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const displayName = document.getElementById("displayName");

    // Live update the display name
    nameInput.addEventListener("input", function () {
        displayName.textContent = nameInput.value.trim() || "Your Name...";
    });

    document.getElementById("screenshotButton").addEventListener("click", function () {
        const name = nameInput.value.trim();
        const email = document.querySelector("input[placeholder='Enter your email address...']").value.trim();
        const phone = document.querySelector("input[placeholder='Enter your phone number...']").value.trim();

        if (!name || !email || !phone) {
            alert("Please fill in all fields before downloading the certificate.");
            return;
        }

        // Take high-resolution screenshot
        takeHighResScreenshot(name);
    });

    function takeHighResScreenshot(userName) {
        const node = document.getElementById("captureDiv");
        const scaleFactor = 3; // Adjust for higher resolution

        domtoimage.toPng(node, {
            width: node.offsetWidth * scaleFactor,
            height: node.offsetHeight * scaleFactor,
            style: {
                transform: `scale(${scaleFactor})`,
                transformOrigin: "top left",
                width: `${node.offsetWidth}px`,
                height: `${node.offsetHeight}px`
            }
        })
        .then(dataUrl => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${userName.replace(/\s+/g, "_")}-certificate.png`; // Personalized filename
            link.click();
        })
        .catch(error => {
            console.error("Screenshot failed:", error);
            alert("Failed to generate the certificate screenshot.");
        });
    }
});