import express from 'express';
import os from 'os';

const app = express();
const port = 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
  const message = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled Message</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f4f4f4;
        color: #333;
      }
      .message {
        font-size: 24px;
        font-weight: bold;
        color: #2c3e50;
        padding: 20px;
        border: 2px solid #2c3e50;
        border-radius: 8px;
        background-color: #ecf0f1;
      }
    </style>
  </head>
  <body>
    <div class="message">
      Hello from ${os.hostname()}
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
