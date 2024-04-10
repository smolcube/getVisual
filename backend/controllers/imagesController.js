// imageController.js

const path = require('path');

const imagesFolder = path.join(__dirname, '..', 'backend', 'uploads');

// Function to serve images
function serveImage(req, res) {
  const imageName = req.params.imageName;
  res.sendFile(path.join(imagesFolder, imageName));
}

module.exports = {
  serveImage
};
