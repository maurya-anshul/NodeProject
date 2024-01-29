const http = require('http');

// Create an HTTP server
const server = http.createServer((request, response) => {
  response.end('Anshul Maurya\n');
});

// Start the server and specify the port to listen on
server.listen(4000, '127.0.0.1');