const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');

const app = express();
const upload = multer();
app.use(cors());

// Endpoint to receive and forward the file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file received.' });
    }

    console.log('File received from frontend:', req.file.originalname);

    // Prepare the file to forward
    const fileBuffer = req.file.buffer;
    const targetEndpoint =
      'https://stockmann-tst.mdm.stibosystems.com/restapiv2/inbound-integration-endpoints/iiep_buyside_rest/upload-and-invoke?context=International&workspace=Main';

    // Forward the file using axios
    const response = await axios.post(targetEndpoint, fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'accept': '*/*',
      },
      auth: {
        username: 'kandrak',
        password: 'Welcome@123',
      },
    });

    console.log('Response from target endpoint:', response.status, response.statusText);

    // Respond to the React app
    res.status(200).send({ message: 'File successfully forwarded to the target endpoint.' });
  } catch (error) {
    console.error('Error forwarding file:', error.message || error);
    res.status(500).send({ message: 'Failed to forward the file to the target endpoint.' });
  }
});

// Start the server
const PORT = 5000; // Use port 5000 instead of 3000
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
