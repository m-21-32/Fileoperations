const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/api/v1/users') {
      // Read the JSON data from a file
      fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    } else if (req.url.startsWith('/api/v1/users?')) {
      // Parse query parameters
      const urlParts = req.url.split('?');
      const query = new URLSearchParams(urlParts[1]);
      const nameFilter = query.get('name');
      const page = parseInt(query.get('page')) || 1;
      const perPage = parseInt(query.get('perPage')) || 10;

      // Read and filter the JSON data
      fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        const users = JSON.parse(data);
        let filteredUsers = users;

        if (nameFilter) {
          filteredUsers = users.filter(user => user.name === nameFilter);
        }

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(paginatedUsers));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
