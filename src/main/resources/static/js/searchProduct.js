// Generador de Códigos QR
function generateQR() {
    const productInput = document.getElementById("productInput").value;
    const qrcodeDiv = document.getElementById("qrcode");

    // Crea un nuevo objeto QRCode
    const qrcode = new QRCode(qrcodeDiv, {
        text: productInput,
        width: 128,
        height: 128
    });
}

// Lector de Códigos QR
const qrVideo = document.getElementById("qr-video");
const productInfoDiv = document.getElementById("productInfo");

// Configura el lector de códigos QR
const qrCodeReader = new QCodeDecoder();

qrCodeReader.decodeFromCamera(qrVideo, function (result) {
    // Muestra la información del producto cuando se detecta un código QR
    if (result) {
        productInfoDiv.innerHTML = `Producto: ${result}`;
    } else {
        productInfoDiv.innerHTML = "Escaneando...";
    }
});
