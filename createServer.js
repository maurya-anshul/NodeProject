const http = require("http");

http
  .createServer((request, response) => {
    switch (request.url) {
      case "/home":
        response.end("<h1>Welcome Home</h1>");
        break;
      case "/about":
        response.end("<h1>Welcome to about</h1>");
        break;
      case "/node":
        response.end("<h1>Welcome to My NodeJs Project</h1>");
        break;
      default:
        response.writeHead(404);
    }
  })
  .listen(4000);
