import express from 'express';
import os from 'os';

const app = express();
const port = 3000;
const imageName = process.env.APP_NAME || 'No image name'; // Default to 'No image name' if undefined

// Define a route for the root URL
app.get('/', (req, res) => {
  const message = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K8s Demo</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #e9ecef;
        color: #495057;
      }
      .message {
        font-size: 28px;
        font-weight: 600;
        color: #343a40;
        padding: 30px;
        border: 2px solid #6c757d;
        border-radius: 12px;
        background-color: #f8f9fa;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .message span {
        color: #007bff;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="message">
      Hello from container <span>${os.hostname()}</span><br>
      from image <span>${imageName}</span>
    </div>
  </body>
  </html>
  `;
  res.send(message);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
