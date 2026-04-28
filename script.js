let qrScanner;

// Generate QR Code
function generateQR() {

    const qrContainer = document.getElementById("qrcode");
    const qrText = document.getElementById("qrText").value;

    // Clear previous QR
    qrContainer.innerHTML = "";

    // Check empty input
    if (qrText.trim() === "") {
        alert("Please enter text or URL");
        return;
    }

    // Generate QR
    new QRCode(qrContainer, {
        text: qrText,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}


// Start Camera Scanner
function startScanner() {

    qrScanner = new Html5Qrcode("reader");

    Html5Qrcode.getCameras()
    .then(devices => {

        if (devices && devices.length) {

            const cameraId = devices[0].id;

            qrScanner.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: 250
                },

                // Success
                function(decodedText) {

                    document.getElementById("result").innerHTML =
                        "Scanned Result: " + decodedText;

                },

                // Error
                function(errorMessage) {
                    console.log(errorMessage);
                }

            );

        } else {

            alert("No camera found");

        }

    })
    .catch(err => {

        console.log(err);
        alert("Camera access denied");

    });
}


// Stop Scanner
function stopScanner() {

    if (qrScanner) {

        qrScanner.stop()
        .then(() => {

            console.log("Scanner stopped");

        })
        .catch(err => {

            console.log(err);

        });

    }

}


// Scan QR From Uploaded Image
function scanImage() {

    const fileInput = document.getElementById("qrImage");

    // Check image selected
    if (fileInput.files.length === 0) {

        alert("Please upload an image");
        return;

    }

    const imageFile = fileInput.files[0];

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.scanFile(imageFile, true)

    .then(decodedText => {

        document.getElementById("imageResult").innerHTML =
            "Image Result: " + decodedText;

    })

    .catch(err => {

        document.getElementById("imageResult").innerHTML =
            "No QR Code Found";

        console.log(err);

    });

}