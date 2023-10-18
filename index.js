const express = require('express');
const useragent = require('express-useragent');

const app = express();

app.use(useragent.express());
app.use(express.static('public'));

// Define the endpoint for checking user agent and serving QR code
app.get('/', (req, res) => {
  const ua = req.useragent.source;

  let textToShow = '<div>Scan QR code to download Edge or Bing to get the Red Package.</div>';
  let imageToShow = '/edge_mobile_qrcode.svg';
  if (ua.includes(' Edgss/') || ua.includes(' EdgiOS/') || ua.includes(' EdgA/')) {
    textToShow ='';
    imageToShow = '/red_packet.png';
  }

  // Send the HTML with the selected image
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Edge&SA Team Red Packet</title>
  </head>
  <body>
      <h1>Welcome to Edge&SA Team Red Package</h1>
      ${textToShow}
      <img src="${imageToShow}" alt="Image">
  </body>
  </html>
`;

  res.send(html);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
