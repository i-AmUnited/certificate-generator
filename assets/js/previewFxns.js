document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const displayName = document.getElementById("displayName");

    // Live update the display name
    nameInput.addEventListener("input", function () {
        displayName.textContent = nameInput.value.trim() || "Your Name...";
    });

    document.getElementById("screenshotButton").addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const email = document.querySelector("input[placeholder='Enter your email address...']").value.trim();
        const phone = document.querySelector("input[placeholder='Enter your phone number...']").value.trim();

        if (!name || !email || !phone) {
            alert("Please fill in all fields before downloading the certificate.");
            return;
        }

        const data = { name, email, phone };
        const scriptURL = "https://script.google.com/macros/s/AKfycbxEUAmNU9qvKyirstFOQmpRkb3GJM9Hu6H9NmM1tgoh777nBJp-SG0HcDmYdB0rLW5_-Q/exec";

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Google Sheets Update Success:", result);

            // Take high-resolution screenshot after form submission
            takeHighResScreenshot(name);
        } catch (error) {
            console.error("Google Sheets Submission Failed:", error);
            alert("Failed to submit data to Google Sheets. Please try again.");
        }
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
