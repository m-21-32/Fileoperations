const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');

// Example callback-based function
const readFileSync = (filePath, encoding, callback) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

// Promisify fs.readFile
const readFileAsync = promisify(fs.readFile);

// Async function for handling HTTP requests
const requestHandler = async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/users') {
      
      const data = await readFileAsync(path.join(__dirname, 'users.json'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } else if (req.method === 'GET' && req.url === '/api/callback-example') {
      
      readFileSync(path.join(__dirname, 'example.txt'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

// Create an HTTP server using the http module and async function
const server = http.createServer(requestHandler);

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
